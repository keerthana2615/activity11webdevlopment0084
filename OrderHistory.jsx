import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function OrderHistory() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders();
    }, []);

    async function getOrders() {

        const { data, error } = await supabase
            .from("orders")
            .select(`
                id,
                customer_name,
                customer_email,
                quantity,
                total_amount,
                order_date,
                products (
                    name,
                    category
                )
            `);

        if (error) {

            console.log(
                "ERROR:",
                error
            );

        } else {

            setOrders(data);

        }
    }

    return (
        <div className="history-page">

            <h1>
                Order History
            </h1>

            {orders.length === 0 ? (

                <p className="no-orders">
                    No orders found.
                </p>

            ) : (

                <div className="table-container">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    Customer
                                </th>

                                <th>
                                    Email
                                </th>

                                <th>
                                    Product
                                </th>

                                <th>
                                    Category
                                </th>

                                <th>
                                    Quantity
                                </th>

                                <th>
                                    Total
                                </th>

                                <th>
                                    Date
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {orders.map(
                                (order) => (

                                    <tr
                                        key={order.id}
                                    >

                                        <td>
                                            {order.customer_name}
                                        </td>

                                        <td>
                                            {order.customer_email}
                                        </td>

                                        <td>
                                            {order.products?.name}
                                        </td>

                                        <td>
                                            {order.products?.category}
                                        </td>

                                        <td>
                                            {order.quantity}
                                        </td>

                                        <td>
                                            ₹
                                            {order.total_amount}
                                        </td>

                                        <td>
                                            {new Date(
                                                order.order_date
                                            ).toLocaleString()}
                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
}

export default OrderHistory;