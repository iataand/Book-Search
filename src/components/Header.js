import { Button, Form, Container, Row, Col } from "react-bootstrap";
import React, { useState, createContext } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

export default function Header({
  bookToSearch,
  setBookToSearch,
  bookList,
  setBookList,
}) {
  const handleChange = (event) => {
    const book = event.target.value;
    setBookToSearch(book);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (bookToSearch) {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${bookToSearch}&key=${API_KEY}&maxResults=10`
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
