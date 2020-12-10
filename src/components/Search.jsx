import React from "react";
import { Link } from "react-router-dom";
import HelperLink from "./HelperLink";
import moment from "moment";

class Image extends React.Component {
  state = {
    images: null,
    preview: false,
    message: "",
    imageLoaded: false,
    date: this.generateYearAndMonth(),
  };

  generateYearAndMonth() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${year}-${month}`;
  }

  onInputChange = async (e) => {
    const value = e.target.value;
    this.setState({ date: value });
  };

  onFormSubmit = async (e) => {
    this.setState({ message: "", loading: true, images: null });
    e.preventDefault();
    const { date } = this.state;
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/searches?name=${date}`
    );
    const images = await response.json();
    if (images.length === 0) {
      this.setState({
        loading: false,
        message: "No images returned from this search",
      });
    } else {
      this.setState({
        images: images,
        loading: false,
      });
    }
  };

  onImageLoad = () => {
    this.setState({
      imageLoaded: true,
    });
  };

  onPreviewClick = (url) => {
    this.setState({ imageLoaded: false, preview: true, previewUrl: url });
  };

  formatDate = (date) => {
    return moment(date).format("MMMM Do YYYY, h:mm:ss a");
  };

  render() {
    const {
      images,
      loading,
      preview,
      previewUrl,
      message,
      imageLoaded,
      date,
    } = this.state;
    const style = {};
    if (!imageLoaded) {
      style.visibility = "hidden";
    }
    return (
      <div style={{padding: "0px 10px"}}>
        <form className="search-form" onSubmit={this.onFormSubmit}>
          <h1 className="search-header">Search bucket</h1>
          <div className="form-group">
            <input
              type="month"
              id="search"
              name="search"
              min="2000-01"
              value={date}
              onChange={this.onInputChange}
            ></input>
          </div>
          <div className="form-group">
            <input type="submit" value="Search" />
          </div>
        </form>
        {loading && <h1 className="search-header">Loading</h1>}
        <div className="results">
          {message && <p>{message}</p>}
          {images &&
            images.map((image, index) => {
              return (
                <div key={index} className="result">
                  <p>{this.formatDate(image.date)}</p>
                  <div className="result-links">
                    <HelperLink noMargin>
                      <Link
                        to="/images/search"
                        onClick={() => this.onPreviewClick(image.url)}
                      >
                        Preview
                      </Link>
                    </HelperLink>{" "}
                    <HelperLink noMargin>
                      <Link
                        to={{
                          pathname: "/images/new",
                          state: { file: image.name },
                        }}
                      >
                        Populate
                      </Link>
                    </HelperLink>
                  </div>
                  {preview && image.url === previewUrl && (
                    <img
                      style={style}
                      src={previewUrl}
                      onLoad={this.onImageLoad}
                      className="preview-image"
                      alt="preview"
                    />
                  )}
                  <hr></hr>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Image;
