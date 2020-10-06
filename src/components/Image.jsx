import React from "react";
import moment from "moment";

class Image extends React.Component {
  state = {
    imageLoaded: false,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await fetch(`http://localhost:3000/days/${id}`);
    const day = await response.json();
    this.setState({
      day: day,
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
    const { imageLoaded, portrait, day } = this.state;
    const style = {};
    if (!day) {
      return null;
    }
    const date = moment(day.taken).format("Do MMMM YYYY");
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
              <span className="location">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${day.location}`}
                >
                  {day.location}
                </a>
              </span>
            </h2>
            <p>{day.description}</p>
          </>
        )}
      </>
    );
  }
}

export default Image;
