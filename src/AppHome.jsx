import Navbar from "./components/Navbar";
import "./App.css";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

const images = {
  hero:
    "https://cdn.wezoree.com/iblock/07d/6m2rixvxaxi32tyc1rwr9fkcepr88i0k.jpg",

  bridal:
    "https://wezoree.com/upload/medialibrary/000photo83/5.jpg",

  elegance:
    "https://i.pinimg.com/736x/5c/b6/7b/5cb67b1136e4a5d731bb46797ef40ab4.jpg",

  collectionOne:
    "https://i.pinimg.com/736x/e2/b6/bb/e2b6bb9cb69e2904f7d5d4dd5e557b69.jpg",

  collectionTwo:
    "https://i.pinimg.com/736x/32/c1/8e/32c18efed80243b0c1961a332aab5934.jpg",

  menVintage:
    "https://i.pinimg.com/736x/40/c1/28/40c128a64313b567ac4cde0b42f6c563.jpg",

  beachResort:
    "https://i.pinimg.com/1200x/3b/79/e2/3b79e251a17d942373b7969716bc494d.jpg",
  
  shortsSets: 
    "https://i.pinimg.com/1200x/c4/e3/be/c4e3be13c970dfdea909d1a23783f04a.jpg",
};

function AppHome() {
    const { cartCount } = useCart();
  return (
    <div className="app">

      {/* NAVIGATION */}
      <header className="navbar">

        <Link to="/" className="logo">
          REEBEE<span>_REVIA</span>
        </Link>

        <Navbar />

      </header>


      {/* HERO */}
      <main id="home">

        <section
          className="hero"
          style={{
            backgroundImage: `url("${images.hero}")`,
          }}
        >

          <div className="hero-overlay"></div>

          <div className="hero-content">

            <p className="eyebrow">
              THE HOUSE OF REEBEE_REVIA
            </p>

            <h1>
              African
              <br />
              <em>Elegance</em>
            </h1>

            <p className="hero-description">
              Contemporary luxury inspired by the beauty,
              heritage and confidence of the African woman.
            </p>

            <Link
              to="/collections"
              className="hero-button"
            >
              DISCOVER THE COLLECTION
            </Link>

          </div>

          <div className="hero-side-text">
            LUXURY · CULTURE · CONFIDENCE
          </div>

        </section>


        {/* INTRODUCTION */}
        <section className="introduction">

          <div className="intro-label">
            01 — THE BRAND
          </div>

          <div className="intro-content">

            <h2>
              Where African
              <br />
              <em>heritage meets</em>
              <br />
              modern luxury.
            </h2>

            <p>
              REEBEE_REVIA is a celebration of feminine elegance,
              created for women who appreciate beautiful clothing,
              rich culture and timeless style.
            </p>

          </div>

        </section>


        {/* FEATURED EDITORIAL */}
        <section className="editorial">

          <div className="editorial-image">

            <img
              src={images.bridal}
              alt="African bridal fashion"
            />

          </div>

          <div className="editorial-text">

            <p className="eyebrow">
              02 — BRIDAL COLLECTION
            </p>

            <h2>
              Made for
              <br />
              <em>your moment.</em>
            </h2>

            <p>
              Graceful silhouettes, beautiful fabrics and
              unforgettable details inspired by African
              celebration and tradition.
            </p>

            <Link to="/collections/02">
              VIEW BRIDAL
            </Link>

          </div>

        </section>


        {/* COLLECTIONS */}
        <section
          className="collections"
          id="collections"
        >

          <div className="collection-heading">

            <p className="eyebrow">
              03 — COLLECTIONS
            </p>

            <h2>
              The REEBEE
              <br />
              <em>edit.</em>
            </h2>

          </div>


          {/* NATIVE ELEGANCE */}

          <div className="collection-feature">

            <div className="collection-image large">

              <img
                src={images.elegance}
                alt="African luxury fashion"
              />

            </div>

            <div className="collection-copy">

              <span>01</span>

              <h3>
                Native
                <br />
                Elegance
              </h3>

              <p>
                Traditional inspiration reimagined for
                the modern woman.
              </p>

              <Link to="/collections/01">
                EXPLORE
              </Link>

            </div>

          </div>


          {/* READY-TO-WEAR + OCCASION WEAR */}

          <div className="collection-pair">

            <div className="small-card">

              <img
                src={images.collectionOne}
                alt="African ready-to-wear fashion"
              />

              <div>

                <span>02</span>

                <h3>
                  Ready-to-Wear
                </h3>

                <p>
                  Effortless. Refined. Confident.
                </p>

                <Link to="/collections/03">
                  EXPLORE
                </Link>

              </div>

            </div>


            <div className="small-card">

              <img
                src={images.collectionTwo}
                alt="African occasion fashion"
              />

              <div>

                <span>03</span>

                <h3>
                  Occasion Wear
                </h3>

                <p>
                  Designed to make an entrance.
                </p>

                <Link to="/collections/02">
                  EXPLORE
                </Link>

              </div>

            </div>

          </div>
          <div className="small-card">

  <img
  src={images.shortsSets}
  alt="African shorts and sets"
  style={{
    objectFit: "contain",
    background: "#f5f0ea",
  }}
/>

  <div>

    <span>05</span>

    <h3>
      Shorts & Sets
    </h3>

    <p>
      Modern matching pieces made for
      effortless confidence.
    </p>

    <Link to="/collections/04">
      EXPLORE
    </Link>

  </div>

</div>


          {/* MEN'S VINTAGE + BEACH RESORT */}

          <div className="collection-pair">

            <div className="small-card">

              <img
                src={images.menVintage}
                alt="Men's vintage fashion"
              />

              <div>

                <span>04</span>

                <h3>
                  Men’s Vintage
                  <br />
                  Shirts
                </h3>

                <p>
                  Timeless character with a
                  distinctive African touch.
                </p>

                <Link to="/collections/05">
                  EXPLORE
                </Link>

              </div>

            </div>


            <div className="small-card">

              <img
                src={images.beachResort}
                alt="African beach and resort fashion"
              />

              <div>

                <span>06</span>

                <h3>
                  Beach & Resort
                  <br />
                  Wear
                </h3>

                <p>
                  Relaxed luxury made for
                  unforgettable escapes.
                </p>

                <Link to="/collections/06">
                  EXPLORE
                </Link>

              </div>

            </div>

          </div>

        </section>


        {/* STATEMENT */}
        <section className="statement">

          <p>
            FOR THE WOMAN WHO
          </p>

          <h2>
            Knows her
            <br />
            <em>worth.</em>
          </h2>

          <span>
            Wear confidence. Wear culture. Wear REEBEE.
          </span>

        </section>


        {/* ABOUT */}
        <section
          className="about"
          id="about"
        >

          <div className="about-number">
            04
          </div>

          <div className="about-content">

            <p className="eyebrow">
              ABOUT REEBEE_REVIA
            </p>

            <h2>
              A new expression
              <br />
              of African luxury.
            </h2>

            <p>
              We believe African fashion deserves to be seen,
              celebrated and experienced as luxury.
            </p>

            <p>
              REEBEE_REVIA brings together culture, confidence
              and contemporary design to create pieces that
              feel as beautiful as the woman wearing them.
            </p>

          </div>

        </section>


        {/* CONTACT */}
<section
  className="contact"
  id="contact"
>
  <p className="eyebrow">
    REEBEE_REVIA
  </p>

  <h2>
    We're here to
    <br />
    <em>help.</em>
  </h2>

  <p
    style={{
      maxWidth: "550px",
      margin: "25px auto",
      lineHeight: "1.8",
      opacity: 0.75,
    }}
  >
    Have a question, complaint, or need help with an order?
    Contact REEBEE_REVIA directly and we'll be happy to assist.
  </p>

  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      flexWrap: "wrap",
      marginTop: "30px",
    }}
  >
    <a
      href="tel:+2348081793607"
      style={{
        textDecoration: "none",
      }}
    >
      📞 CALL US
    </a>

    <a
      href="https://wa.me/2348081793607"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: "none",
      }}
    >
      💬 WHATSAPP US
    </a>
  </div>
</section>

      </main>


      {/* FOOTER */}
      <footer>

        <div className="footer-brand">
          REEBEE_REVIA
        </div>

        <div className="footer-line"></div>

        <p>
          Luxury fashion for timeless women.
        </p>

        <small>
          © 2026 REEBEE_REVIA
        </small>

      </footer>

    </div>
  );
}

export default AppHome;