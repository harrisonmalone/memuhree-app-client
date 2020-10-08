import React from "react";
import { Switch, Route } from "react-router-dom";
import Image from "./Image";
import Images from "./Images";
import NewImage from "./NewImage";
import Login from "./Login";
import Search from "./Search";

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
      <Switch>
        <Route exact path={["/", "/images"]} component={Images} />
        <Route exact path="/images/new" component={NewImage} />
        <Route exact path="/images/search" component={Search} />
        <Route exact path="/images/:id" component={Image} />
      </Switch>
    );
  }
}

export default App;
