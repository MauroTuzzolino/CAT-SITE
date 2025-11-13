import React from "react";
import { Container } from "react-bootstrap";
import "../assets/css/Footer.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
  return (
    <footer className="text-center text-light py-5 mt-5">
      <Container>
        <h5 className="fw-semibold mb-3">Made with ❤️ for Cat Lovers</h5>

        <p className="fst-italic mb-4 text-secondary">“Time spent with cats is never wasted.” — Sigmund Freud</p>

        <div className="d-flex justify-content-center gap-4 fs-4">
          <a href="https://github.com/MauroTuzzolino" target="_blank" rel="noreferrer" className="text-light">
            <i className="bi bi-github"></i>
          </a>
          <a href="www.linkedin.com/in/mauro-tuzzolino-fullstack" target="_blank" rel="noreferrer" className="text-light">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href="https://www.instagram.com/tuzmau05/" target="_blank" rel="noreferrer" className="text-light">
            <i className="bi bi-instagram"></i>
          </a>
        </div>

        <div className="mt-4 text-secondary small">© {new Date().getFullYear()} Cat Lovers Project — Built with 🐾 & React</div>
      </Container>
    </footer>
  );
};

export default Footer;
