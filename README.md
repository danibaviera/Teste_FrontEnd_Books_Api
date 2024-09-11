# Teste_FrontEnd_Books_Api
homepage de site de livros

# Book Management App

## Passos para Configurar o Projeto Localmente

### Passo 1: Criar o projeto React

Abra a pasta do projeto no Visual Studio Code, depois abra o terminal e execute os seguintes comandos para criar o projeto e rodá-lo localmente:

```bash
npx create-react-app book-management
cd book-management
npm start
Passo 2: Instalar o Bootstrap
Para instalar o Bootstrap, execute o seguinte comando no terminal:
bash
npm install bootstrap
Depois, adicione o import no arquivo src/index.js para carregar os estilos do Bootstrap:

javascript

import 'bootstrap/dist/css/bootstrap.min.css';
Salve o arquivo e o Bootstrap estará disponível no seu projeto.

Passo 3: Criar a Home Page
Crie um componente simples para a Home Page, que dá boas-vindas:

javascript

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
Passo 4: Listar Livros
Crie um componente para listar os livros. Você pode usar um array mock para simular os dados por enquanto:

javascript

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
Passo 5: Adicionar Novo Livro
Use um modal para adicionar um novo livro:

javascript

// src/components/AddBookModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddBookModal = ({ show, handleClose, addBook }) => {
  const [newBook, setNewBook] = useState({ title: '', author: '', year: '' });

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    addBook(newBook);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBookTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formBookAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" name="author" onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formBookYear">
            <Form.Label>Year</Form.Label>
            <Form.Control type="number" name="year" onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBookModal;
Passo 6: Integrar Tudo
No seu App.js, organize as rotas e os componentes:

javascript

// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import HomePage from './components/HomePage';
import BookList from './components/BookList';
import AddBookModal from './components/AddBookModal';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [books, setBooks] = useState([]);

  const addBook = (newBook) => {
    setBooks([...books, { ...newBook, id: books.length + 1 }]);
  };

  return (
    <Router>
      <Container>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/books">
            <Button variant="primary" className="my-3" onClick={() => setShowModal(true)}>
              Add New Book
            </Button>
            <BookList books={books} />
          </Route>
        </Switch>
        <AddBookModal show={showModal} handleClose={() => setShowModal(false)} addBook={addBook} />
      </Container>
    </Router>
  );
}

export default App;
Passo 7: Instruções no README.md
No seu arquivo README.md, inclua as instruções para instalar e rodar o projeto localmente:

markdown

# Book Management App

## Como rodar o projeto localmente

1. Clone o repositório:

   ```bash
   git clone <url-do-repositorio>
Entre na pasta do projeto:

bash

cd book-management
Instale as dependências:

bash

npm install
Inicie o servidor de desenvolvimento:

bash

npm start
Adaptação para Consumir API (Opcional)
Instale o Axios:

bash

npm install axios
No componente BookList, substitua os dados estáticos pela chamada à API:

javascript

useEffect(() => {
  axios.get('http://url-da-api/books')
    .then(response => {
      setBooks(response.data);
    })
    .catch(error => {
      console.error('Erro ao buscar livros:', error);
    });
}, []);
Para adicionar um novo livro, envie os dados para a API usando um POST:

javascript

const handleSubmit = () => {
  axios.post('http://url-da-api/books', newBook)
    .then(response => {
      addBook(response.data);
      handleClose();
    })
    .catch(error => {
      console.error('Erro ao adicionar livro:', error);
    });
};
//Adaptar a exclusão e edição de livros também para realizar requisições à API.
