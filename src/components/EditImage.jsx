import React from "react";
import { Redirect } from "react-router-dom";

class EditImage extends React.Component {
  state = {
    url: this.props.location.state.url,
    description: this.props.location.state.description,
    file: this.props.location.state.file,
    location: this.props.location.location,
    id: this.props.match.params.id,
  };

  onTextAreaChange = (e) => {
    this.setState({
      description: e.target.value,
    });
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
    this.redirectToHome()
  };

  redirectToHome = (e) => {
    this.props.history.push("/images")
  }

  render() {
    const { url, description } = this.state;
    if (!url) {
      return <Redirect to="/images" />
    }
    return (
      <>
        <img src={url} alt={description} style={{ width: "100%" }} />
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
          <div className="submit-container">
            <input id="submit" type="submit" value="Edit" />
            <button id="cancel" type="button" onClick={this.redirectToHome}>Cancel</button>
          </div>
        </form>
      </>
    );
  }
}

export default EditImage;
