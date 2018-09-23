"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
// Connection URL
const port = 27017;
const url = `mongodb://localhost:${port}`;
// Database Name
const dbName = 'tais-1';
const options = {
    useNewUrlParser: true
};
// use connect method to connect to the server
mongodb_1.MongoClient.connect(url, options)
    .then((client) => {
    console.log(`Successfully connected to server @ port ${port}`);
    const db = client.db(dbName);
    client.close();
})
    .catch((error) => {
    console.error(`Error => ${error.message}`);
});
//# sourceMappingURL=connect.js.map