"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
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
    insertSome(db, (error, result) => {
        if (error) {
            console.error(`Error => ${error.message}`);
        }
        else {
            console.log(`Success => ${JSON.stringify(result)}`);
        }
        client.close();
    });
})
    .catch((error) => {
    console.error(`Error => ${error.message}`);
});
const insertSome = (db, callback) => {
    const collection = db.collection('documents');
    // insert some documents
    collection.insertMany([
        { a: 1 },
        { a: 2 },
        { a: 3 },
    ], (error, r) => {
        assert.equal(error, null);
        assert.equal(3, r.result.n);
        assert.equal(3, r.ops.length);
        console.log('Inserted 3 documents into the collection.');
        callback(error, r);
    });
};
//# sourceMappingURL=insert.js.map