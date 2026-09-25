import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartContext";
import AppHome from "./AppHome";
import Collections from "./pages/collections";
import CollectionDetail from "./pages/CollectionDetail";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppHome />} />
          <Route path="/collections" element={<Collections />} />
          <Route
            path="/collections/:id"
            element={<CollectionDetail />}
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;