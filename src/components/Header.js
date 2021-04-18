import { Button, Form, Container, Row, Col } from "react-bootstrap";

export default function Header(handleSearch, handleChange) {
  return (
    <div>
      <h1>Book search</h1>
      <div className="Header">
        <Form inline onSubmit={handleSearch}>
          <Form.Group className="SearchBar" className="d-flex w-100">
            <Form.Control
              className="SearchBar"
              size="md"
              type="text"
              placeholder="Search"
              onChange={handleChange}
            />
            <Button className="SearchButton" type="submit" variant="primary">
              Search
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
