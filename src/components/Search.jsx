import React from "react";

class Image extends React.Component {
  state = {
    imageLoaded: false,
  };

  async componentDidMount() {
    const params = new URLSearchParams(window.location.search)
    const file = params.get('file')
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/searches?file=${file}`);
    const image = await response.text();
    this.setState({
      image: image,
    });
  }

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

  render() {
    const { imageLoaded, portrait, image } = this.state;
    const style = {};
    if (!image) {
      return null;
    }
    if (!imageLoaded) {
      style.visibility = "hidden";
    }
    if (portrait) {
      style.width = "";
      style.maxHeight = "700px";
      style.margin = "0 auto";
    } else {
      style.width = "100%";
    }
    return (
      <>
        <img
          src={image}
          alt={image}
          style={style}
          className="image"
          onLoad={this.onImageLoad}
        ></img>
      </>
    );
  }
}

export default Image;
