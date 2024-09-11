// src/components/HomePage.js

import React from 'react';
import { Container } from 'react-bootstrap';

function HomePage() {
    return (
    <Container className="text-center mt-5">
      <h1>Boas vindas a nossa home page dos livrinhos</h1>
      <p>Escolha seu livro e seja feliz!</p>
    </Container>
  );
}

export default HomePage;


// src/components/BookList.js
import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
