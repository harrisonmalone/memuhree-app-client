import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import moment from "moment";

class Images extends React.Component {
  state = {
    plus: <FontAwesomeIcon icon={faPlusSquare} />,
    archive: <FontAwesomeIcon icon={faArchive} />,
    days: null,
  };

  async componentDidMount() {
    const response = await fetch("http://localhost:3000/days");
    const days = await response.json();
    this.setState({
      days: days,
    });
  }

  render() {
    const { days, plus, archive } = this.state;
    return (
      days && (
        <>
          <h2 className="logo">Recapture</h2>
          <div className="days-container">
            {days.map((day, index) => {
              const date = moment(day.taken).format("Do MMMM YYYY");
              return (
                <p key={index}>
                  <Link to={`/images/${day.id}`}>{date}</Link>
                  <span className="location">{day.location}</span>
                </p>
              );
            })}
            <div className="icons">
              <Link to="/images/new">{plus}</Link>
              <Link to="/images">{archive}</Link>
            </div>
          </div>
        </>
      )
    );
  }
}

export default Images;
