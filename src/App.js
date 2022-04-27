import React, { useEffect, useState } from 'react'
import { commerce } from './lib/commerce'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Products from './components/Products/Products';
// import Navbar from './components/Products/Navbar/Navbar';

import {Products, Navbar, Cart, Checkout} from './components'

const App = () => {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState({});

  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  }

  const fetchCart = async () => {

    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productID, quantity) => {
    const {cart} = await commerce.cart.add(productID, quantity);

    setCart(cart);
  }

  const handleUpdateCartQty = async (productID, quantity) => {
    const { cart } = await commerce.cart.update(productID, {quantity});
    setCart (cart)
  }

  const handleRemoveFromCart = async (productID) => {
    const {cart} = await commerce.cart.remove(productID);
    setCart(cart);
  }

  const handleEmptyCart = async () => {
    const {cart} = await commerce.cart.empty();

    setCart(cart);
  }


  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  }

  const handleCaptureCheckout = async (CheckoutTokenID, newOrder) => {
    try{
      const incomingOrder = await commerce.checkout.capture(CheckoutTokenID, newOrder);

      setOrder(incomingOrder);
      refreshCart();
    }
    catch(error){
      setErrorMessage(error.data.error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

 console.log(cart);


  return (
    <Router>
        <Navbar totalItems={cart.total_items}/>
        <Routes>
          <Route exact path='/' element={<Products products={products} onAddToCart={handleAddToCart} />}/>
          <Route exact path='/cart' element={<Cart cart={cart}
          handleUpdateCartQty = {handleUpdateCartQty}
          handleRemoveFromCart = {handleRemoveFromCart}
          handleEmptyCart = {handleEmptyCart}
          /> }/>
          <Route exact path='/checkout' element={
          <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}
          />}>

          </Route>
        </Routes>
    </Router>
  )
}

export default App