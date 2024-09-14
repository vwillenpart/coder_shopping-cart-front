import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemList/ItemListContainer';
import ItemDetailContainer from './components/ItemDetail/ItemDetailContainer';
import Checkout from './components/Checkout/Checkout';
import CartProvider from './context/CartProvider';
import Cart from './components/Cart/Cart';
import OrderCompleted from './components/Cart/OrderCompleted';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const categories = ['Gold', 'Silver', 'Earrings', 'Chain', "Rings", "Stone"];
  
  return (
    <CartProvider>
      <Router>
        <NavBar categories={categories}></NavBar>
        <Routes>
          <Route path="/" element={<ItemListContainer greeting="Welcome!"></ItemListContainer>} />
          <Route path="/category/:categoryId" element={<ItemListContainer greeting="Products"></ItemListContainer>} />
          <Route path="/item/:itemId" element={<ItemDetailContainer></ItemDetailContainer>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-completed/:orderId" element={<OrderCompleted />} />
          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
