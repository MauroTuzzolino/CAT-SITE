import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../assets/css/Home.css";
import VariableProximity from "../components/react-bits/VariableProximity";
import CatSpinner from "../components/CatSpinner";
import CatFact from "../components/CatFact";
import Footer from "../components/Footer";
import PillNav from "../components/react-bits/PillNav";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const sentinelRef = useRef(null);

  const items = [
    { label: "Home", href: "#home" },
    { label: "Facts", href: "#facts" },
    { label: "Discover", href: "#discover" },
    { label: "About", href: "#about" },
  ];

  const logo = "https://png.pngtree.com/png-clipart/20220404/original/pngtree-white-cat-png-image_7515283.png";

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5">
        <CatSpinner />
      </div>
    );

  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <div className="home-page">
      <div className="fixed-top">
        <div className="d-flex justify-content-center">
          <PillNav items={items} logo={logo} />
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="hero-section text-center text-light d-flex flex-column justify-content-center align-items-end" id="home">
        <div ref={containerRef} className="proximity-wrapper" style={{ position: "relative" }}>
          <VariableProximity
            label={" Discover the World of Cats"}
            className={"variable-proximity-demo me-4"}
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={100}
            falloff="linear"
          />
        </div>
        <p className="lead me-4">Elegant, mysterious, and full of charm — explore every breed.</p>
      </section>

      {/* CAT FACT SECTION */}
      <section id="facts">
        <CatFact />
      </section>

      {/* DISCOVER SECTION */}
      <section className="info-section-light py-5 bg-light" id="discover">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="fw-bold mb-3">Discover the World of Cats</h2>
              <p className="mx-auto">
                Whether you’re into the graceful elegance of domestic breeds or the raw majesty of their wild cousins, there’s always more to explore in the
                feline world.
              </p>
            </Col>
          </Row>

          {/* INTERACTIVE CARDS */}
          <Row className="justify-content-center g-4">
            <Col md={4}>
              <div className="cat-card-option light" onClick={() => navigate("/breeds")}>
                <div className="emoji">🐾</div>
                <h4>Domestic Breeds</h4>
                <p>Meet hundreds of cat breeds — from the elegant Siamese to the fluffy Maine Coon.</p>
              </div>
            </Col>

            <Col md={4}>
              <div className="cat-card-option dark" onClick={() => navigate("/wildcats")}>
                <div className="emoji">🦁</div>
                <h4>Wild Felines</h4>
                <p>Explore the wild side — lions, tigers, leopards, and other majestic cousins.</p>
              </div>
            </Col>

            <Col md={4}>
              <div className="cat-card-option cosmic discovery-card-content" onClick={() => navigate("/cat-planet")}>
                <div className="emoji">🌍</div>
                <h3>Global Cat Origins</h3>
                <p>Explore the world and discover where each feline breed was born.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* QUIZ INTERACTIVE SECTION */}
      <section className="quiz-interactive py-5 bg-light">
        <Container>
          <Row className="align-items-center justify-content-center gy-4">
            <Col md={6} className="quiz-visual">
              <div className="floating-cat">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/025/221/376/small/cartoon-cat-cute-ai-generate-png.png"
                  alt="Floating cat"
                  className="img-fluid"
                />
              </div>
            </Col>
            <Col md={6} className="quiz-text">
              <h2 className="fw-bold mb-3">Which Cat Are You? 😺</h2>
              <p>
                Ever wondered if you’re more of a curious Abyssinian or a chill Ragdoll? Take our quick personality quiz to find out which feline matches your
                soul. It’s fast, fun, and might surprise you!
              </p>
              <Button variant="warning" size="lg" className="quiz-cta-btn mt-3" onClick={() => navigate("/cat-quiz")}>
                Take the Quiz
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section py-5" id="about">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <h2 className="fw-semibold">About This Project</h2>
              <p>
                This website is a small interactive project dedicated to cat lovers. It connects to an external API to display various cat breeds with their
                details, origin, temperament, and photos.
              </p>
            </Col>
            <Col md={6}>
              <img src="https://wallpapercave.com/wp/wp8408431.jpg" alt="Cat" className="img-fluid rounded shadow" />
            </Col>
          </Row>
        </Container>
        <Footer />
      </section>
    </div>
  );
};

export default Home;
