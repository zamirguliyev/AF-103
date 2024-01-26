import React from "react";
import PropTypes from "prop-types";
import "../App.css";
import moment from "moment";

const TodoItem = ({ todo, onDelete, onMarkAsDone }) => {
  const todoStyle = {
    textDecoration: todo.isCompleted ? "line-through" : "none",
  };

  const formattedDate = moment(todo.todoDate).format("MMMM Do YYYY, h:mm:ss a");
  return (
    <li style={todoStyle} className={todo.isCompleted ? "completed" : ""}>
      <span>{todo.description}</span>
      <span>{formattedDate}</span>
      <button onClick={onMarkAsDone}>Mark</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMarkAsDone: PropTypes.func.isRequired,
};

export default TodoItem;
