const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/CheckStatus');
const authController = require('../controllers/admin-controllers')

// Routes untuk Register
router.get('/SignUp', authController.renderHalamanDaftar);
router.post('/SignUp', authController.daftarUser);

// Routes untuk Login
router.get('/Login', authController.renderHalamanLogin);
router.post('/Login', authController.loginUser);

// Routes untuk Logout
router.get('/Logout', authController.logoutUser);

router.get('/', isLoggedIn, (req, res) => {
    res.render('index',{
        layout: 'layouts/main-layout',
        title: 'Home',
        showNavbar: true,
        showFooter: true
    });
});

router.get('/Contact', isLoggedIn, (req, res) => {
    res.render('Contact',{
        layout: 'layouts/main-layout',
        title: 'My Contact',
        showNavbar: true,
        showFooter: true
    });
});


module.exports = router;