import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import CatSpinner from "./CatSpinner";
import CatTitle from "./CatTitle";
import CatSearchBar from "./CatSearchBar";
import CatCard from "./CatCard";
import "../assets/css/CatModal.css";
import { useNavigate } from "react-router";
import catTitle from "../assets/svg/TitleCat.json";
import Lottie from "lottie-react";

export default function BreedsList() {
  const navigate = useNavigate();
  const [breeds, setBreeds] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "live_9CqbaGER9NYEsQ5rAExNSMK3eYldI2LF5V2FoQcxXWaiQg7RI7dmYOP7TTBZPHKf";
  const BASE_URL = "https://api.thecatapi.com/v1";

  async function fetchBreeds() {
    // eslint-disable-next-line no-useless-catch
    try {
      const resp = await fetch(`${BASE_URL}/breeds`, {
        headers: { "x-api-key": API_KEY },
      });
      if (!resp.ok) throw new Error("Failed to fetch cat breeds 🐱");
      return await resp.json();
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchBreeds();
        setBreeds(data);
        setFilteredBreeds(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // ricerca
  const handleSearch = (query) => {
    const lower = query.toLowerCase();
    const results = breeds.filter((breed) => breed.name.toLowerCase().includes(lower));
    setFilteredBreeds(results);
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <CatSpinner />
      </div>
    );

  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <Container className="mt-4">
      <div onClick={() => navigate("/")} className="d-flex justify-content-center align-items-center">
        <div className="mt-4">
          <CatTitle title={"CAT BREEDS"} />
        </div>

        <Lottie animationData={catTitle} loop={true} style={{ width: 150, height: 150 }} />
      </div>

      <CatSearchBar onSearch={handleSearch} />

      {/* Lista card */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {filteredBreeds.map((breed) => (
          <Col key={breed.id}>
            <CatCard
              image={
                breed.image?.url ||
                "https://img.freepik.com/premium-vector/404-error-page-with-black-cat-illustrations_343173-27.jpg?semt=ais_hybrid&w=740&q=80"
              }
              title={breed.name}
              description={breed.description}
              onClick={() => setSelectedBreed(breed)}
            />
          </Col>
        ))}
      </Row>

      {/* Modal in stile gatto 🐱 */}
      <Modal className="cat-modal" show={!!selectedBreed} onHide={() => setSelectedBreed(null)} centered>
        <div className="cat-modal-wrapper">
          <div className="cat-ears"></div>

          {selectedBreed && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>{selectedBreed.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img
                  src={
                    selectedBreed.image?.url ||
                    "https://img.freepik.com/premium-vector/404-error-page-with-black-cat-illustrations_343173-27.jpg?semt=ais_hybrid&w=740&q=80"
                  }
                  alt={selectedBreed.name}
                  className="img-fluid rounded mb-3"
                />
                <p>
                  <strong>Origin:</strong> {selectedBreed.origin}
                </p>
                <p>
                  <strong>Temperament:</strong> {selectedBreed.temperament}
                </p>
                <p>{selectedBreed.description}</p>
                {selectedBreed.wikipedia_url && (
                  <a href={selectedBreed.wikipedia_url} target="_blank" rel="noopener noreferrer">
                    Learn more on Wikipedia 🐾
                  </a>
                )}
              </Modal.Body>
            </>
          )}
        </div>
      </Modal>
    </Container>
  );
}
