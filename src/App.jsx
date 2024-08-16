import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const categories = ['Gold', 'Silver', 'Earrings', 'Chains', "Rings", "Stone"];

  return (
    <Router>
      <NavBar items={categories}></NavBar>
      <Routes>
        <Route path="/" element={<ItemListContainer greeting="Bienvenidos a la tienda!"></ItemListContainer>} />
        <Route path="/category/:categoryId" element={<ItemListContainer greeting="Productos"></ItemListContainer>} />
        <Route path="/item/:itemId" element={<ItemDetailContainer greeting="Detalle del producto"></ItemDetailContainer>} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </Router>
  )
}

export default App
