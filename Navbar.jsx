import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>

            <h2>StyleShop</h2>

            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                <Link to="/products">
                    Products
                </Link>

                <Link to="/order">
                    Order
                </Link>

                <Link to="/history">
                    Order History
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;