import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import { Link } from "react-router-dom";
import { PiTrashDuotone } from "react-icons/pi";

const CartDetail = ({ cart }) => {
    const { 
        removeProduct, 
        clearCart, 
        priceTotal, 
        itemsTotal 
    } = useContext(CartContext);

    return (
        <>
            <h1>Cart</h1>
            <ul className="list-group list-group-flush">
                {cart.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-start">
                        {item.title} - {item.stock} - ${item.price * item.stock}
                        <button onClick={() => removeProduct(item.id)} className="btn btn-secondary">
                            <PiTrashDuotone />
                        </button>
                    </li>
                ))}
            </ul>
            <p className="text-start">Items: {itemsTotal()}</p>
            <h5 className="text-start">Total: ${priceTotal()}</h5>
            <div className="d-flex justify-content-between my-4">
                <button onClick={clearCart} className="btn btn-outline-secondary">Clear Cart</button>
                <Link to={"/"} className="btn btn-outline-secondary">Continue Shopping</Link>
                <Link to={"/checkout"} className="btn btn-outline-primary">Proceed to Checkout</Link>
            </div>
        </>
    );
}

export default CartDetail;