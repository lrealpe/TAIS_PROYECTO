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

    listAll(
        db,
        (error: MongoError, docs: any[]) => {
            if ( error ) {
                console.error(
                    `Error => ${error.message}`
                );    
            }
            else {
                docs.forEach( (doc: any, index: number) => {
                    console.log(
                        `${index + 1} => ${JSON.stringify( doc )}`
                    );
                });
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

const listAll = (db: Db, callback: MongoCallback<any>) => {
    const collection = db.collection(
        'documents'
    );
    
    // list all documents
    collection.find(
        {}
    )
    .toArray( 
        (error: MongoError, docs: any[]) => {
            assert.equal( 
                error, 
                null 
            );
            
            callback(
                error,
                docs
            );
        }
    );
};