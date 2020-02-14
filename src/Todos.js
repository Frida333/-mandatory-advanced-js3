import React from 'react';
import { Helmet} from 'react-helmet-async';
import axios from 'axios';
import {updateToken, token$} from './store';
import { Redirect } from 'react-router-dom';
import MaterialIcon from "material-icons-react";
import jwt from "jsonwebtoken";


export default class Todo extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      todos: [],
      todo: '',
      token: token$.value,
      internalId: 0,
      error: false,
    }
    this.scrollBar = React.createRef();
  }

  handleScrollbar=()=>{
    this.scrollBar.current.scrollTo(0, this.scrollBar.current.scrollHeight);
  }

  componentDidMount=()=> {
    this.subscription = token$.subscribe(token => {
      this.setState({token});
    });
    this.get()
  }

  componentWillUnmount=()=> {
    this.subscription.unsubscribe();
  }

  deleteOnClick=(id)=>{
    axios.delete('http://3.120.96.16:3002/todos/' + id, {
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    })
    .then(() => {
      this.get()
    })
    .catch(error => {
      this.setState({
        error: true,
      })
    })
  }

  get=()=>{
    axios.get('http://3.120.96.16:3002/todos', {
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    })
    .then(response => {
      this.setState({todos: response.data.todos});
    })
    .catch(error => {
      this.setState({
        error:true,
      })
      updateToken(null);
    });
  }

  onSubmitTask=(e)=>{
    e.preventDefault();
    let todoId = {id: "internal-" + this.state.internalId, todo: e.target.value};
    axios.post('http://3.120.96.16:3002/todos', {content: this.state.todo}, {
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    })
    .then(()=>{
      this.setState({todos: [...this.state.todos, todoId], internalId: this.state.internalId + 1, todo: ''})
      this.get()
      this.handleScrollbar();
    })
    .catch(error => {
      this.setState({
        error: true,
      })
    })
  }

  onChange=(e)=>{
    this.setState({todo: e.target.value})
  }

  render(){
    if(!this.state.token){
      return <Redirect to = '/' />
    }
    const decoded = jwt.decode(this.state.token);
    return(
      <div className="todo">
        <Helmet>
          <title>Todo</title>
        </Helmet>
        <p>{decoded.email}</p>
        <div className = 'formTodo'>
          <form onSubmit={this.onSubmitTask}>
            <input
              onChange={this.onChange}
              value={this.state.todo}
              type='text'
            />
            <input
              type="submit"
              value="Send"
            />
          </form>
          <table className="table" ref={this.scrollBar}>
            <thead>
              <tr>
                <th>Todo</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            {this.state.todos.map(data => (
              <tr key={data.id}>
                <td>{data.content}</td>
                <td><button onClick = { () => this.deleteOnClick(data.id) }><MaterialIcon icon="delete"/></button></td>
              </tr>
            ))}
            </tbody>
          </table>
          {this.state.error && <p className="error">Oops something went wrong</p>}
        </div>
      </div>
    )
  }
}
