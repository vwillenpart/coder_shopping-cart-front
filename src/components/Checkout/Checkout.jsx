import { useState, useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import { collection, addDoc, updateDoc, doc, getDoc, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Container from "../Container";

const Checkout = () => {

  const { 
    cart,
    clearCart,
    getItemQuantity, 
    priceTotal, 
    itemsTotal 
  } = useContext(CartContext);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [onHold, setOnHold] = useState(false);

  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
  };
 
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
 
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setOnHold(true);
    if (!name || !email || !address) {
      setError("Please fill out all fields");
      return;
    }
    const db = getFirestore();
    const order = {
      buyer: {
        name: name,
        email: email,
        address: address,
      },
      items: cart,
      date: new Date(),
      total: priceTotal(),
    };
    Promise.all(
      order.items.map(async (productOrder) => {
        const productRef = doc(db, "item", productOrder.id);
        const productDoc = await getDoc(productRef);
        const stock = productDoc.data().stock;

        await updateDoc(productRef, {
          stock: stock - productOrder.stock,
        });
      })
    ).then(async () => {

      addDoc(collection(db, "orders"), order)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        navigate("/order-completed/" + docRef.id);
      }
      ).catch((error) => {
        setError("Error adding document: " + error);
      }
      );
      clearCart();
    }
    ).catch((error) => {
      setError("Error adding document: " + error);
    }
    );

  }

  return (
    <Container>
      <h1>Checkout Summary</h1>
      <div className="row">
        <ul className="list-group list-group-flush card col-6">
          {cart.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-start">
              {item.title} x {getItemQuantity(item.id)}
            </li>
          ))}
          <li className="list-group-item d-flex justify-content-between align-items-start">Total Items: {itemsTotal()}</li>
          <li className="list-group-item d-flex justify-content-between align-items-start">Total Price: ${priceTotal()}</li>
        </ul>
        
        <form onSubmit={handleFormSubmit} className="col-6 p-3">

        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="name" onChange={handleName} value={name} required />
          <label htmlFor="name">Full Name</label>
        </div>
        
        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="email" onChange={handleEmail} value={email} required />
          <label htmlFor="email">Email address</label>
        </div>

        <div className="form-floating mb-3">
          <textarea className="form-control" id="address" onChange={handleAddress} value={address} required />
          <label htmlFor="address">Address</label>
        </div>


          <button className="w-100 btn btn-primary btn-lg" type="submit" disabled={onHold}>Place order</button>
          {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
        </form>
      </div>
    </Container>
  );
};

export default Checkout;