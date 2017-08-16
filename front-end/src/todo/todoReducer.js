import axios from 'axios';
const URL = 'http://localhost:3003/api/todos';

const INITIAL_STATE = {
  description: '',
  list: []
}

export const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        list: [
          ...state.list, {
            description: action.payload,
            _id : action.id
          }
        ]
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        list : state.list.map(item =>  {
          item.done = item._id === action.payload ? !item.done : item.done
          return item
        })
        
      }
    case 'DESCRIPTION_CHANGED':
      return {
        ...state,
        description: action.payload
      }
    case 'REMOVE_TODO':
      return {
        ...state,
        list : state.list.filter(item => item._id !== action.payload)
      }
    case 'LOAD_PAGE':
      return {
        ...state,
        list : action.payload
      }
    default:
      return state
  }
}