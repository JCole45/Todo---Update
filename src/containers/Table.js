import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteTodo,
  toggleTodo,
  setVisibilityFilter
} from "../actions/actionCreator";
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../actions/actionsTypes";
import { bindActionCreators } from "redux";
import { todoReducer } from '../reducers/TodoReducer';

class Table extends Component {
  render() {

    function deleteRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

    return (

      <div className="col-lg-10 offset-lg-1 col-md-10 col-sm-12 col-xs-12">

        <nav style={{ marginTop: "60px" }}>
            <button
              onClick={() => this.props.setVisibilityFilter(SHOW_ALL, SHOW_COMPLETED)}
            >
             All
            </button>
            <button
              onClick={() => this.props.setVisibilityFilter(SHOW_COMPLETED)}
            >
              Completed
            </button>
            <button
              onClick={() => this.props.setVisibilityFilter(SHOW_ACTIVE, SHOW_COMPLETED)}
            >
              Active
            </button>
        </nav>



        {this.props.todos.length !== 0 ? (

          <table
            style={{ marginTop: "60px" }}
            >

            <thead>
              <tr>
                <th scope="col" style={{color: "red"}}>Active</th>
                <th scope="col">Actions</th>
              </tr>


            </thead>
            <tbody>
              {this.props.todos.map(todo => (
                <tr key={todo.id}>
                  <td
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none"
                    }}
                  >
                   {todo.completed !==true && todo.text.length !==0 ? "-"+todo.text : null}
                   {todo.completed !==true ?  <button className="fas fa-minus-circle"
                                         onClick={() => this.props.deleteTodo(todo.id)}  //line to call confirmation function, with todo.id passed into it
                                       style={{ color: "black",
                                                  fontSize: "10pt",
                                                 marginRight: "10px"
                                               }}> delete </button>  : null }

                  {todo.completed !==true && todo.text.length !== 0 ?
                                        <button
                                        className="fas fa-check-circle"
                                        onClick={() => this.props.toggleTodo(todo.id)
                                        }
                                        style={{ color: "black", fontSize: "10", marginRight: "10px" }}> check
                                        </button> : null}

                  </td>


                </tr>
              ))}

            </tbody>
          </table>


        )

        :

        (
          <div
            style={{ marginTop: "50px" }}
            className="col-lg-10 col-md-10 col-xs-12 col-sm-12 offset-lg-1"
          >
            <div className="alert alert-danger" role="alert" style={
              {color: "red",
              fontSize: "13pt",
              marginRight: "10px"
            }}


            >
              Todo List is empty or Filter results show no results
            </div>
          </div>
        )}



         {this.props.todos.completed !== true ? (
         <table
          style={{ marginTop: "60px" }}>

          <thead>
            <tr>
              <th style={{color: "green"}}>Completed:</th>
            </tr>
          </thead>

          <tbody>
            {this.props.todos.map((todo ) => (

              <tr key={todo.id}>
                <td
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none"
                  }}>

                 {todo.completed==true ? todo.text : null} {todo.completed === true ? "completed" : ""}

                 {todo.completed==true ?
                   <button
                   className="fas fa-minus-circle"
                   onClick={() => this.props.deleteTodo(todo.id)}>
                   delete </button> : null }

                 {todo.completed==true ?
                   <button
                     className="fas fa-check-circle"
                     onClick={() => this.props.toggleTodo(todo.id)
                     }
                   > uncheck </button> : null}

                </td>



                </tr>
           ))}

          </tbody>
        </table>
      )
      :
      (
        ""
      )}

         {" "}
      </div>
    );
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
    visibilityFilter: state.visibilityFilter,

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
