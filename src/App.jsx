import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';

function App() {
  const categories = ['Anillos', 'Brazaletes', 'Aros', 'Cadenas'];

  return (
    <>
      <NavBar items={categories}></NavBar>
      <ItemListContainer greeting="Bienvenidos a la tienda!"></ItemListContainer>
    </>
  )
}

export default App
