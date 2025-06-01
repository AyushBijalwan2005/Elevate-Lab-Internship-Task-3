const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
let books = [
  { id: 1, title: 'Book One', author: 'Author One' },
  { id: 2, title: 'Book Two', author: 'Author Two' }
];
app.get('/books', (req, res) => {
  res.send(books);
});
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    res.status(400).send({ error: 'Both id and author should be sent .' });
  } else {
    let newId;
    if (books.length === 0) {
      newId = 1;
    } else {
      newId = books[books.length - 1].id + 1;
    }
    const newBook = { id: newId, title, author };
    books.push(newBook);
    res.status(201).send(newBook);
  }
});
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const bookIndex = books.findIndex(b => b.id === bookId);
  if (bookIndex === -1) {
    res.status(404).send({ error: "No book found with that ID." });
  } else {
    if (title) {
      books[bookIndex].title = title;
    }
    if (author) {
      books[bookIndex].author = author;
    }
    res.send(books[bookIndex]);
  }
});
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);
  if (bookIndex === -1) {
    res.status(404).send({ error: "Book with this id doesn't exists" });
  } else {
    const removedBook = books.splice(bookIndex, 1)[0];
    res.send({ message: 'Book deleted successfully.', book: removedBook });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
