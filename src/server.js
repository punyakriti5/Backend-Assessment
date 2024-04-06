const express= require ('express');
const path = require("path")
const mongoose = require('mongoose');
const UserRoutes = require('./routes/user.routes');
const AuthRoutes = require('./routes/auth.routes');
const StaticRoutes = require('./routes/static.routes')
const PORT= process.env.PORT || 3000;
require('dotenv').config();
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/auth-api-db')
.then(()=> console.log("connected to DB"))
.catch((err)=> console.log("error",err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get('/', (req,res)=>{
    res.send('Authentication and Authorization')
});

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
});

app.use('/api/auth', AuthRoutes);
app.use('/', StaticRoutes)
//app.use('api/user', UserRoutes);