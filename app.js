const express = require('express');
const app = express();
//importamos mongoose otra vez
const mongoose = require('mongoose');
//instalar el sistema de templates handlebars
require('hbs');
//importamos el modelo
const User = require('./models/User');

//configuramos hbs (handlebars)
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

//necesitamos conectarnos a la bd
mongoose.connect('mongodb://localhost:27017/candyIndependenceDay', (err)=>{
    if(err) return console.log(err);
    return console.log("Conectado a la DB");
});

app.use(express.static(__dirname + '/public'));

//ruta pa crear usuarios:

app.get('/usuarios', (req,res)=>{
    User.find({}, (err, users)=>{
        if(err) return res.status(500).send(err);
        res.render('cochinadas/usuarios', {users});
    });
});

app.get('/users', (req,res)=>{
    var lista = [
        {
            name: 'BlisS',
            age: 31
        },
        {
            name: "BlisSito",
            age: 15
        },
        {
            name: "Bloss",
            age: 50
        },
        {
            name: "Bless",
            age: 25
        }
    ];
    res.render('users', {lista} );
});

app.get('/template', (req,res)=>{
    var active = true;
    var name = "BlisS";
    const user = {
        name,
        age: 31,
        job: 'Lead F... Teacher',
        active
    };
    res.render('profile', user);
});

app.get('/new', (req,res)=>{
    User.create({email:'lol@lol.com'});
    res.send('Usuario creado');
});



app.get('/bliss', (req,res)=>{
    res.send("hola mundo mijito bliss");
});

app.listen(3000, ()=>{
    console.log("escuchando en el 3000")
});