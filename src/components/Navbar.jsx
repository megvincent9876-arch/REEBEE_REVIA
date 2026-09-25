import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "25px 8%",
        position: "relative",
        zIndex: 10,
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "inherit",
          fontFamily: "Georgia, serif",
          fontSize: "22px",
          letterSpacing: "2px",
        }}
      >
        REEBEE_REVIA
      </Link>

      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          HOME
        </Link>

        <Link
          to="/collections"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          COLLECTIONS
        </Link>

        <Link
          to="/cart"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          CART ({cartCount})
        </Link>

        <a
          href="/#contact"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          CONTACT
        </a>
      </div>
    </nav>
  );
}

export default Navbar;