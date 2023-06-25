const express = require('express');
require('./connection');
const app = express();
const port = 3001;
var path = require('path');
var flash = require('express-flash');
var session = require('express-session');

app.use(session({
    cookie: { maxAge: 60000 },
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}))
app.use(express.json());
app.use(flash());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use('/api', require('./customer/customerRoute'));

app.listen(port, () => {
    console.log(`Server start at ${port}`)
})