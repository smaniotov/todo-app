import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {handleAdd, handleChange, handleRemove, handleToggleMark, loadPage} from './todoActions'
import PageHeader from '../template/pageHeader';
import TodoForm from './todoForm';
import TodoList from './todoList';



class Todo extends Component {
  componentWillMount() {
    this.props.loadPage()
  }

  render() {
    return (
      <div>
        <PageHeader name="Tarefas" small="Cadastro"/>
        <TodoForm handleAdd={this.props.handleAdd} todoText={this.props.text} handleChange= {this.props.handleChange} />
        <TodoList list={this.props.list} handleRemove={this.props.handleRemove} handleToggleMark={this.props.handleToggleMark} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    text : state.todos.description,
    list : state.todos.list
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleAdd,
  handleChange,
  handleRemove,
  handleToggleMark,
  loadPage
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Todo)