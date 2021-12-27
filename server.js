const express = require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');



const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db=knex({
	client:'pg',
	connection:{
		host:'127.0.0.1',
		port:'5432',
		user:'postgres',
		password:'test',
		database:'smartbrain'
	}
});


db.select('*').from('users').then(data=>{
	//console.log(data);
});


const app=express();

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());

//GET REQUESTS
app.get("/",(req,res)=>{res.json('Backend Server Started')});
app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)});

//PUT REQUESTS
app.put("/image", (req,res)=>{image.handleImage(req,res,db)});

//POST REQUESTS
app.post("/signin",(req,res)=>{signin.handleSignin(req,res,db,bcrypt)});
app.post("/register",(req,res)=>{register.handleRegister(req,res,db,bcrypt)});
app.post("/imageurl", (req,res)=>{image.handleApiCall(req,res)});

//APP LISTEN/ PORT
app.listen(3000, ()=>{
	console.log('app is running on port 3000');
});