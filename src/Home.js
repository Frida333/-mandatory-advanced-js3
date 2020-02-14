import React from 'react';
import { Helmet } from 'react-helmet-async';
import {Link} from "react-router-dom";
import {updateToken, token$} from './store';



export default class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      token: token$.value,
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

  logout=()=>{
    updateToken(null)
  }

  render(){
    return (
      <div className="home">
        <Helmet>
          <title>Home</title>
        </Helmet>
        <h2>Do you need help organizing your everyday life? Register and get started today.</h2>
        <div>
          {!this.state.token?<Link className="homeLink" to='/login'>Login</Link>  : <button className="homeLink" onClick={this.logout}>Logout</button>}
          <Link className="homeLink" to="/registration">Sign Up</Link>
        </div>
      </div>
    )
  }
}
