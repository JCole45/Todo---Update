import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, CONFIRM_DELETE } from './actionsTypes'

let TodoId = 2

export const addTodo = text => ({
    type: ADD_TODO,
    id: TodoId++,
    text
})

export const deleteTodo = (id) => ({
    type: REMOVE_TODO,
    id: id
})

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id: id
})

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
})

export const confirmDelete = (id) => ({
  type: CONFIRM_DELETE,
  id: id
})
