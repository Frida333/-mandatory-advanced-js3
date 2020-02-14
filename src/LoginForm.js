import React from "react";


export default class LoginForm extends React.Component {
  render(){
    return(
      <div className="form">
        <p>Login</p>
        <form onSubmit={this.props.onSubmit}>
          <p>E-mail:</p>
          <input
            placeholder="Enter e-mail"
            type="email"
            value={this.props.emailForm}
            required
            onChange={this.props.onEmailChange}
          />
          <p>Password:</p>
          <input
            placeholder="Enter password"
            type="password"
            value={this.props.passwordForm}
            required
            onChange={this.props.onPasswordChange}
          />
          <p>Login</p>
          <input
            type="submit"
            value="Login"
          />
        </form>
        {this.props.error && <p className="error">Invalid e-mail password</p>}
      </div>
    )
  }
}
