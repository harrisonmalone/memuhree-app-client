import React from "react";

class EditImage extends React.Component {
  state = {
    url: this.props.day.url,
    description: this.props.day.description,
    file: this.props.day.file,
    location: this.props.day.location,
    id: this.props.day.id,
  };

  onTextAreaChange = (e) => {
    this.setState({
      description: e.target.value,
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

  onFormSubmit = async (e) => {
    e.preventDefault();
    const { file, description, location, id } = this.state;
    const day = {
      file: file,
      description: description,
      location: location,
    };
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/days/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(day),
    });
    this.props.toggleEdit(description);
  };

  onCancelClick = (e) => {
    this.setState({
      edit: false
    })
  }

  render() {
    const { url, description } = this.state;
    const { style } = this.props
    return (
      <>
        <img src={url} alt={description} onLoad={this.onImageLoad} style={style} className="edit-image"></img>
        <form className="edit-image-form" onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <textarea
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={this.onTextAreaChange}
            />
          </div>
          <div class="submit-container">
            <input id="submit" type="submit" value="Edit" />
            <button id="cancel" onClick={this.onCancelClick}>Cancel</button>
          </div>
        </form>
      </>
    );
  }
}

export default EditImage;
