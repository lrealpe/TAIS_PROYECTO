import * as assert from 'assert';

import { 
    Db, 
    MongoCallback,
    MongoClient,
    MongoClientOptions,
    MongoError,
} from 'mongodb';

// Connection URL
const port: number = 27017;
const url: string = `mongodb://localhost:${port}`;

// Database Name
const dbName: string = 'tais-1';
const options: MongoClientOptions = { 
    useNewUrlParser: true 
};

// use connect method to connect to the server
MongoClient.connect( 
    url,
    options
)
.then( (client: MongoClient) => {

    console.log(
        `Successfully connected to server @ port ${port}`
    );

    const db: Db = client.db(
        dbName
    );

    insertSome(
        db,
        (error: MongoError, result: any) => {
            if ( error ) {
                console.error(
                    `Error => ${error.message}`
                );    
            }
            else {
                console.log(
                    `Success => ${JSON.stringify( result )}`
                );
            }

            client.close();
        }
    );

})
.catch( (error: Error) => {
    console.error(
        `Error => ${error.message}`
    );
});

const insertSome = (db: Db, callback: MongoCallback<any>) => {
    const collection = db.collection(
        'documents'
    );
    
    // insert some documents
    collection.insertMany([
        { a : 1 }, 
        { a : 2 }, 
        { a : 3 },
    ], 
    (error: MongoError, r: any) => {
        assert.equal( 
            error, 
            null 
        );
        assert.equal( 
            3, 
            r.result.n
        );
        assert.equal( 
            3, 
            r.ops.length 
        );
        
        console.log(
            'Inserted 3 documents into the collection.'
        );
        
        callback(
            error,
            r
        );
    });
};
