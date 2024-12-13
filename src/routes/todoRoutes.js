const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo-controllers');

// Route untuk menampilkan todos
router.get('/todos', todoController.getAllTodos);

// Route untuk menambahkan todo
router.post('/todos', todoController.createTodo);

// Route untuk mengupdate todo
router.put('/todos/:id', todoController.updateTodo);

// Route untuk menghapus todo
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;
