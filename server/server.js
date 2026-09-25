import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import db from "./database.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.get("/", (req, res) => {
  res.json({
    message: "REEBEE_REVIA backend is running!",
  });
});

app.get("/api/products", (req, res) => {
  const products = db
    .prepare("SELECT * FROM products ORDER BY created_at DESC")
    .all();

  res.json(products);
});

app.post("/api/products", upload.single("image"), (req, res) => {
  const { name, description, price, collection, sizes, colors } = req.body;

  if (!name || !price || !collection || !req.file) {
    return res.status(400).json({
      error: "Name, price, collection and image are required.",
    });
  }

  const imageUrl = `/uploads/${req.file.filename}`;

  const result = db
    .prepare(
      "INSERT INTO products (name, description, price, collection, image, sizes, colors) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
    .run(
      name,
description,
price,
collection,
imageUrl,
sizes,
colors
    );

  res.status(201).json({
    message: "Product added successfully!",
    id: result.lastInsertRowid,
    image: imageUrl,
  });
});

app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const {
  name,
  description,
  price,
  collection,
  sizes,
  colors,
  image,
} = req.body;

  if (!name || !price || !collection || !image) {
    return res.status(400).json({
      error: "Name, price, collection and image are required.",
    });
  }

  const result = db
    .prepare(
      `UPDATE products
       SET name = ?, description = ?, price = ?, collection = ?, image = ?, sizes = ?, colors = ?
       WHERE id = ?`
    )
    .run(
  name,
  description,
  price,
  collection,
  image,
  sizes,
  colors,
  id
);

  if (result.changes === 0) {
    return res.status(404).json({
      error: "Product not found.",
    });
  }

  res.json({
    message: "Product updated successfully!",
  });
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;

  const result = db
    .prepare("DELETE FROM products WHERE id = ?")
    .run(id);

  if (result.changes === 0) {
    return res.status(404).json({
      error: "Product not found.",
    });
  }

  res.json({
    message: "Product deleted successfully!",
  });
});
app.use((error, req, res, next) => {
  console.error("SERVER ERROR:", error);

  res.status(500).json({
    error: error.message,
  });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `REEBEE_REVIA backend running on http://localhost:${PORT}`
  );
});