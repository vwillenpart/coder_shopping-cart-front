import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const { itemId } = useParams();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await fetch('/products.json');
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const foundProduct = data.find(product => {
                    console.log('Checking product:', product, product.id); // Log each product
                    return product.id == itemId;
                });
                setProduct(foundProduct);        
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        getProduct();
    }, [itemId]);

    return (

        <div className="container-fluid p-5 text-center">
        {loading ? <p>Loading...</p> : (
          product ? (
            <div className="row">
              <div className="pt-4 order-2 order-lg-1 col-xl-7 col-lg-6">
                <figure className="cursor-pointer">
                  <img src={product.thumbnails[0]} />
                </figure>
              </div>
              <div className="pt-4 order-1 order-lg-2 col-xl-4 col-lg-6">
                <h1 className="mb-4">{product.title}</h1>
                <div className="d-flex flex-column mb-4">
                  <ul className="list-inline mb-2 mb-sm-0">
                    <li className="list-inline-item h4 fw-light mb-0">${product.price}</li>
                    <li className="list-inline-item text-muted fw-light"><del>${product.price * 1.5}</del></li>
                  </ul>
                </div>
                <p className="mb-4 text-muted">{product.description}</p>
                <button className="btn btn-primary">Add to cart</button>
              </div>
            </div>
          ) : (
            <p>Product not found</p>
          )
        )}
      </div>
    );
  }
  export default ItemDetailContainer;