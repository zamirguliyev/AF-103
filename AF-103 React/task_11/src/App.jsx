import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Categories from './pages/Categories';
import Basket from './pages/Basket';
import BasketContextProvider from './services/BasketContex';
import UserFooter from './components/Footer';

const App = () => {
  return (
    <Router>
      <BasketContextProvider>
        <Navbar />
        <Routes>
          <Route path="/categories" element={<Categories />} />
          <Route path="/basket" element={<Basket />} />
        </Routes>
        <UserFooter />
      </BasketContextProvider>
    </Router>
  );
};

export default App;
