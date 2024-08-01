import { PiShoppingCartSimpleFill } from "react-icons/pi";
function CartWidget() {
  return (
        <button type="button" className="btn btn-secondary position-relative">
            <PiShoppingCartSimpleFill />

            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-dark">
                10+
                <span className="visually-hidden">cart items</span>
            </span>
        </button>
  );
}

export default CartWidget;