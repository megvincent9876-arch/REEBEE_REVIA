import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  if (cart.length === 0) {
    return (
      <>
        <Navbar />

        <div
          style={{
            minHeight: "100vh",
            padding: "120px 8%",
            background: "#24102f",
            color: "#f8f2f6",
          }}
        >
          <p
            style={{
              letterSpacing: "3px",
              fontSize: "11px",
              opacity: 0.6,
            }}
          >
            REEBEE_REVIA — SHOPPING CART
          </p>

          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "70px",
              fontWeight: "normal",
            }}
          >
            Your Cart
          </h1>

          <p>Your cart is currently empty.</p>

          <Link
            to="/collections"
            style={{
              display: "inline-block",
              marginTop: "25px",
              padding: "14px 24px",
              border: "1px solid rgba(255,255,255,0.5)",
              color: "#f8f2f6",
              textDecoration: "none",
              letterSpacing: "2px",
              fontSize: "10px",
            }}
          >
            SHOP COLLECTIONS
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          padding: "100px 8%",
          background: "#24102f",
          color: "#f8f2f6",
        }}
      >
        <p
          style={{
            letterSpacing: "3px",
            fontSize: "11px",
            opacity: 0.6,
          }}
        >
          REEBEE_REVIA — SHOPPING CART
        </p>

        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "70px",
            fontWeight: "normal",
            marginBottom: "60px",
          }}
        >
          Your Cart
        </h1>

        {cart.map((item) => (
          <div
            key={`${item.id}-${item.size}-${item.color}`}
            style={{
              display: "grid",
              gridTemplateColumns: "160px 1fr auto",
              gap: "30px",
              alignItems: "center",
              padding: "30px 0",
              borderBottom:
                "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <img
              src={
                item.image.startsWith("http")
                  ? item.image
                  : `http://localhost:5000${item.image}`
              }
              alt={item.name}
              style={{
                width: "160px",
                height: "200px",
                objectFit: "contain",
                background: "#291331",
              }}
            />

            <div>
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontWeight: "normal",
                }}
              >
                {item.name}
              </h2>

              <p>Size: {item.size}</p>
              <p>Color: {item.color}</p>

              <p>
                ₦{Number(item.price).toLocaleString()} each
              </p>

              <div style={{ marginTop: "15px" }}>
                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      item.size,
                      item.color,
                      item.quantity - 1
                    )
                  }
                >
                  −
                </button>

                <span style={{ margin: "0 15px" }}>
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      item.size,
                      item.color,
                      item.quantity + 1
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() =>
                removeFromCart(
                  item.id,
                  item.size,
                  item.color
                )
              }
              style={{
                background: "none",
                border: "none",
                color: "#f8f2f6",
                cursor: "pointer",
                letterSpacing: "1px",
              }}
            >
              REMOVE
            </button>
          </div>
        ))}

        <div
          style={{
            marginTop: "50px",
            textAlign: "right",
          }}
        >
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: "normal",
            }}
          >
            Total: ₦{cartTotal.toLocaleString()}
          </h2>

          <Link
            to="/checkout"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "16px 30px",
              background: "#f8f2f6",
              color: "#24102f",
              textDecoration: "none",
              letterSpacing: "2px",
              fontSize: "10px",
            }}
          >
            PROCEED TO ORDER
          </Link>
        </div>
      </div>
    </>
  );
}

export default Cart;