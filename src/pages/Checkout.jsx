import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useCart } from "../CartContext";

function Checkout() {
  const { cart, cartTotal } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const handleWhatsAppOrder = () => {
    if (!customer.name || !customer.phone || !customer.address) {
      alert(
        "Please fill in your name, phone number, and delivery address."
      );
      return;
    }

    let message =
      `Hello REEBEE_REVIA, I would like to place an order.\n\n`;

    message += `CUSTOMER DETAILS\n`;
    message += `Name: ${customer.name}\n`;
    message += `Phone/WhatsApp: ${customer.phone}\n`;
    message += `Delivery Address: ${customer.address}\n`;

    if (customer.notes) {
      message += `Notes: ${customer.notes}\n`;
    }

    message += `\nORDER DETAILS\n`;

    cart.forEach((item, index) => {
      message += `\n${index + 1}. ${item.name}\n`;
      message += `Size: ${item.size}\n`;
      message += `Color: ${item.color}\n`;
      message += `Quantity: ${item.quantity}\n`;
      message += `Price: ₦${(
        Number(item.price) * item.quantity
      ).toLocaleString()}\n`;
    });

    message += `\nTOTAL: ₦${cartTotal.toLocaleString()}\n\n`;
    message += `Please send me the payment details and delivery information. Thank you.`;

    const whatsappUrl =
      `https://wa.me/2348081793607?text=` +
      encodeURIComponent(message);

    window.open(whatsappUrl, "_blank");
  };

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
            REEBEE_REVIA — ORDER
          </p>

          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "70px",
              fontWeight: "normal",
            }}
          >
            Your Cart Is Empty
          </h1>

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
          REEBEE_REVIA — ORDER
        </p>

        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "70px",
            fontWeight: "normal",
          }}
        >
          Complete Your Order
        </h1>

        <p
          style={{
            maxWidth: "600px",
            lineHeight: "1.8",
            opacity: 0.7,
          }}
        >
          Review your order and send it to REEBEE_REVIA on
          WhatsApp. Payment details will be provided directly
          after we receive your order.
        </p>

        <div style={{ marginTop: "50px" }}>
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: "normal",
            }}
          >
            Order Summary
          </h2>

          {cart.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              style={{
                padding: "20px 0",
                borderBottom:
                  "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <strong>{item.name}</strong>

              <p>
                Size: {item.size} | Color: {item.color}
              </p>

              <p>Quantity: {item.quantity}</p>

              <p>
                ₦
                {(
                  Number(item.price) * item.quantity
                ).toLocaleString()}
              </p>
            </div>
          ))}

          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: "normal",
              marginTop: "35px",
            }}
          >
            Total: ₦{cartTotal.toLocaleString()}
          </h2>
        </div>

        <div style={{ marginTop: "50px" }}>
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: "normal",
            }}
          >
            Your Details
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            value={customer.name}
            onChange={(e) =>
              setCustomer({
                ...customer,
                name: e.target.value,
              })
            }
            style={{
              display: "block",
              width: "100%",
              maxWidth: "600px",
              padding: "15px",
              marginTop: "20px",
            }}
          />

          <input
            type="tel"
            placeholder="Phone / WhatsApp Number"
            value={customer.phone}
            onChange={(e) =>
              setCustomer({
                ...customer,
                phone: e.target.value,
              })
            }
            style={{
              display: "block",
              width: "100%",
              maxWidth: "600px",
              padding: "15px",
              marginTop: "15px",
            }}
          />

          <textarea
            placeholder="Delivery Address"
            value={customer.address}
            onChange={(e) =>
              setCustomer({
                ...customer,
                address: e.target.value,
              })
            }
            style={{
              display: "block",
              width: "100%",
              maxWidth: "600px",
              minHeight: "120px",
              padding: "15px",
              marginTop: "15px",
            }}
          />

          <textarea
            placeholder="Additional Notes (Optional)"
            value={customer.notes}
            onChange={(e) =>
              setCustomer({
                ...customer,
                notes: e.target.value,
              })
            }
            style={{
              display: "block",
              width: "100%",
              maxWidth: "600px",
              minHeight: "100px",
              padding: "15px",
              marginTop: "15px",
            }}
          />
        </div>

        <div style={{ marginTop: "50px" }}>
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: "normal",
            }}
          >
            Contact REEBEE_REVIA
          </h2>

          <p
            style={{
              lineHeight: "1.8",
              opacity: 0.75,
            }}
          >
            📞 Call: +234 808 179 3607
            <br />
            💬 WhatsApp: +234 808 179 3607
          </p>

          <button
            onClick={handleWhatsAppOrder}
            style={{
              marginTop: "20px",
              padding: "16px 30px",
              background: "#f8f2f6",
              color: "#24102f",
              border: "none",
              cursor: "pointer",
              letterSpacing: "2px",
              fontSize: "10px",
            }}
          >
            ORDER VIA WHATSAPP
          </button>

          <br />

          <a
            href="tel:+2348081793607"
            style={{
              display: "inline-block",
              marginTop: "20px",
              color: "#f8f2f6",
              textDecoration: "none",
              letterSpacing: "2px",
              fontSize: "10px",
            }}
          >
            📞 CALL REEBEE_REVIA
          </a>
        </div>

        <Link
          to="/cart"
          style={{
            display: "inline-block",
            marginTop: "40px",
            color: "#f8f2f6",
            textDecoration: "none",
            letterSpacing: "2px",
            fontSize: "10px",
          }}
        >
          ← BACK TO CART
        </Link>
      </div>
    </>
  );
}

export default Checkout;