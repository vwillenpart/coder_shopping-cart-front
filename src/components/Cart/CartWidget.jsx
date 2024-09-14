import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartProvider";

function CartWidget() {
  const { itemsTotal } = useContext(CartContext);
  return (
        <Link to={"/cart"} className="btn btn-secondary position-relative">
            <PiShoppingCartSimpleFill />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-dark">
              {itemsTotal()}
                <span className="visually-hidden">cart items</span>
            </span>
        </Link>
  );
}

export default CartWidget;