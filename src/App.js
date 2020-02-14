import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Route, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Login from "./Login";
import Home from "./Home";
import Registration from "./Registration";
import Header from "./Header";
import Todos from "./Todos";

export default class App extends React.Component {
  render(){
    return (
      <HelmetProvider>
        <Router>
          <Header></Header>
          <Route exact path="/" component={Home} />
          <Route path="/registration" component={Registration}/>
          <Route path="/login" component={Login}/>
          <Route path="/todos" component={Todos}/>
        </Router>
      </HelmetProvider>
    )
  }
}
