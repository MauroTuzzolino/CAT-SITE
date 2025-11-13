// src/components/CatFact.jsx
import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import sleepyCat from "../assets/svg/SleepyCat.json";
import "../assets/css/CatFact.css";

const CatFact = () => {
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchFact = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://catfact.ninja/fact");
      const data = await res.json();
      setFact(data.fact);
    } catch (error) {
      setFact("Could not load a cat fact right now 😿");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFact();
  }, []);

  return (
    <section className="cat-fact-section text-light d-flex align-items-center">
      <Container>
        <Row className="align-items-center">
          {/* LEFT SIDE: FACTS */}
          <Col md={6} className="text-center mb-5 mb-md-0">
            <h2 className="fw-bold mb-4">🐾 Random Cat Fact</h2>

            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
                <Spinner animation="border" variant="light" />
              </div>
            ) : (
              <motion.p
                key={fact}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lead mx-auto cat-fact-text"
              >
                {fact}
              </motion.p>
            )}

            <Button variant="outline-light" onClick={fetchFact} className="mt-4">
              New Fact
            </Button>
          </Col>

          {/* RIGHT SIDE: CAT THOUGHTS */}
          <Col md={6} className="text-center position-relative">
            <div className="d-flex justify-content-end">
              <Lottie animationData={sleepyCat} loop={true} style={{ width: 350, height: 350 }} />
            </div>

            <motion.div
              className="thought-bubble p-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <p className="mb-0">“Humans feed me, pet me... I might just let them stay.” 🐈‍⬛</p>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CatFact;
