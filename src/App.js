import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import DisplayBook from "./components/DisplayBook";
import Header from "./components/Header";

export default function App() {
  const getBookList = () => {
    let list = [];

    if (localStorage.length) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        list.push(localStorage.getItem(key));
      }
      return list;
    }
    return [];
  };

  const handleChange = (event) => {
    const book = event.target.value;
    setBook(book);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (book) {
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            book +
            "&key=AIzaSyALRSzMDy1bZqKvwV3a6WUMMEtzhTbm5jU&maxResults=9"
        )
        .then((response) => {
          setBookList(parseData(response.data.items));
        })
        .catch((err) => console.log(err));
    } else alert("Please enter something!");
  };

  const parseData = (data) => {
    let newData = data.map((book) => {
      return {
        id: book.id,
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        author: book.volumeInfo.authors,
        rating: book.volumeInfo.averageRating,
        image: book.volumeInfo.hasOwnProperty("imageLinks")
          ? book.volumeInfo.imageLinks.thumbnail
          : null,
      };
    });

    return newData;
  };

  const [book, setBook] = useState(null);
  const [bookList, setBookList] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [bookCart, setBookCart] = useState(getBookList);

  return (
    <Container className="">
      {/* <h1>Book search</h1>
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
      </div> */}

      <Header handleSearch={handleSearch} handleChange={handleChange}></Header>

      <Row>
        <Col>
          {bookList
            ? bookList.map((book) => (
                <DisplayBook key={book.id} book={book}></DisplayBook>
              ))
            : null}
        </Col>
      </Row>
    </Container>
  );
}
