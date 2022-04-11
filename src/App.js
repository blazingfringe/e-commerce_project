import React, { useEffect, useState } from 'react'
import { commerce } from './lib/commerce'

// import Products from './components/Products/Products';
// import Navbar from './components/Products/Navbar/Navbar';

import {Products, Navbar} from './components'

const App = () => {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  }

  const fetchCart = async () => {

    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productID, quantity) => {
    const item = await commerce.cart.add(productID, quantity);

    setCart(item.cart);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

 console.log(cart);


  return (
    <div>
        <Navbar totalItems={cart.total_items}/>
        <Products products={products} onAddToCart={handleAddToCart} />
    </div>
  )
}

export default App