import React from "react";

class Login extends React.Component {
  state = {
    password: "",
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.setPassword(this.state.password);
  };

  render() {
    return (
      <div style={{padding: "0px 5px"}}>
        <h1>Login</h1>
        <form className="login-form" onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={this.onInputChange}
              value={this.state.password}
            />
          </div>
          <div className="form-group">
            <input id="submit" type="submit" value="Sign in" />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
