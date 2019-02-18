const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DBurl = "mongodb://127.0.0.1:27017/";
const DBname = "Moklet";

let dbo = null;

MongoClient.connect(DBurl,(error, db) =>{
    if (error) throw error;
    dbo = db.db(DBname);
});

app.get('/siswa',(request, response)=>{
    dbo.collection("siswa").find().toArray((err,res)=>{
        if(err) throw err;
        response.json(res);
    })
});


app.use(bodyParser.urlencoded({extended: false}))

app.get('/test',(request,response)=>{
    response.end("ini get XI RPL 6");
});

app.post('/rpl',(request,response)=>{
    response.end("ini post XI RPL 6");
});

// app.get('/siswa/:nama',(request,response)=>{
//     let namaSIswa = request.params.nama;
//     response.end("menampilkan nama siswa "+namaSiswa);
// });

// app.post('/siswa',(request,response)=>{
//     let namaSiswa = request.body.name;
//     let alamat = request.body.address;
//     response.end("menampilkan siswa baru "+namaSiswa + ", yang beralamat di " + alamat);
// });

// app.delete('/siswa/:id',(request,response)=>{
//     let id = request.params.id;
//     let namaSiswa = request.body.nama;
//     response.end("id "+id + " telah dihapus, dengan nama: " + namaSiswa);
// });

app.put('/siswa/:id',(request,response)=>{
    let id = request.params.id;
    let namaSiswa = request.body.nama;
    let alamat = request.body.alamat;
    response.end("siswa dengan id: "+id+" telah diupdate");
});

app.listen('8080',(e)=>{
    console.log(e);
});

app.post('/siswa',(request,response)=>{
    let namaSiswa = request.body.name;
    let alamat = request.body.address;
    dbo.collection("siswa").insertOne({
        name : namaSiswa,
        address : alamat
    }, (err,res)=> {
        if(!err){
            response.json(res);
            response.end("Data berhasil masuk");
        }else{
            throw err;
        }
    })
    // response.end("menampilkan siswa baru "+namaSiswa + ", yang beralamat di " + alamat);
});

app.delete('/siswa/:id',(request,response)=>{
    let id = request.params.id;
    let id_object = new ObjectID(id);
    dbo.collection("siswa").deleteOne({
        _id : id_object
    },(err,res)=>{
        if(err) throw err;
        response.end("Data berhasil dihapus")
    })
})

app.put('/RPL/:id',(request, response)=>{
    let id = request.params.id;
    let id_object = new ObjectID(id);
    let namaSiswa = request.body.nama;
    let kelas = request.body.kelas;
    let jurusan = request.body.jurusan;
    dbo.collection("RPL").updateOne({
        _id : id_object
    }, {$set:{
        nama: namaSiswa,
        kelas : kelas,
        jurusan : jurusan
    }},
    (err,res)=>{
        if(err) throw err;
        response.end("Data berhasil diupdate");
    })
}) 