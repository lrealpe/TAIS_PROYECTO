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
    listAll(db, (error, docs) => {
        if (error) {
            console.error(`Error => ${error.message}`);
        }
        else {
            docs.forEach((doc, index) => {
                console.log(`${index + 1} => ${JSON.stringify(doc)}`);
            });
        }
        client.close();
    });
})
    .catch((error) => {
    console.error(`Error => ${error.message}`);
});
const listAll = (db, callback) => {
    const collection = db.collection('documents');
    // list all documents
    collection.find({})
        .toArray((error, docs) => {
        assert.equal(error, null);
        callback(error, docs);
    });
};
//# sourceMappingURL=list.js.map