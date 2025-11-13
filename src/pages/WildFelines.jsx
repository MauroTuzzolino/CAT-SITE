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
        console.error("Errore nel caricamento delle info:", error);
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

      {/* === HERO CAROUSEL === */}
      <section className="wild-hero">
        <Carousel fade controls indicators={false} interval={4000} pause={false} wrap={true}>
          {[
            "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlvbiUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000",
            "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjLg80sLss6oYRjNeZbejcwQ7MJEv_fc2Z-3iD6thH_WUgTB_LxF_AamRarGHmfyz9IIhzFMCP8eH1WwA48EWv3VGX5IwroJj9d_0zVc9kg2D686-m3VxHiFCDi29kNAT-CMpKYh6Gc-N0X/w0/white-tiger-5-4K.jpg",
            "https://images.unsplash.com/photo-1698578153726-2114cac67753?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNub3clMjBsZW9wYXJkfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
            "https://images.alphacoders.com/986/986138.jpg",
          ].map((img, i) => (
            <Carousel.Item key={i}>
              <div className="carousel-image-wrapper">
                <img src={img} alt="wild feline" />
                <div className="overlay"></div>
                <div className="carousel-caption">
                  <h1 className="fw-bold">The Wild Felines</h1>
                  <p>Majestic. Fierce. Untamed.</p>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* === MAIN GRID === */}
      <section className="wild-grid py-5">
        <Container>
          <CatTitle title="MEET THE WILD ONES" />
          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" variant="light" />
              <p className="mt-3">Roaming the savannah... fetching data 🐆</p>
            </div>
          ) : (
            <Row className="g-4">
              {cats.map((cat, idx) => (
                <Col key={idx} md={6} lg={4}>
                  <Card className="wild-card h-100" onClick={() => setSelectedCat(cat)}>
                    <div className="wild-card-img-wrapper">
                      <Card.Img variant="top" src={cat.image} alt={cat.name} />
                    </div>
                    <Card.Body>
                      <Card.Title>{cat.name}</Card.Title>
                      <Card.Text>{cat.description?.slice(0, 100)}...</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* === MODAL DETAILS === */}
      {selectedCat && (
        <Modal show={true} onHide={() => setSelectedCat(null)} centered size="lg" contentClassName="wild-modal">
          <Modal.Header closeButton>
            <Modal.Title>{selectedCat.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={5}>
                <img src={selectedCat.image} alt={selectedCat.name} className="img-fluid rounded shadow" />
              </Col>
              <Col md={7}>
                <p>{selectedCat.description}</p>
                <a href={selectedCat.articleUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light mt-3">
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
