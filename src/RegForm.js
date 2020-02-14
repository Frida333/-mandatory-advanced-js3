import React from "react";


export default class RegForm extends React.Component {
  render(){
    return(
      <div className="form">
        <p>Sign Up</p>
        <form onSubmit={this.props.onSubmit}>
          <p>E-mail:</p>
          <input
            placeholder="E-mail"
            type="email"
            value={this.props.formEmail.email}
            required
            onChange={this.props.onEmailChange}
          />
          <p>Password:</p>
          <input
            placeholder="Password"
            type="password"
            value={this.props.formPassword.password}
            required
            onChange={this.props.onPasswordChange}
          />
          <p>Sign Up</p>
          <input
            type="submit"
            value="Sign Up"
          />
        </form>
        {this.props.errorReg && <p className="error">This e-mail is already taken </p>}
      </div>
    )
  }
}
