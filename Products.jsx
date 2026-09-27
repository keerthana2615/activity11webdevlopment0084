import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";

function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {

        const { data, error } = await supabase
            .from("products")
            .select("*");

        if (error) {

            console.log("ERROR:", error);

        } else {

            setProducts(data);

        }
    }

    return (
        <div className="products-page">

            <h1>
                Our Products
            </h1>

            <p className="products-subtitle">
                Explore our collection of quality products.
            </p>

            <div className="product-container">

                {products.map((product) => (

                    <div
                        className="product-card"
                        key={product.id}
                    >

                        <img
                            src={product.image}
                            alt={product.name}
                        />

                        <h2>
                            {product.name}
                        </h2>

                        <p>
                            Category: {product.category}
                        </p>

                        <p className="price">
                            ₹{product.price}
                        </p>

                        <p>
                            Stock: {product.stock}
                        </p>


                        {product.stock > 0 ? (

                            <Link
                                to={`/order?product=${product.id}`}
                            >

                                <button>
                                    Buy Now
                                </button>

                            </Link>

                        ) : (

                            <button disabled>
                                Out of Stock
                            </button>

                        )}

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Products;