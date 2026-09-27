import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Order from "./pages/Order";
import OrderHistory from "./pages/OrderHistory";

import "./App.css";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route
                    path="/products"
                    element={<Products />}
                />

                <Route
                    path="/order"
                    element={<Order />}
                />

                <Route
                    path="/history"
                    element={<OrderHistory />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;