const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const sessionFileStore = require('session-file-store');
const expressHandlebars = require('express-handlebars');
const config = require('../config');

const todo = require ('./todo');

//Create custom file-store class
const FileStore = sessionFileStore(expressSession);

const app = express();

app.engine('hbs', expressHandlebars.engine({ defaultLayout: false, extname: '.hbs'}));

//logging
app.use(morgan('dev'));


//requesd bodies
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Sessions
app.use(expressSession({
   ...config.sessionOptions,
   store: new FileStore()
}));
    
//Mount features
app.use('/todo', todo.router);
app.use(express.static('./static'));


module.exports = app;