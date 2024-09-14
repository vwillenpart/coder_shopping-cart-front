import { Link } from "react-router-dom";
const ItemList = ({ products }) => {
  return products.map((product) => (
    <div className="col" key={product.id}>
      <Link to={`/item/${product.id}`} className="card h-100">
        <img src={product.thumbnails[0]} className="card-img-top" alt={product.title} />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.description}</p>
          <p className="card-text">${product.price}</p>
        </div>
      </Link>
    </div>
  ))
}

export default ItemList;