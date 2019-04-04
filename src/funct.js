function deleteConfirm (a) {
  var confirm = window.confirm(this.props.deleteTodo.id))

  if(confirm==true) {
    this.props.deleteTodo(a)
  } else {
   return("cancelled")
  }
}
