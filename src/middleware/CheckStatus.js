function isLoggedIn(req, res, next) {
    if (req.session.idUser) {
        // Jika user sudah login, lanjutkan ke route berikutnya
        return next();
    }
    // Jika belum login, arahkan ke halaman Login
    res.redirect('/Login');
}

module.exports = { isLoggedIn };