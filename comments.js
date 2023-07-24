
// Create web server application

// Import modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

// Create web server application
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Create in-memory data store
const comments = [];

// Create routes
app.get("/comments", (req, res) => {
  res.status(200).json(comments);
});

app.post("/comments", (req, res) => {
  const comment = { ...req.body, id: uuidv4() };
  comments.push(comment);
  res.status(201).json(comment);
});

app.put("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = req.body;
  const index = comments.findIndex((c) => c.id === id);
  if (index === -1) {
    res.status(404).json({ message: `Comment with ID ${id} not found.` });
  } else {
    comments[index] = { ...comment, id };
    res.status(200).json(comments[index]);
  }
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  const index = comments.findIndex((c) => c.id === id);
  if (index === -1) {
    res.status(404).json({ message: `Comment with ID ${id} not found.` });
  } else {
    comments.splice(index, 1);
    res.status(200).json({ message: `Comment with ID ${id} deleted.` });
  }
});

// Start server
app.listen(5000, () => console.log("Server listening on port 5000"));

