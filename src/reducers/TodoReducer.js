// if you want to show initial data :)
// const INITIAL_DATA =  [
//     {
//         id: 0,
//         text: 'Walk the Dog',
//     },
//     {
//         id:1,
//         text: 'learn Redux',

//     },
// ]

import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, CONFIRM_DELETE} from '../actions/actionsTypes'

const INITIAL_DATA = []

const TodoReducer = (state=INITIAL_DATA, action) => {
    switch (action.type){
        case ADD_TODO:
        var cont = [
            ...state,{
                id: action.id,
                text: action.text,
                completed: false,
            }
               ]
        return cont


        case TOGGLE_TODO:
        return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
         )


        case REMOVE_TODO:
        console.log(state)
        var deleteNow
        (window.confirm("do you want to remove todo now?")) ?
         deleteNow= state.filter(todo =>
          todo.id !== parseInt(action.id)) : alert("cancelled")
          return deleteNow
        default:
        return state
    }
}

export default TodoReducer
