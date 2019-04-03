import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteTodo,
  toggleTodo,
  setVisibilityFilter
} from "../actions/actionCreator";
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../actions/actionsTypes";
import { bindActionCreators } from "redux";

class Table extends Component {
  render() {
    return (
       <div>

       <button
         onClick={() => this.props.setVisibilityFilter(SHOW_ALL)} >
        All
       </button>

       <button
         onClick={() => this.props.setVisibilityFilter(SHOW_COMPLETED)}>
         Completed
       </button>

       <button
        onClick={() => this.props.setVisibilityFilter(SHOW_ACTIVE)}>
         Active
       </button>

       {this.props.todos.map(todo => (
         <ol key={todo.id}>

             {todo.text} {todo.completed === true ? "(completed)" : ""}

             <button onClick={() =>
             this.props.deleteTodo(todo.id)}>
             delete
             </button>

             <button onClick={() =>
               this.props.toggleTodo(todo.id)}>
                complete
             </button>

         </ol>



       ))}

       <p> Completed </p>

       {this.props.todos.map (todo => (
          <ol key={todo.id}>
          {todo.complete}
          </ol>



       )
       )
           }
       </div>

    )
  }
}


const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case SHOW_ALL:
      return todos;
    case SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const mapStateToProps = state => {
  return { todos: getVisibleTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
 };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteTodo,
      toggleTodo,
      setVisibilityFilter
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
