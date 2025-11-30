import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Modal, Button, Carousel, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../assets/css/WildFelines.css";
import CatTitle from "../components/CatTitle";

const species = ["Lion", "Tiger", "Leopard", "Cheetah", "Jaguar", "Lynx", "Snow leopard", "Cougar", "Serval"];

const WildFelines = () => {
  const [cats, setCats] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const results = await Promise.all(
          species.map(async (name) => {
            const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`);
            const data = await res.json();
            return {
              name: data.title,
              description: data.extract,
              image: data.thumbnail?.source || "https://placekitten.com/400/300",
              articleUrl: data.content_urls?.desktop?.page || "#",
            };
          })
        );
        setCats(results);
      } catch (error) {
        console.error("Errore nel caricamento:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCats();
  }, []);

  return (
    <div className="wild-felines-page text-light">
      {/* === BACK BUTTON === */}
      <Button variant="outline-light" className="back-btn" onClick={() => navigate("/")}>
        ← Back Home
      </Button>

      {/* === HERO CAROUSEL RESPONSIVO === */}
      <section className="wild-hero">
        <Carousel fade controls indicators={false} interval={4000} pause={false} wrap={true}>
          {[
            "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?fm=jpg&q=60&w=2400",
            "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjLg80sLss6oYRjNeZbejcwQ7MJEv_fc2Z-3iD6thH_WUgTB_LxF_AamRarGHmfyz9IIhzFMCP8eH1WwA48EWv3VGX5IwroJj9d_0zVc9kg2D686-m3VxHiFCDi29kNAT-CMpKYh6Gc-N0X/w0/white-tiger-5-4K.jpg",
            "https://images.unsplash.com/photo-1698578153726-2114cac67753?fm=jpg&q=60&w=2400",
            "https://images.alphacoders.com/986/986138.jpg",
          ].map((img, i) => (
            <Carousel.Item key={i}>
              <div className="carousel-image-wrapper">
                <img src={img} alt="wild feline" className="hero-img" />
                <div className="overlay"></div>

                <div className="carousel-caption custom-caption">
                  <h1 className="fw-bold display-5 display-md-3">The Wild Felines</h1>
                  <p className="lead d-none d-sm-block">Majestic. Fierce. Untamed.</p>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* === GRID === */}
      <section className="wild-grid py-5">
        <Container>
          <CatTitle title="MEET THE WILD ONES" />

          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" variant="light" />
              <p className="mt-3">Roaming the savannah... fetching data 🐆</p>
            </div>
          ) : (
            <Row className="g-4 mt-3">
              {cats.map((cat, idx) => (
                <Col key={idx} xs={12} sm={6} md={6} lg={4}>
                  <Card className="wild-card h-100" onClick={() => setSelectedCat(cat)}>
                    <div className="wild-card-img-wrapper">
                      <Card.Img variant="top" src={cat.image} alt={cat.name} className="img-fluid rounded-top" />
                    </div>
                    <Card.Body>
                      <Card.Title>{cat.name}</Card.Title>
                      <Card.Text>{cat.description?.slice(0, 90)}...</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* === MODAL RESPONSIVO === */}
      {selectedCat && (
        <Modal show={true} onHide={() => setSelectedCat(null)} centered size="lg" contentClassName="wild-modal">
          <Modal.Header closeButton>
            <Modal.Title>{selectedCat.name}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row className="gy-3">
              <Col xs={12} md={5}>
                <img src={selectedCat.image} alt={selectedCat.name} className="img-fluid rounded shadow-sm w-100" />
              </Col>

              <Col xs={12} md={7}>
                <p>{selectedCat.description}</p>
                <a href={selectedCat.articleUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light mt-3 w-100 w-md-auto">
                  Read More on Wikipedia 🌍
                </a>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default WildFelines;
