import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../App.css'

const AddTodo = ({ AddTodoItem }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddNewTodo = () => {
    if (newTodo.trim().length >= 3) {
      AddTodoItem(newTodo);
      setNewTodo('');
    } else {
      alert('Todo lenght min 3 ');
    }
  };

  return (
    <div>
      <input
        className='add-input'
        type="text"
        value={newTodo}
        onChange={handleInputChange}
        placeholder="Enter todo"
      />
      <button onClick={handleAddNewTodo}>Add</button>
    </div>
  );
};

AddTodo.propTypes = {
  AddTodoItem: PropTypes.func.isRequired,
};

export default AddTodo;
