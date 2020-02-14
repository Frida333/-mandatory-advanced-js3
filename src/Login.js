import React from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import {  Redirect } from 'react-router-dom';
import { updateToken, token$ } from './store';
import LoginForm from "./LoginForm";

export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      token: token$.value,
      error: false,
    }
  }

  componentDidMount=()=> {
    this.subscription = token$.subscribe(token => {
      this.setState({token});
    });
  }

  componentWillUnmount=()=> {
    this.subscription.unsubscribe();
  }

  onEmailChange=(e)=> {
    this.setState({email: e.target.value});
  }

  onPasswordChange=(e)=> {
    this.setState({password: e.target.value});
  }

  onSubmit=(e)=> {
    e.preventDefault();
    let authData = {
      email: this.state.email,
      password: this.state.password,
    };
    axios.post('http://3.120.96.16:3002/auth', authData)
      .then(response => {
        updateToken(response.data.token);
      })
      .catch(err => {
        this.setState({error: true});
      });
  }

  render (){
    if(this.state.token){
      return <Redirect to = '/todos' />
    }
    return(
      <div className="LoginForm">
        <Helmet>
          <title>Login</title>
        </Helmet>
        <LoginForm emailForm={this.state.email} onEmailChange={this.onEmailChange} onSubmit={this.onSubmit} passwordForm={this.state.password}
        onPasswordChange={this.onPasswordChange} error={this.state.error}/>
      </div>
    )
  }
}
