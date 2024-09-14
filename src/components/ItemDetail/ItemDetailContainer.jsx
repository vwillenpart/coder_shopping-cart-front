import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import ItemQuantitySelector from "./ItemQuantitySelector";
import ItemDescription from "./ItemDescription";
import Container from "../Container";

import { getFirestore, doc, getDoc } from 'firebase/firestore';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams();

  useEffect(() => {
    const db = getFirestore();
    const itemDoc = doc(db, "item", itemId);

    getDoc(itemDoc).then((doc) => {
      if (doc.exists()) {
        setProduct({ id: doc.id, ...doc.data() });
      } else {
        setProduct(null);
      }
    }).catch((error) => {
      console.log("Error getting product:", error);
    }).finally(() => {
      setLoading(false);
    });
  }, [itemId]);

  return (
    <Container>
      {loading ? <p>Loading...</p> : (
        product ? (
          <div className="row">
            <ItemDetail product={product} />
            <div className="col-xl-5 col-lg-6">
              <ItemDescription product={product} />
              <ItemQuantitySelector product={product} />
            </div>
          </div>
        ) : (
          <p>Product not found</p>
        )
      )}
    </Container>
  );
  }
  export default ItemDetailContainer;