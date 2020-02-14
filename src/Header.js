import React from 'react';
import {Link} from "react-router-dom";
import {updateToken, token$} from './store';



export default class Header extends React.Component {
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
    return(
      <header>
        <nav className="nav">
          <h1><Link to="/">To Do List </Link></h1>
          <div>
            {!this.state.token?<Link className="link" to='/login'>Login</Link> : <button className="link" onClick={this.logout}>Logout</button>}
            <Link className="link" to="/registration">Sign Up</Link>
          </div>
        </nav>
      </header>
    )
  }
}
