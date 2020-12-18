import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import moment from 'moment'
import HelperLink from './HelperLink'

class Images extends React.Component {
  state = {
    search: <FontAwesomeIcon icon={faSearch} />,
    days: null,
    loaded: 0,
    page: 1,
    last: false,
  }

  async componentDidMount() {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/days?page=${this.state.page}`,
    )
    const { days, last } = await response.json()
    days.forEach((day) => {
      const img = new Image()
      img.onload = () => {
        if (img.height > img.width) {
          day.orientation = 'portrait'
        } else {
          day.orientation = 'landscape'
        }
        this.setState((state) => {
          if (state.loaded === days.length - 1) {
            return {
              days: days,
              last: last,
            }
          } else {
            return {
              loaded: (state.loaded += 1),
            }
          }
        })
      }
      img.src = day.url
    })
  }

  onArchiveClick = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/days?archive=true`,
    )
    const days = await response.json()
    this.setState({
      days: days,
    })
  }

  onSpanDeleteClick = async (id) => {
    const wishToDelete = window.confirm('Do you wish to delete this image?')
    if (wishToDelete) {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/days/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      this.setState((state) => {
        const days = state.days.filter((day) => day.id !== id)
        return {
          days: days,
        }
      })
    }
  }

  paginate = async (action) => {
    this.setState({
      days: null,
      loaded: 0,
    })
    const page = action === 'next' ? this.state.page + 1 : this.state.page - 1
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/days?page=${page}`,
    )
    const { days, last } = await response.json()
    days.forEach((day) => {
      const img = new Image()
      img.onload = () => {
        if (img.height > img.width) {
          day.orientation = 'portrait'
        } else {
          day.orientation = 'landscape'
        }
        this.setState((state) => {
          if (state.loaded === days.length - 1) {
            return {
              days: days,
              page: page,
              last: last,
            }
          } else {
            return {
              loaded: state.loaded + 1,
            }
          }
        })
      }
      img.src = day.url
    })
  }

  renderPaginationButtons = () => {
    if (this.state.page === 1) {
      return (
        <Link
          to="/"
          style={{ fontSize: '20px', margin: '10px 10px 10px 0px' }}
          onClick={() => this.paginate('next')}
        >
          Next
        </Link>
      )
    } else if (this.state.last) {
      return (
        <Link
          to="/"
          style={{ fontSize: '20px', margin: '10px 10px 10px 0px' }}
          onClick={() => this.paginate('previous')}
        >
          Previous
        </Link>
      )
    } else {
      return (
        <>
          <Link
            to="/"
            style={{ fontSize: '20px', margin: '10px 10px 10px 0px' }}
            onClick={() => this.paginate('previous')}
          >
            Previous
          </Link>
          <Link
            to="/"
            style={{ fontSize: '20px', margin: '10px 10px 10px 0px' }}
            onClick={() => this.paginate('next')}
          >
            Next
          </Link>
        </>
      )
    }
  }

  render() {
    const { days } = this.state
    if (!days) {
      return <h1 className="loading-header">Search bucket</h1>
    } else {
      return (
        <div className="days-container">
          {days.map((day, index) => {
            return (
              <div key={index} className="frame">
                <img
                  src={day.url}
                  style={{
                    width: '100%',
                    margin: '0 auto',
                    display: 'block',
                  }}
                  alt={day.description}
                />
                <div className="content" style={{ padding: '0px 5px' }}>
                  <h3 style={{ color: '0b0b0b' }}>
                    {moment(day.taken).format('Do MMMM YYYY')}
                  </h3>
                  <p>
                    {day.description}
                    <HelperLink>
                      <Link
                        to={{ pathname: `/images/${day.id}/edit`, state: day }}
                      >
                        Edit
                      </Link>
                    </HelperLink>
                    <HelperLink>
                      <span onClick={() => this.onSpanDeleteClick(day.id)}>
                        Delete
                      </span>
                    </HelperLink>
                  </p>
                </div>
              </div>
            )
          })}
          <div
            className="pagination"
            style={{ fontSize: '20px', margin: '30px 0px', padding: '0px 5px' }}
          >
            {this.renderPaginationButtons()}
          </div>
        </div>
      )
    }
  }
}

export default Images
