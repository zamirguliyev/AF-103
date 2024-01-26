import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import '../App.css'

const TodoList = ({
  todos,
  onDeleteTodo,
  onMarkAsDone,
  onSortByDate,
  onSortCompletedTodos,
  onSearchTodo,
}) => {
  return (
    <div>
      <button onClick={onSortByDate}>Sort by Date</button>
      <button onClick={onSortCompletedTodos}>Sort Completed Todos</button>
      <input
        className='search-input'
        type="text"
        onChange={(e) => onSearchTodo(e.target.value)}
        placeholder="Search Todo"
      />
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={() => onDeleteTodo(todo.id)}
            onMarkAsDone={() => onMarkAsDone(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onMarkAsDone: PropTypes.func.isRequired,
  onSortByDate: PropTypes.func.isRequired,
  onSortCompletedTodos: PropTypes.func.isRequired,
  onSearchTodo: PropTypes.func.isRequired,
};

export default TodoList;
