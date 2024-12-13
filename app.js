const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

const session = require('express-session');
const expressEjsLayouts = require('express-ejs-layouts');

const authRoutes = require('./src/routes/authRoutes.js');

app.use(session({
    secret: '4734',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'src', 'views')));
app.set('views', path.join(__dirname, 'src', 'views'));



app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
app.set('layout', 'layouts/main-layout')

app.use('/', authRoutes);

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});

// Todo (Kegiatan)
const kegiatanRoutes = require('./src/routes/todoRoutes.js'); // Sesuaikan path jika perlu

app.use(express.json());
app.use('/', kegiatanRoutes);
