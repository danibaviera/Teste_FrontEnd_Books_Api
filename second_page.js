//criando a listagem de livros 
// src/components/BookList.js

import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

const BookList = () => {
  const [books, setBooks] = useState([
    { id: 1, title: "Book 1", author: "Author 1", year: 2020 },
    { id: 2, title: "Book 2", author: "Author 2", year: 2021 }
  ]);

  const handleDelete = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div className="mt-5">
      <h2>Book List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.year}</td>
              <td>
                <Button variant="primary" className="mr-2">Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(book.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BookList;
