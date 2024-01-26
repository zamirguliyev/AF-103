import React, { createContext, useState, useEffect } from 'react';

export const BasketContext = createContext();

const BasketContextProvider = (props) => {
    const initialBasket = JSON.parse(localStorage.getItem('basket')) || []; 

    const [basket, setBasket] = useState(initialBasket);
  
    useEffect(() => {
      localStorage.setItem('basket', JSON.stringify(basket));
    }, [basket]);

  const addItemToBasket = (item) => {
    const updatedBasket = [...basket];
    const existingItemIndex = updatedBasket.findIndex((basketItem) => basketItem.id === item.id);

    if (existingItemIndex !== -1) {
      updatedBasket[existingItemIndex].quantity += 1;
    } else {
      updatedBasket.push({ ...item, quantity: 1 });
    }

    setBasket(updatedBasket);
  };

  const removeItemFromBasket = (id) => {
    const updatedBasket = basket.filter((item) => item.id !== id);
    setBasket(updatedBasket);
  };

  const increaseQuantity = (id) => {
    const updatedBasket = basket.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setBasket(updatedBasket);
  };

  const decreaseQuantity = (id) => {
    const updatedBasket = basket.map((item) => {
      if (item.id === id && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setBasket(updatedBasket);
  };

  const clearBasket = () => {
    setBasket([]);
    localStorage.removeItem('basket');
  };

  return (
    <BasketContext.Provider
      value={{
        basket,
        addItemToBasket,
        removeItemFromBasket,
        increaseQuantity,
        decreaseQuantity,
        clearBasket,
      }}
    >
      {props.children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;
