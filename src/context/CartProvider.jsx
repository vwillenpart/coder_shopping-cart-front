import { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider( {children} ) {
    const [cart, setCart] = useState([]);

    const addToCart = ( product, stock ) => {
        if (isInCart(product.id)){
            setCart(
                cart.map((i) => {
                    if (i.id === product.id){
                        i.stock += stock;
                    }
                    return i;
                })
            );
        } else {
            setCart([...cart, {...product, stock}]);
        }
    }      

    const isInCart = (id) => {
        return cart.some((item) => item.id === id);
    };

    const getItemFromCart = (id) => {
        return cart.find((item) => item.id === id);
    };

    const getItemQuantity = (id) => {
        const item = getItemFromCart(id);
        return item ? item.stock : 0;
    };

    function priceTotal() {
        let total = 0;
        cart.map ( (i) => total += i.price * i.stock );
        return total;
    }
        
    function itemsTotal() {
        let quantity = 0;
        cart.map(i => quantity += i.stock);
        return quantity;
    }


    const removeProduct = (id) => {
        const newCart = [...cart];
        const cartFilter = newCart.filter(item =>{
            return item.id !== id;
        });
        setCart(cartFilter);
    }
        
    const clearCart = () => {
        setCart([]);
    }

    return (
        <CartContext.Provider 
            value={{ 
                cart,
                addToCart, 
                removeProduct, 
                clearCart, 
                isInCart, 
                getItemFromCart, 
                getItemQuantity, 
                priceTotal, 
                itemsTotal 
            }}>
        {children}
        </CartContext.Provider>
    )
}

export default CartProvider;