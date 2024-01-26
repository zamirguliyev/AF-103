import React from 'react'
import Welcome from '../../pages/Welcome';
import Testimonials from '../../pages/Testimonials';
import Services from '../../pages/Services';
import Menu from '../../pages/Menu';
import Contact from '../../pages/Contact';

const Home = () => {
    return (
        <>
            <Welcome/>
            <Testimonials/>
            <Services/>
            <Menu/>
            <Contact />
        </>
    )
}

export default Home
