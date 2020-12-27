import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Images from "./Images";
import NewImage from "./NewImage";
import Login from "./Login";
import Archive from "./Archive";
import EditImage from "./EditImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive, faPlus } from "@fortawesome/free-solid-svg-icons";

class App extends React.Component {
  state = {
    password: "",
  };

  setPassword = (password) => {
    localStorage.setItem("password", password);
    this.setState({
      password: password,
    });
  };

  render() {
    const password = localStorage.getItem("password");
    if (!password || password !== process.env.REACT_APP_PASSWORD) {
      return (
        <Route
          render={(props) => (
            <Login {...props} setPassword={this.setPassword} />
          )}
        />
      );
    }
    return (
      <div>
        <nav>
          <div class="header">
            <Link to="/images" className="logo">
              Photos
            </Link>
          </div>
          <div class="icons">
            <Link to="/images/archive">
              <FontAwesomeIcon icon={faArchive} />
            </Link>
            <Link to="/images/new">
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>
        </nav>
        <Switch>
          <Route exact path={["/", "/images"]} component={Images} />
          <Route exact path="/images/new" component={NewImage} />
          <Route exact path="/images/archive" component={Archive} />
          <Route exact path="/images/:id/edit" component={EditImage} />
        </Switch>
      </div>
    );
  }
}

export default App;
