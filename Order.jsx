import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../supabase";

function Order() {

    const [products, setProducts] = useState([]);

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [productId, setProductId] = useState("");

    const [quantity, setQuantity] = useState(1);

    const [orderDetails, setOrderDetails] = useState(null);

    const [searchParams] = useSearchParams();


    useEffect(() => {

        getProducts();

    }, []);


    async function getProducts() {

        const { data, error } = await supabase
            .from("products")
            .select("*");

        if (error) {

            console.log("ERROR:", error);

            return;
        }

        setProducts(data);


        const selectedProduct =
            searchParams.get("product");

        if (selectedProduct) {

            setProductId(selectedProduct);

        }
    }


    const selectedProduct = products.find(
        (product) =>
            product.id === Number(productId)
    );


    const price = selectedProduct
        ? Number(selectedProduct.price)
        : 0;


    const total =
        price * Number(quantity);


    async function placeOrder(e) {

        e.preventDefault();


        if (!selectedProduct) {

            alert("Please select a product");

            return;
        }


        if (Number(quantity) <= 0) {

            alert("Quantity must be greater than 0");

            return;
        }


        if (
            Number(quantity) >
            selectedProduct.stock
        ) {

            alert(
                `Only ${selectedProduct.stock} items are available.`
            );

            return;
        }


        const { error } = await supabase
            .from("orders")
            .insert([
                {
                    customer_name: name,
                    customer_email: email,
                    product_id: selectedProduct.id,
                    quantity: Number(quantity),
                    total_amount: total
                }
            ]);


        if (error) {

            console.log(
                "ORDER ERROR:",
                error
            );

            alert("Order failed.");

            return;
        }


        const newStock =
            selectedProduct.stock -
            Number(quantity);


        const { error: stockError } =
            await supabase
                .from("products")
                .update({
                    stock: newStock
                })
                .eq(
                    "id",
                    selectedProduct.id
                );


        if (stockError) {

            console.log(
                "STOCK ERROR:",
                stockError
            );

            alert(
                "Order placed, but stock was not updated."
            );

        }


        // Save order details before clearing the form
        setOrderDetails({
            customerName: name,
            customerEmail: email,
            productName: selectedProduct.name,
            quantity: Number(quantity),
            price: price,
            total: total
        });


        // Clear form
        setName("");

        setEmail("");

        setProductId("");

        setQuantity(1);


        // Refresh products so stock is updated
        getProducts();

    }


    return (
        <div className="order-page">

            <h1>
                Place Your Order
            </h1>


            {!orderDetails && (

                <form onSubmit={placeOrder}>

                    <label>
                        Customer Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        required
                    />


                    <label>
                        Customer Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />


                    <label>
                        Select Product
                    </label>

                    <select
                        value={productId}
                        onChange={(e) =>
                            setProductId(e.target.value)
                        }
                        required
                    >

                        <option value="">
                            Select Product
                        </option>


                        {products.map(
                            (product) => (

                                <option
                                    key={product.id}
                                    value={product.id}
                                    disabled={
                                        product.stock === 0
                                    }
                                >

                                    {product.name}
                                    {" - ₹"}
                                    {product.price}

                                    {product.stock === 0
                                        ? " - Out of Stock"
                                        : ""}

                                </option>

                            )
                        )}

                    </select>


                    <label>
                        Quantity
                    </label>

                    <input
                        type="number"
                        min="1"
                        max={
                            selectedProduct
                                ? selectedProduct.stock
                                : undefined
                        }
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(e.target.value)
                        }
                        required
                    />


                    {selectedProduct && (

                        <div className="order-total">

                            <p>
                                Product:
                                {" "}
                                {selectedProduct.name}
                            </p>

                            <p>
                                Price:
                                {" ₹"}
                                {price.toFixed(2)}
                            </p>

                            <p>
                                Available Stock:
                                {" "}
                                {selectedProduct.stock}
                            </p>

                            <p>
                                Total Amount:
                                {" ₹"}
                                {total.toFixed(2)}
                            </p>

                        </div>

                    )}


                    <button type="submit">
                        Place Order
                    </button>

                </form>

            )}


            {orderDetails && (

                <div className="success-order">

                    <h2>
                        🎉 Order Placed Successfully!
                    </h2>

                    <p className="success-message">
                        Thank you for shopping with StyleShop.
                    </p>


                    <div className="order-summary">

                        <h3>
                            Order Details
                        </h3>


                        <p>
                            <strong>
                                Customer Name:
                            </strong>

                            {" "}
                            {orderDetails.customerName}
                        </p>


                        <p>
                            <strong>
                                Customer Email:
                            </strong>

                            {" "}
                            {orderDetails.customerEmail}
                        </p>


                        <p>
                            <strong>
                                Product:
                            </strong>

                            {" "}
                            {orderDetails.productName}
                        </p>


                        <p>
                            <strong>
                                Quantity:
                            </strong>

                            {" "}
                            {orderDetails.quantity}
                        </p>


                        <p>
                            <strong>
                                Price:
                            </strong>

                            {" ₹"}
                            {orderDetails.price.toFixed(2)}
                        </p>


                        <p className="final-total">
                            <strong>
                                Total Amount:
                            </strong>

                            {" ₹"}
                            {orderDetails.total.toFixed(2)}
                        </p>

                    </div>


                    <button
                        className="new-order-button"
                        onClick={() =>
                            setOrderDetails(null)
                        }
                    >
                        Place Another Order
                    </button>

                </div>

            )}

        </div>
    );
}

export default Order;