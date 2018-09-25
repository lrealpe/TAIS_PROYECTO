import { 
    Db, 
    MongoClient,
    MongoClientOptions 
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

    client.close();
})
.catch( (error: Error) => {
    console.error(
        `Error => ${error.message}`
    );
});