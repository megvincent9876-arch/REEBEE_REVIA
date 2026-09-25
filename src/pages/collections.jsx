import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./collections.css";

const collections = [
  {
    number: "01",
    title: "Nigerian Native Wear",
    description:
      "Rich fabrics, beautiful details and timeless Nigerian style created for the modern woman.",
    image:
     "https://i.pinimg.com/1200x/a5/a5/d0/a5a5d0f1fe0b83a67ac7a7cece0b0c97.jpg"
  },
  {
    number: "02",
    title: "English Gowns",
    description:
      "Elegant silhouettes designed for weddings, celebrations and unforgettable occasions.",
    image:
      "https://img.staticdj.com/4275c86471fab74f93978dfcf378188d_1600x.png"
  },
  {
    number: "03",
    title: "Ready-to-Wear",
    description:
      "Effortless African-inspired fashion made for everyday confidence and refined style.",
    image:
      "https://i.pinimg.com/1200x/22/2d/a0/222da00e8b2ac77d2c59b790b9a72b8f.jpg"
  },
  {
    number: "04",
    title: "Shorts & Sets",
    description:
      "Modern matching pieces that bring comfort, confidence and effortless sophistication.",
    image:
      "https://i.pinimg.com/736x/7f/3b/82/7f3b82ad8ff12a3c630e0e6f28fa5be5.jpg"
  },
  {
    number: "05",
    title: "Men’s Vintage Shirts",
    description:
      "Distinctive vintage-inspired shirts bringing African character and timeless style to the modern man.",
    image:
      "https://i.pinimg.com/1200x/26/bd/85/26bd850cb93ebcc884a6508c7ad7aef0.jpg"
  },
  {
    number: "06",
    title: "Beach & Resort Wear",
    description:
      "Relaxed luxury designed for sunny escapes, coastal moments and effortless resort style.",
    image:
      "https://i.pinimg.com/1200x/d3/b7/c2/d3b7c2e50741c27b6aa9e4014901700c.jpg"
  },
];

function Collections() {
  return (
    <div className="collections-page">
      <Navbar />

      <header className="collections-header">

        <p>REEBEE_REVIA — COLLECTIONS</p>

        <h1>
          The
          <br />
          <em>Collections.</em>
        </h1>

        <p className="collections-intro">
          Discover contemporary African fashion created for
          women and men who wear confidence with elegance.
        </p>

      </header>


      <main className="collection-list">

        {collections.map((collection) => (

          <section
            className="collection-section"
            key={collection.number}
          >

            <div className="collection-image">

              <img
                src={collection.image}
                alt={collection.title}
              />

            </div>


            <div className="collection-info">

              <span className="collection-number">
                {collection.number}
              </span>

              <h2>{collection.title}</h2>

              <p>{collection.description}</p>

              <Link to={`/collections/${collection.number}`}>
                VIEW COLLECTION
              </Link>

            </div>

          </section>

        ))}

      </main>

    </div>
  );
}

export default Collections;