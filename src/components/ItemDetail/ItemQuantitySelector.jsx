import { useContext, useState} from "react";
import { CartContext } from "../../context/CartProvider";
import { Link } from "react-router-dom";
const ItemQuantitySelector = ({ product }) => {
    const [count, setCount] = useState(1);
    const { addToCart, itemsTotal } = useContext(CartContext);
    const [message, setMessage] = useState("");
    const [showLink, setshowLink] = useState(false);

    const currentCountExceedsStock = count >= product.stock;
    const totalItemsInCart = itemsTotal(product.id);
    const totalItemsExceedStock = (totalItemsInCart + count) >= product.stock;

    const increment = () => {
        if (!currentCountExceedsStock || !totalItemsExceedStock) {
            setCount(count + 1)
        } 
        else {
            setMessage("No more stock available");
        }
    }

    const decrement = () => {
        if (count >= 0) {
            setCount(count - 1)
        }
    }

    const reset = () => {
        setCount(1)
    }

    const add = () => {
        addToCart(product, count);
        setMessage("Added " + count + " " + product.title + " to cart");
        setshowLink(true);
    }

    const isAvailable = () => {
        return currentCountExceedsStock || totalItemsExceedStock;
    }

    return (
        <div className="col-sm-12">
            <p className="mb-4 text-muted small">{product.stock} currently in stock</p>
            <label htmlFor="quantity">Quantity:</label>
            
            <div className="input-group mb-3">
                <button className="btn btn-outline-secondary" type="button" onClick={decrement}>-</button>
                <input className="form-control" aria-label="Value" type="text" id="quantity" value={count} readOnly max={product.stock} />
                <button className="btn btn-outline-secondary" type="button" onClick={increment}>+</button>
                <button className="btn btn-outline-secondary" type="button" onClick={reset}>Reset</button>
            </div>
            <button className="btn btn-outline-secondary btn-lg" onClick={add} disabled={isAvailable()}>Add to Cart</button>
            <p className="m-4 text-muted small">{message}</p>
            {showLink && <Link to="/cart" className="link-secondary">Go to cart</Link>}
        </div>
    );
}
export default ItemQuantitySelector;