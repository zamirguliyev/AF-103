import { useState } from 'react'
import './App.css'
import Todo from './components/Todo'

function App() {

  let [todos,setTodos] = useState([])

  return (
    <>
    <Todo todos={todos} setTodos={setTodos} />
    </>
  )
}

export default App
