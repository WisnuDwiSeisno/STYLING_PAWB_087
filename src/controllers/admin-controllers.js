const db = require('../config/database.js');

// Controller untuk Register User
const daftarUser = (req, res) => {
    const { username, password } = req.body;
    const sql = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Register Error : ', err);
            return res.status(500).send('Gagal Mendaftar User');
        } else {
            res.status(200).json({ message: 'User berhasil terdaftar' });
        }
    });
};

// Controller untuk Render Register Page
const renderHalamanDaftar = (req, res) => {
    res.render('SignUp', {
        layout: 'layouts/main-layout',
        title: 'SignUp',
        showNavbar: false,
        showFooter: false,
    });
};

// Controller untuk Render Login Page
const renderHalamanLogin = (req, res) => {
    res.render('Login', {
        layout: 'layouts/main-layout',
        title: 'Login',
        showNavbar: false,
        showFooter: false,
    });
};

// Controller untuk Login User
const loginUser = (req, res) => {
    const { username, password } = req.body;

    db.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, (err, result) => {
        if (err) {
            console.error('Login Error : ', err);
            return res.status(500).send('Gagal Login User');
        }
        if (result.length === 0) {
            console.log('Username atau Password Salah', username , password);
            return res.status(400).send('User tidak ditemukan');
        }

        req.session.idUser = result[0].id;
        console.log('Login Berhasil', req.session.idUser);
        res.redirect('/');
    });
};

// Controller untuk Logout User
const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout Error : ', err);
            return res.status(500).send('Gagal Logout User');
        }
        res.redirect('/Login');
    });
};

// Export semua controller
module.exports = {
    daftarUser,
    renderHalamanDaftar,
    renderHalamanLogin,
    loginUser,
    logoutUser,
};