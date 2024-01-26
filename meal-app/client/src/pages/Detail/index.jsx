import './index.scss'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
let API_URL = 'http://localhost:3000/api/meals'


const Detail = () => {
    let {id} = useParams()
    let [data,setData] = useState([])

    useEffect(()=>{
        axios.get(`${API_URL}/${id}`)
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        });
    },[id])

    return (
    <div className='detail-container'>
        <h2>Title: {data.title}</h2>
        <h3>Price: ${data.price}</h3>
        <h3>Description: {data.desc}</h3>
    </div>
  )
}

export default Detail