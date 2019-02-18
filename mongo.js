const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DBurl = "mongodb://127.0.0.1:27017/";
const DBname = "Moklet";

let dbo = null;

MongoClient.connect(DBurl,(error, db) =>{
    if (error) throw error;
    dbo = db.db(DBname);
});

app.get('/murid',(request, response)=>{
    dbo.collection("RPL").find().toArray((err,res)=>{
        if(err) throw err;
        response.json(res);
    })
});