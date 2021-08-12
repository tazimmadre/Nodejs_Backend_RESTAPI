const express= require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Tazim:qwertyuiop1234567890@cluster0.oxjfe.mongodb.net/SocialApp";


const app=express();

app.set('view engine','ejs');
app.set('views', 'views');

const AuthRoutes=require('./routes/authRoutes');

app.use(express.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,PATCH');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});

app.use(AuthRoutes);
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true}).then(afterconnecting=>{
    app.listen(8080,()=>{console.log('Server Up and Running')});
}).catch(err=>{console.log(err)});

