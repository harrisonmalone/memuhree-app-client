import React from "react";

class Search extends React.Component {
  state = {
    yearsAndMonths: null,
  };

  async componentDidMount() {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/searches`
    );
    const yearsAndMonths = await response.json();
    this.setState({
      yearsAndMonths,
    });
  }

  render() {
    const { yearsAndMonths } = this.state;
    if (!yearsAndMonths) {
      return (
        <div className="days-container">
          <h1 className="loading-header" style={{ paddingLeft: "5px" }}>
            Loading
          </h1>
        </div>
      );
    } else {
      return (
        <div className="days-container" style={{ padding: "0px 5px"}}>
          {yearsAndMonths.map((date, index) => {
            return (
              <div key={index}>
                <p style={{ margin: "2px 0px" }}>{date}</p>
                <a href={`${process.env.REACT_APP_BACKEND_URL}/searches/${date}`} style={{ fontSize: "10px" }} download>
                  Download
                </a>
                <hr />
              </div>
            )
          })}
        </div>
      )
    }
  }
}

export default Search;
