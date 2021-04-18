import { Button, Card, Row, Col } from "react-bootstrap";
import React from "react";

export default function DisplayCard({ book }) {
  const { id, title, description, author, rating, image } = book;

  return (
    <Card className="mb-2">
      <Card.Header>
        <Card.Title>{title}</Card.Title>
        <h6>{author}</h6>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col xs={3} sm={3}>
            <Card.Img src={image} />
          </Col>
          <Col xs={9} sm={9}>
            {description}
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-baseline">
        <div>{rating ? `${rating}/5` : ""}</div>
        <Button
          variant="primary"
          onClick={() => {
            localStorage.setItem(
              id,
              JSON.stringify({ title: title, author: author })
            );
          }}
        >
          Add to cart
        </Button>
      </Card.Footer>
    </Card>
  );
}
