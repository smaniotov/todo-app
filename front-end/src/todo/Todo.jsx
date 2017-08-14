import React, {Component} from 'react';
import axios from 'axios';

import PageHeader from '../template/pageHeader';
import TodoForm from './todoForm';
import TodoList from './todoList';

const URL = 'http://localhost:3003/api/todos';

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      description: ''
    };
    this.refresh()
  }

  refresh(description = '') {
    const search = description
      ? `&description__regex=/${description}/`
      : ''
    axios.get(`${URL}?sort=-createdAt${search}`).then(resp => this.setState({
      ...this.state,
      description,
      list: resp.data
    }))
  }

  handleAdd() {
    const description = this.state.description;
    return () => axios.post(URL, {description}).then(resp => this.refresh())
  }

  handleChange() {
    return text => this.setState({description: text})
  }

  handleSearch() {
    return () => this.refresh(this.state.description)
  }

  handleRemove() {
    return todo => axios.delete(`${URL}/${todo._id}`)
      .then(resp => {
        this.setState({
          ...this.state,
          list : 
        })
      })
  }

  handleMarkAsDone() {
    return todo => axios.put(`${URL}/${todo._id}`, {
      ...todo,
      done: true
    }).then(resp => this.refresh())
  }

  handleMarkAsPending() {
    return todo => axios.put(`${URL}/${todo._id}`, {
      ...todo,
      done: false
    }).then(resp => this.refresh())
  }

  handleClear() {
    return () => this.refresh();
  }

  render() {

    return (
      <div>
        <PageHeader name="Tarefas" small="Cadastro"/>
        <TodoForm 
        handleAdd={this.handleAdd()} 
        handleChange={this.handleChange()} 
        todoText={this.state.description}
        handleSearch={this.handleSearch()} 
        handleClear={this.handleClear()}
        />
        <TodoList 
        list={this.state.list} 
        handleRemove={this.handleRemove()} 
        handleMarkAsPending={this.handleMarkAsPending()} 
        handleMarkAsDone={this.handleMarkAsDone()} 
        />
      </div>
    )
  }
}
