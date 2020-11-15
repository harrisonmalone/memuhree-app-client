import React from "react";
import moment from "moment";
import HelperLink from "./HelperLink";
import { Link } from "react-router-dom";
import EditImage from "./EditImage";

class Image extends React.Component {
  state = {
    imageLoaded: false,
    size: "laptop"
  };

  async componentDidMount() {
    this.handleViewSize()
    window.addEventListener('resize', this.handleViewSize)
    this.fetchImage();
  }

  async componentWillUnmount() {
    window.removeEventListener('resize', this.handleViewSize)
  }

  fetchImage = async () => {
    const { id } = this.props.match.params;
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/days/${id}`
    );
    const day = await response.json();
    this.setState({
      day: day,
      id: id,
    });
  };

  onImageLoad = (e) => {
    const { clientHeight, clientWidth } = e.target;
    if (clientHeight > clientWidth) {
      this.setState({
        imageLoaded: true,
        portrait: true,
      });
    } else {
      this.setState({
        imageLoaded: true,
      });
    }
  };

  handleViewSize = () => {
    if (window.innerWidth < 460) {
      this.setState((state) => {
        if (state.size === "laptop") {
          return { size: "mobile" }
        }
      })
    } else {
      this.setState((state) => {
        if (state.size === "mobile") {
          return { size: "laptop" }
        }
      })
    }
  }

  onEditLinkClick = () => {
    this.setState({
      edit: true,
    });
  };

  toggleEdit = (newDescription) => {
    this.setState((state) => {
      const updatedDay = { ...state.day, description: newDescription };
      return {
        edit: false,
        day: updatedDay,
      };
    });
  };

  onSpanDeleteClick = async (e) => {
    const { id } = this.state
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/days/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
    this.props.history.push("/images")
  }

  render() {
    const { imageLoaded, portrait, day, id, edit, size } = this.state;
    const style = {};
    if (!day) {
      return null;
    }
    const date = moment(day.taken).format("Do MMMM YYYY");
    if (!imageLoaded) {
      style.visibility = "hidden";
    }
    if (portrait && size === "laptop") {
      style.width = "";
      style.height = "600px";
      style.margin = "18px auto";
    } else {
      style.width = "100%";
      style.height = "auto"
      style.margin = "18px auto";
    }
    if (edit) {
      return <EditImage day={day} toggleEdit={this.toggleEdit} style={style} />;
    }
    return (
      <>
        <img
          src={day.url}
          alt={day.description}
          style={style}
          className="image"
          onLoad={this.onImageLoad}
        ></img>
        {this.state.imageLoaded && (
          <>
            <h2>
              {date}
              <HelperLink>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${day.location}`}
                >
                  {day.location}
                </a>
              </HelperLink>
            </h2>
            <p>
              {day.description}
              <HelperLink>
                <Link to={`/images/${id}`} onClick={this.onEditLinkClick}>
                  Edit
                </Link>
              </HelperLink>
              <HelperLink>
                <span onClick={this.onSpanDeleteClick} >
                  Delete
                </span>
              </HelperLink>
            </p>
          </>
        )}
      </>
    );
  }
}

export default Image;
