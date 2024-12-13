const db = require('../config/database.js');

// Controller untuk Menampilkan Semua Todo
const getAllTodos = (req, res) => {
    const sql = 'SELECT * FROM todos';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching todos: ', err);
            return res.status(500).send('Gagal mendapatkan daftar todo');
        }
        res.render('Todos', {
            layout: 'layouts/main-layout',
            title: 'Todos',
            todos: results,
        });
    });
};

// Controller untuk Menambahkan Todo Baru
const createTodo = (req, res) => {
    const { judul, deskripsi } = req.body;
    const sql = `INSERT INTO todos (judul, deskripsi) VALUES (?, ?)`;
    db.query(sql, [judul, deskripsi], (err, result) => {
        if (err) {
            console.error('Error adding todo: ', err);
            return res.status(500).json({ message: 'Gagal menambahkan todo' });
        }
        const newTodo = { id: result.insertId, judul, deskripsi };
        res.status(200).json(newTodo); // Return newly created todo
    });
};

// Controller untuk Mengupdate Todo
const updateTodo = (req, res) => {
    const { judul, deskripsi } = req.body;
    const { id } = req.params;
    const sql = `UPDATE todos SET judul = ?, deskripsi = ? WHERE id = ?`;
    db.query(sql, [judul, deskripsi, id], (err) => {
        if (err) {
            console.error('Error updating todo: ', err);
            return res.status(500).json({ message: 'Gagal memperbarui todo' });
        }
        res.status(200).json({ id, judul, deskripsi });
    });
};

// Controller untuk Menghapus Todo
const deleteTodo = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM todos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting todo: ', err);
            return res.status(500).send('Gagal menghapus todo');
        }
        res.status(200).json({ message: 'Todo berhasil dihapus' });
    });
};

// Controller untuk Render Login Page
const renderHalamanTodos = (req, res) => {
    res.render('Todos', {
        layout: 'layouts/main-layout',
        title: 'Todos',
        showNavbar: false,
        showFooter: false,
    });
};

// Export Semua Controller
module.exports = {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    renderHalamanTodos
};
