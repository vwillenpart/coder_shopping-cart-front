
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import Container from '../Container';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

const ItemListContainer = ({ greeting }) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const itemsCollection = collection(db, "item");
    const products = categoryId ? query(itemsCollection, where("category", "array-contains", categoryId)) : itemsCollection;
    
    getDocs(products).then((querySnapshot) => {
      setProducts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }
    ).catch((error) => {
      console.log("Error getting products:", error);
    }
    ).finally(() => {
      setLoading(false);
    });
    
  }, [categoryId]);

  return (
    <Container>
      <h1 className="display-1">{greeting}</h1>
      {loading ? <p>Loading...</p> : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <ItemList products={products} />
        </div>
      )}
    </Container>
  );
}
export default ItemListContainer;