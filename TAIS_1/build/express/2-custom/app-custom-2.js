"use strict";
var logger = require('./logger');
var books = require('./data.js');
var express = require('express'), app = express();
// logger
app.use(logger);
// static
app.use(express.static('public'));
// books
app.get('/books', function (req, res) {
    res.json(books);
});
var server = app.listen(3000, function () {
    console.log('Express server listening on port 3000');
});
//# sourceMappingURL=app-custom-2.js.map