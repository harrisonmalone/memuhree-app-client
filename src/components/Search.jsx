import React from "react";
import { Link } from 'react-router-dom'
import HelperLink from './HelperLink'

class Image extends React.Component {
  state = {
    images: null,
    preview: false,
    message: null,
    imageLoaded: false
  }

  onInputChange = async (e) => {
    const value = e.target.value
    const len = value.length
    if (len === 4 || len === 7 || len === 10) {
      this.setState({ loading: true, message: null, images: null })
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/searches?name=${value}`)
      const images = await response.json()
      if (images.length === 0) {
        this.setState({
          loading: false,
          message: "No images returned from this search"
        })
      } else {
        this.setState({
          images: images,
          loading: false
        })
      }
    }
  }

  onImageLoad = () => {
    this.setState({
      imageLoaded: true
    })
  }

  onPreviewClick = (url) => {
    this.setState({ imageLoaded: false, preview: true, previewUrl: url  })
  }

  render() {
    const { images, loading, preview, previewUrl, message, imageLoaded } = this.state
    const style = {}
    if (!imageLoaded) {
      style.visibility = "hidden";
    }
    return (
      <div>
        <form className="search-form">
          <h1 className="search-header">Search bucket</h1>
          <input type="text" name="search" id="search" placeholder="2020-10-02" onChange={this.onInputChange} />
        </form>
        {loading && <h1 className="search-header">Loading</h1>}
        <div className="results">
          {message && <p>{message}</p>}
          {images && images.map((image, index) => {
            return (
              <div key={index} className="result">
                <p>{image.name} <HelperLink><Link to="/images/search" onClick={() => this.onPreviewClick(image.url)}>Preview</Link></HelperLink> <HelperLink><Link to={{
                  pathname: "/images/new",
                  state: { file: image.name }
                }}>Populate</Link></HelperLink></p>
                {preview && image.url === previewUrl && <img style={style} src={previewUrl} onLoad={this.onImageLoad} width="200" alt="preview" />}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Image;
