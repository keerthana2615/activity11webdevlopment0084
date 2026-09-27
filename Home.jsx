import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home">

            <section className="hero">

                <img
                    className="hero-background"
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
                    alt="StyleShop Store"
                />

                <div className="hero-overlay"></div>

                <div className="hero-text">

                    <h1>
                        Welcome to StyleShop
                    </h1>

                    <p>
                        Discover quality products at affordable prices.
                    </p>

                    <Link to="/products">
                        <button>
                            Shop Now
                        </button>
                    </Link>

                </div>

            </section>


            <section className="features">

                <div className="feature-card">

                    <h2>
                        Quality Products
                    </h2>

                    <p>
                        Choose from a variety of quality products.
                    </p>

                </div>


                <div className="feature-card">

                    <h2>
                        Affordable Prices
                    </h2>

                    <p>
                        Great products at reasonable prices.
                    </p>

                </div>


                <div className="feature-card">

                    <h2>
                        Easy Ordering
                    </h2>

                    <p>
                        Place your order quickly and easily.
                    </p>

                </div>

            </section>

        </div>
    );
}

export default Home;