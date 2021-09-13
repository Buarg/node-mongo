const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {
    assert.strictEqual(err, undefined);

    console.log('Connected correctly to server');
    
    const db = client.db(dbname);
    const collection = db.collection('dishes');

    collection.insertOne({name: "Uthappizza", description: "test"}, (err, result) => {
        assert.strictEqual(err, undefined);

        console.log('After insert: \n');
        console.log(result.ops);

        collection.find({}).toArray((err, docs) => {
            assert.strictEqual(err, undefined);

            console.log('Found: \n');
            console.log(docs);

            db.dropCollection('dishes', (err, result) => {
                assert.strictEqual(err, undefined);

                client.close();
            });
        });
    });
});