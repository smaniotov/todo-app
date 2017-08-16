import axios from 'axios'
import rootReducer from '../main/reducers'
const URL = 'http://localhost:3003/api/todos';

export const handleChange = event => ({
  type : 'DESCRIPTION_CHANGED',
  payload : event.target.value
})

export const handleAdd = (description) => {
  return dispatch => {
    axios.post(URL, {description} )
      .then((response) => dispatch({
        type: 'ADD_TODO',
        id : response.data._id,
        payload : description
      }));
    }
  }

export const handleRemove = (todo) => {
  return dispatch => {
    axios.delete(`${URL}/${todo._id}`)
      .then((response) => dispatch({
        type : 'REMOVE_TODO',
        payload : todo._id
      }));
  }
}

export const loadPage = () => {
  return dispatch => { 
    axios.get(`${URL}?sort=-createdAt`)
      .then((response) => dispatch({
        type : 'LOAD_PAGE',
        payload : response.data
    }));
  }
}

export const handleToggleMark = (todo) => {
  return dispatch => {
    axios.put(`${URL}/${todo._id}`, { ...todo, done: !todo.done })
      .then((response) => dispatch({
        type: 'TOGGLE_TODO',
        payload: todo._id
      }))  
  }
}
