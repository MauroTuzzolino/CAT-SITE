import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../assets/css/CatCard.css";

export default function CatCard({ image, title, description, onClick }) {
  return (
    <div className="cat-card-outer" onClick={onClick}>
      <div className="cat-ears"></div>
      <Card className="cat-card text-center">
        <Card.Img variant="top" src={image || "https://placekitten.com/300/200"} alt={title} className="cat-img" />
        <Card.Body>
          <Card.Title className="cat-title">{title}</Card.Title>
          <Card.Text>{description ? description.slice(0, 100) + "..." : "No description available."}</Card.Text>
          <Button className="btn-cat">Discover more...</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
