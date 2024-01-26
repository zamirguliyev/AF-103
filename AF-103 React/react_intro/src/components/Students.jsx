import React from 'react'
import {students} from '../data.js'

const Students = () => {
    // console.log(students)
  return (
    <>
    <ul>
        {students.map((item,id)=>{
           return  <li key={id}>{item.name}</li>
        })}
    </ul>
    </>
  )
}

export default Students