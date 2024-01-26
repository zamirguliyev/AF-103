import React, { useState } from 'react';
import todoStore from '../zustand/todoStore';

const TodoList: React.FC = () => {
    const [newTodo, setNewTodo] = useState<string>(''); 
    const todos = todoStore((state) => state.todos);
    const addTodo = todoStore((state) => state.addTodo);
    const removeTodo = todoStore((state) => state.removeTodo);
    const toggleTodo = todoStore((state) => state.toggleTodo);
  
    const handleAddTodo = () => {
      if (newTodo.trim() !== '') {
        addTodo(newTodo);
        setNewTodo('');
      }
    };

    
  return (
    <>
    <input
      type="text"
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
    />
    <button onClick={handleAddTodo}>Add Todo</button>
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>{todo.text}</span>
          <button onClick={() => removeTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  </>
  );
};

export default TodoList;
