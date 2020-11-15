import React from "react";

class NewImage extends React.Component {
  state = {
    file: "",
    description: "",
    location: "",
  };

  onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/days`, {
        method: "POST",
        body: JSON.stringify({ day: this.state }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      this.props.history.push("/images");
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    if (this.props.location?.state?.file) {
      this.setState({
        file: this.props.location.state.file
      })
    }
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const { file, description, location } = this.state;
    return (
      <form className="new-image-form" onSubmit={this.onFormSubmit}>
        <div className="form-group">
          <label htmlFor="file">File</label>
          <input
            type="text"
            name="file"
            id="file"
            placeholder="2020-10-02-17-47-57.jpg"
            onChange={this.onInputChange}
            value={file}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Went for a walk after work. Was the first beautiful spring afternoon of 2020."
            onChange={this.onInputChange}
            value={description}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Burnley"
            onChange={this.onInputChange}
            value={location}
          />
        </div>
        <div className="form-group">
          <input id="submit" type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

export default NewImage;
