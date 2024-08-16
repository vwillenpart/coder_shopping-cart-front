
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ItemListContainer = ({ greeting }) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryId } = useParams();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        const filteredData = categoryId && categoryId.length > 0 
          ? data.filter(product => product.category.some(cat => categoryId.includes(cat)))
          : data;
        setProducts(filteredData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
      getProducts();
  }, [categoryId]);

  return (
    <div className="container p-5 text-center">
      <h1 className="display-1">{greeting}</h1>
      {loading ? <p>Loading...</p> : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((product) => (
            <div className="col" key={product.id}>
              <Link to={`/item/${product.id}`} className="card h-100">
                <img src={product.thumbnails[0]} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">${product.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default ItemListContainer;