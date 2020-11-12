import React from "react";

class Image extends React.Component {
  state = {
    images: null
  }

  onInputChange = async (e) => {
    const value = e.target.value
    const len = value.length
    if (len === 4 || len === 7 || len === 10) {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/searches?name=${value}`)
      const images = await response.json()
      this.setState({
        images: images
      })
    }
  }

  render() {
    const { images } = this.state
    return (
      <div>
        <form className="search-form">
          <h1 class="search-label">Search bucket</h1>
          <input type="text" name="search" id="search" placeholder="2020-10-02" onChange={this.onInputChange} />
        </form>
        <div className="results">
          {images && images.map((image, index) => {
            return (
              <div key={index} className="result">
                <a href={image.url} target="_blank" rel="noopener noreferrer">
                  <p>{image.name}</p>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Image;
