import React from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import RegForm from "./RegForm";





export default class Registration extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      redirect: false,
    }
  }

 onEmailChange=(e)=> {
   this.setState({email: e.target.value});
 }

 onPasswordChange=(e) =>{
   this.setState({password: e.target.value});
 }

 onSubmit=(e)=> {
   e.preventDefault();
   let profile = {
     email: this.state.email,
     password: this.state.password,
   };

   axios.post('http://3.120.96.16:3002/register', profile)
    .then(response => {
      this.setState({
        redirect: true,
      })
    })

    .catch(err => {
      this.setState({
        error:true,
      })
    });
  }

  render(){
    return (
      <div className="registration">
        {this.state.redirect && <Redirect to= "/" />}
        <Helmet>
          <title>Registration</title>
        </Helmet>
        <RegForm formPassword={this.state.password} formEmail={this.state.email} onSubmit={this.onSubmit}
        onPasswordChange={this.onPasswordChange} onEmailChange={this.onEmailChange}  errorReg={this.state.error}/>
      </div>
    )
  }
}
