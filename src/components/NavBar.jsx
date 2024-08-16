import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import { PiSpiral } from "react-icons/pi";

const NavBar = ({ items }) => {

    return (
        <nav className="navbar navbar-expand-md bg-body-secondary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><PiSpiral/> Tienda</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {items && items.map((item, index) => (
                            <li className="nav-item" key={index}>
                                <Link className="nav-link" to={`/category/${item}`}>{item}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <li className="d-flex px-3"><CartWidget /></li>

            </div>
        </nav>
    )
  }
  export default NavBar
