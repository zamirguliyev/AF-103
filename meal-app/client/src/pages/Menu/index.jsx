import { useState, useEffect } from 'react'
import './index.scss'
import { GiMeatCleaver } from "react-icons/gi";
import axios from 'axios'
import { Link } from 'react-router-dom';

let API_URL = 'http://localhost:3000/api/meals'

const Menu = () => {

    let [data,setData] = useState([])
    let [cat,setCat] = useState('breakfast')

    useEffect(() => {
        axios
            .get(`${API_URL}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });

    }, [cat]);

    const filtered = data.filter((meal) => meal.category == `${cat}`);


    return (
        <div className='menu-container'>
            <div className="top">
                <GiMeatCleaver size={40} />
                <div className="title">
                    <span></span>
                    <h2 style={{ fontSize: "48px" }}>Our Menu</h2>
                    <span></span>
                </div>
            </div>

            <ul>
                <li onClick={()=>{setCat('breakfast')}}>BreakFast</li>
                <li onClick={()=>{setCat('brunch')}}>Brunch</li>
                <li onClick={()=>{setCat('lunch')}}>Lunch</li>
                <li onClick={()=>{setCat('dinner')}}>Dinner</li>
            </ul>

            {filtered.map((meal)=>{
               return(
                <div className="meals"  key={meal._id}>
               <div>
              <Link to={`/product/${meal._id}`}> <h3>{meal.title}</h3></Link>
                <p>{meal.desc}</p>
               </div>
               <h3>${meal.price}</h3>
            </div>
               )
            })}

        </div>
    )
}

export default Menu
