import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useCart } from "../CartContext";
import "./CollectionDetail.css";

function CollectionDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const collectionNames = {
    "01": "Nigerian Native Wear",
    "02": "English Gowns",
    "03": "Ready-to-Wear",
    "04": "Shorts & Sets",
    "05": "Men’s Vintage Shirts",
    "06": "Beach & Resort Wear",
  };

  const collectionName =
    collectionNames[id] || "Nigerian Native Wear";

  useEffect(() => {
   fetch("https://reebee-revia-api.megvincent9876.workers.dev/api/products")
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = data.filter(
          (product) => product.collection === collectionName
        );

        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading products:", error);
        setLoading(false);
      });
  }, [collectionName]);

  const handleAddToCart = (product) => {
  const size =
    document.getElementById(`size-${product.id}`)?.value ||
    "One Size";

  const color =
    document.getElementById(`color-${product.id}`)?.value ||
    "Default";

  addToCart(product, size, color);

  alert(`${product.name} has been added to your cart.`);
};

  return (
  <div className="collection-detail-page">
    <Navbar />
      <header className="collection-detail-header">
        <p>REEBEE_REVIA — COLLECTION</p>

        <h1>{collectionName}</h1>

        <p className="description">
          Discover elegant African fashion created for
          women and men who wear confidence with style.
        </p>
      </header>

      <main className="products-grid">
        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products in this collection yet.</p>
        ) : (
          products.map((product) => (
            <article
              className="product-card"
              key={product.id}
            >
              <div className="product-image">
                <img
                  src={
                    product.image.startsWith("http")
                      ? product.image
                      : `https://reebee-revia.onrender.com${product.image}`
                  }
                  alt={product.name}
                />
              </div>

              <div className="product-info">
                <h2>{product.name}</h2>

                <p>{product.description}</p>

                {product.sizes && (
                  <p>Sizes: {product.sizes}</p>
                )}

                {product.colors && (
                  <p>Colors: {product.colors}</p>
                )}

                <p className="product-price">
  ₦{Number(product.price).toLocaleString()}
</p>

{product.sizes && (
  <div style={{ marginTop: "15px" }}>
    <label
      style={{
        display: "block",
        marginBottom: "8px",
        fontSize: "11px",
        letterSpacing: "1px",
      }}
    >
      SIZE
    </label>

    <select
      id={`size-${product.id}`}
      style={{
        padding: "10px",
        width: "100%",
        maxWidth: "250px",
      }}
    >
      {product.sizes.split(",").map((size) => (
        <option key={size.trim()} value={size.trim()}>
          {size.trim()}
        </option>
      ))}
    </select>
  </div>
)}

{product.colors && (
  <div style={{ marginTop: "15px" }}>
    <label
      style={{
        display: "block",
        marginBottom: "8px",
        fontSize: "11px",
        letterSpacing: "1px",
      }}
    >
      COLOR
    </label>

    <select
      id={`color-${product.id}`}
      style={{
        padding: "10px",
        width: "100%",
        maxWidth: "250px",
      }}
    >
      {product.colors.split(",").map((color) => (
        <option key={color.trim()} value={color.trim()}>
          {color.trim()}
        </option>
      ))}
    </select>
  </div>
)}

<button
                  onClick={() => handleAddToCart(product)}
                  style={{
                    marginTop: "20px",
                    padding: "14px 24px",
                    background: "#f8f2f6",
                    color: "#24102f",
                    border: "none",
                    cursor: "pointer",
                    letterSpacing: "2px",
                    fontSize: "10px",
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </article>
          ))
        )}
      </main>

      <Link
        to="/cart"
        className="back-link"
        style={{
          marginRight: "25px",
        }}
      >
        VIEW CART
      </Link>

      <Link
        to="/collections"
        className="back-link"
      >
        ← BACK TO COLLECTIONS
      </Link>
    </div>
  );
}

export default CollectionDetail;