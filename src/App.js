import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
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

  const [bookToSearch, setBookToSearch] = useState(null);
  const [bookList, setBookList] = useState(null);
  const [bookCart, setBookCart] = useState(getBookList);

  return (
    <Container>
      <Header
        bookToSearch={bookToSearch}
        setBookToSearch={setBookToSearch}
        bookList={bookList}
        setBookList={setBookList}
      ></Header>

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
