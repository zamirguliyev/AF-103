import React, { useState } from "react";
import AddTodo from "./AddTodo";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';
import TodoList from "./TodoList";

const Todo = ({ todos, setTodos }) => {
  
  //Add 
    const handleAddTodo = (description) => {
      const newTodo = {
        id:  uuidv4(),
        description: description,
        isCompleted: false,
        todoDate: new Date(),
      };
  
      setTodos([...todos, newTodo]);
    };
  
    //Delete
    const handleDeleteTodo = (id) => {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    };
  
    //complate
    const handleMarkAsDone = (id) => {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      );
      setTodos(updatedTodos);
    };
  
    //sort by date
    const handleSortByDate = () => {
      const sortedTodos = [...todos].sort(
        (a, b) => new Date(b.todoDate) - new Date(a.todoDate)
      );
      setTodos(sortedTodos);
    };
  

    //sort by complate
    const handleSortCompletedTodos = () => {
      const completedTodos = todos.filter((todo) => todo.isCompleted);
      const incompletedTodos = todos.filter((todo) => !todo.isCompleted);
      const sortedTodos = [...incompletedTodos, ...completedTodos];
      setTodos(sortedTodos);
    };
  

    //search todo
    const handleSearchTodo = (search) => {
      const [searcht,setSearch] = useState(todos);
      let arr=[...searcht]


      
      const filteredTodos = arr.filter((todo) =>
        todo.description.toLowerCase().includes(search.toLowerCase())
      );
      if (search.trim() == "") {
        console.log(todos)
        setTodos([...todos]);
      } else {
        console.log(todos)
        setSearch(filteredTodos);
      }
    };
  
    return (
      <div>
        <h1>Zamir Todo App</h1>
        <AddTodo AddTodoItem={handleAddTodo} />
        <TodoList
          todos={todos}
          onDeleteTodo={handleDeleteTodo}
          onMarkAsDone={handleMarkAsDone}
          onSortByDate={handleSortByDate}
          onSortCompletedTodos={handleSortCompletedTodos}
          onSearchTodo={handleSearchTodo}
        />
      </div>
    );
  };



Todo.propTypes = {
  todos: PropTypes.array.isRequired,
  setTodos: PropTypes.func.isRequired,
};

export default Todo;
