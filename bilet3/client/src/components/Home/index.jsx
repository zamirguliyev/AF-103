import React from 'react'
import Chef from '../../pages/Chef'
import Menu from '../../pages/Menu';
import Specialties from '../../pages/Specialties';
import Blog from '../../pages/Blog';
import Guests from '../../pages/Guests'
const Home = () => {
    return (
        <>
        <Chef />
        <Menu />
        <Specialties />
        <Guests/>
        <Blog />
        </>
    )
}

export default Home
