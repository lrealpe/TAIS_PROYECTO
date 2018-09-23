"use strict";
var logger = require('./logger');
var books = require('./data.ts');
var express = require('express'), app = express();
// static
app.use(express.static('public'));
// logger
app.use(logger);
// books
app.get('/books', function (req, res) {
    res.send(books);
});
var server = app.listen(3000, function () {
    console.log('Express server listening on port 3000');
});
//# sourceMappingURL=app-custom-1.js.map