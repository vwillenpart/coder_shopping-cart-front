import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import CartDetail from "./CartDetail";
import Container from "../Container";
const Cart = () => {
    const { cart } = useContext(CartContext);

    return (
        <Container>
            <CartDetail cart={cart} />
        </Container>
    );
}

export default Cart;