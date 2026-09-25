import { useEffect, useState } from "react";

function Admin() {
const emptyForm = {
  name: "",
  description: "",
  price: "",
  collection: "",
  sizes: "",
  colors: "",
  image: null,
};

  const [form, setForm] = useState(emptyForm);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const loadProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");

      if (!response.ok) {
        throw new Error("Could not load products.");
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
      setMessage("Could not connect to the backend.");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    setForm({
      ...form,
      image: file,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      if (editingId) {
        const response = await fetch(
          `http://localhost:5000/api/products/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: form.name,
              description: form.description,
              price: Number(form.price),
              collection: form.collection,
              sizes: form.sizes,
  colors: form.colors,
              image:
                typeof form.image === "string"
                  ? form.image
                  : products.find((product) => product.id === editingId)
                      ?.image,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Could not update product.");
        }

        setMessage("Product updated successfully!");
      } else {
        if (!(form.image instanceof File)) {
          throw new Error("Please choose a product image.");
        }

        const formData = new FormData();

        formData.append("sizes", form.sizes);
        formData.append("colors", form.colors);
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", String(form.price));
        formData.append("collection", form.collection);
        formData.append("image", form.image);

        const response = await fetch(
          "http://localhost:5000/api/products",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Could not add product.");
        }

        setMessage("Product added successfully!");
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadProducts();
    } catch (error) {
      console.error("Save error:", error);
      setMessage(error.message || "Could not save product.");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);

    setForm({
      name: product.name,
      description: product.description || "",
      price: product.price,
      collection: product.collection,
      sizes: product.sizes || "",
colors: product.colors || "",
      image: product.image,
    });

    setMessage("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not delete product.");
      }

      setMessage("Product deleted successfully!");
      await loadProducts();
    } catch (error) {
      console.error("Delete error:", error);
      setMessage(error.message || "Could not delete product.");
    }
  };

  const imageUrl = (image) => {
    if (!image) {
      return "";
    }

    return image.startsWith("http")
      ? image
      : `http://localhost:5000${image}`;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#16091c",
        color: "#f6efe8",
        padding: "70px 25px 100px",
      }}
    >
      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            marginBottom: "70px",
            borderBottom: "1px solid rgba(201,173,130,0.25)",
            paddingBottom: "35px",
          }}
        >
          <p
            style={{
              margin: "0 0 25px",
              color: "#c9ad82",
              fontSize: "10px",
              letterSpacing: "5px",
            }}
          >
            REEBEE_REVIA — PRIVATE STUDIO
          </p>

          <h1
            style={{
              margin: 0,
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(55px, 8vw, 100px)",
              fontWeight: "normal",
              lineHeight: 0.9,
            }}
          >
            Product
            <br />
            <em>Management.</em>
          </h1>
        </header>

        <section
          style={{
            background: "#211026",
            border: "1px solid rgba(201,173,130,0.2)",
            padding: "40px",
            marginBottom: "80px",
          }}
        >
          <p
            style={{
              margin: "0 0 10px",
              color: "#c9ad82",
              fontSize: "10px",
              letterSpacing: "4px",
            }}
          >
            {editingId ? "EDIT EXISTING PIECE" : "ADD NEW PIECE"}
          </p>

          <h2
            style={{
              margin: "0 0 35px",
              fontFamily: "Georgia, serif",
              fontSize: "40px",
              fontWeight: "normal",
            }}
          >
            {editingId ? "Edit Product" : "New Product"}
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gap: "18px",
            }}
          >
            <label>Product Name</label>

            <input
              type="text"
              name="name"
              placeholder="e.g. Royal Ankara"
              value={form.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <label>Description</label>

            <textarea
              name="description"
              placeholder="Describe the product"
              value={form.description}
              onChange={handleChange}
              required
              rows="5"
              style={inputStyle}
            />

            <label>Price (₦)</label>

            <input
              type="number"
              name="price"
              placeholder="180000"
              value={form.price}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <label>Collection</label>

            <select
              name="collection"
              value={form.collection}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Choose collection</option>
              <option value="Nigerian Native Wear">
                Nigerian Native Wear
              </option>
              <option value="English Gowns">
                English Gowns
              </option>
              <option value="Ready-to-Wear">
                Ready-to-Wear
              </option>
              <option value="Shorts & Sets">
                Shorts & Sets
              </option>
              <option value="Men’s Vintage Shirts">
  Men’s Vintage Shirts
</option>

<option value="Beach & Resort Wear">
  Beach & Resort Wear
</option>
            </select>
<label>Available Sizes</label>
<input
  type="text"
  name="sizes"
  placeholder="e.g. S, M, L, XL"
/>

<label>Available Colors</label>
<input
  type="text"
  name="colors"
  placeholder="e.g. Black, Gold, Red"
/>
            <label>Product Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={!editingId}
              style={{
                padding: "15px 0",
                color: "#d8cbc1",
              }}
            />

            {editingId && (
              <p
                style={{
                  margin: 0,
                  color: "#a99a96",
                  fontSize: "12px",
                }}
              >
                Choose a new image only if you want to replace the current
                image.
              </p>
            )}

            <button type="submit" style={goldButtonStyle}>
              {editingId ? "UPDATE PRODUCT" : "ADD PRODUCT"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                style={secondaryButtonStyle}
              >
                CANCEL EDIT
              </button>
            )}

            {message && (
              <p
                style={{
                  margin: "10px 0 0",
                  color: "#c9ad82",
                  fontSize: "13px",
                  letterSpacing: "0.5px",
                }}
              >
                {message}
              </p>
            )}
          </form>
        </section>

        <section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: "20px",
              marginBottom: "35px",
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 10px",
                  color: "#c9ad82",
                  fontSize: "10px",
                  letterSpacing: "4px",
                }}
              >
                CURRENT COLLECTION
              </p>

              <h2
                style={{
                  margin: 0,
                  fontFamily: "Georgia, serif",
                  fontSize: "45px",
                  fontWeight: "normal",
                }}
              >
                Products
              </h2>
            </div>

            <p
              style={{
                margin: 0,
                color: "#9f9090",
                fontSize: "12px",
              }}
            >
              {products.length} product
              {products.length === 1 ? "" : "s"}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "30px",
            }}
          >
            {products.map((product) => (
              <article
                key={product.id}
                style={{
                  background: "#211026",
                  border: "1px solid rgba(201,173,130,0.16)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={imageUrl(product.image)}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "390px",
                    display: "block",
                    objectFit: "cover",
                  }}
                />

                <div
                  style={{
                    padding: "25px",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 8px",
                      color: "#c9ad82",
                      fontSize: "9px",
                      letterSpacing: "3px",
                    }}
                  >
                    {product.collection}
                  </p>

                  <h3
                    style={{
                      margin: "0 0 10px",
                      fontFamily: "Georgia, serif",
                      fontSize: "27px",
                      fontWeight: "normal",
                    }}
                  >
                    {product.name}
                  </h3>

                  <p
                    style={{
                      margin: "0 0 15px",
                      color: "#a99a96",
                      fontSize: "13px",
                      lineHeight: 1.7,
                    }}
                  >
                    {product.description}
                  </p>

                  <p
                    style={{
                      margin: "0 0 25px",
                      color: "#c9ad82",
                      fontSize: "14px",
                      letterSpacing: "1.5px",
                    }}
                  >
                    ₦{Number(product.price).toLocaleString()}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={() => handleEdit(product)}
                      style={editButtonStyle}
                    >
                      EDIT
                    </button>

                    <button
                      onClick={() => handleDelete(product.id)}
                      style={deleteButtonStyle}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "16px",
  background: "#16091c",
  color: "#f6efe8",
  border: "1px solid rgba(201,173,130,0.25)",
  outline: "none",
  fontSize: "14px",
};

const goldButtonStyle = {
  marginTop: "12px",
  padding: "17px",
  background: "#c9ad82",
  color: "#16091c",
  border: "none",
  cursor: "pointer",
  fontSize: "10px",
  letterSpacing: "2px",
  fontWeight: "bold",
};

const secondaryButtonStyle = {
  padding: "15px",
  background: "transparent",
  color: "#c9ad82",
  border: "1px solid rgba(201,173,130,0.4)",
  cursor: "pointer",
  fontSize: "10px",
  letterSpacing: "2px",
};

const editButtonStyle = {
  flex: 1,
  padding: "13px",
  background: "#c9ad82",
  color: "#16091c",
  border: "none",
  cursor: "pointer",
  fontSize: "9px",
  letterSpacing: "2px",
  fontWeight: "bold",
};

const deleteButtonStyle = {
  flex: 1,
  padding: "13px",
  background: "transparent",
  color: "#d59a9a",
  border: "1px solid rgba(213,154,154,0.4)",
  cursor: "pointer",
  fontSize: "9px",
  letterSpacing: "2px",
};

export default Admin;