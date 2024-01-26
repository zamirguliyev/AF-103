import React from 'react';
import TodoList from './components/TodoList';
import './App.css'

const App: React.FC = () => {

  return (
    <div className="App">
      <h1>Zustand Todo App</h1>
      <TodoList />
    </div>
  )
}

export default App
