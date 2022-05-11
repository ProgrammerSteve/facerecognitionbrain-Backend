const express = require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');
const morgan = require('morgan');

const dotenv = require('dotenv').config();
// const jwt=require('jsonwebtoken');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth=require('./controllers/authorization');

//jwt
// var token = jwt.sign({foo:'bar'},'shhhh');

// For AWS RDS
const db=knex({

	client: "pg",
	connection: {
		host: process.env.HOST,
		user: process.env.USER,
		password: process.env.PASSWORD,
		database: process.env.DATABASE,
	},
});


// // For docker container
// const db=knex({
// 	client:'pg',
// 	connection:{
// 		host: process.env.POSTGRES_HOST,
// 		port:'5432',
// 		user: process.env.POSTGRES_USER,
// 		password: process.env.POSTGRES_PASSWORD,
// 		database:process.env.POSTGRES_DB,
// 	}
// });

// For Local server
// const db=knex({
// 	client:'pg',
// 	connection:{
// 		host:'127.0.0.1',
// 		port:'5432',
// 		user:'postgres',
// 		password:'test',
// 		database:'smartbrain'
// 	}
// });

// // For online server
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 
// const db=knex({
// 	client:'pg',
// 	connection:{
// 		connectionString: process.env.DATABASE_URL,
// 		ssl: true
// 	}
// });

const app=express();

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

// // //GET REQUESTS
// // app.get("/",(req,res)=>{res.json('Backend Server Started')});
// app.get("/",(req,res)=>{res.send('Backend Server Started')});
// app.get('/profile/:id', auth.requireAuth,(req,res)=>{profile.handleProfileGet(req,res,db)});

// //PUT REQUESTS
// app.put("/image", auth.requireAuth, (req,res)=>{image.handleImage(req,res,db)});

// //POST REQUESTS
// //app.post("/signin",(req,res)=>{signin.signinAuthentication(req,res,db,bcrypt)});
// app.post('/signin', signin.signinAuthentication(db, bcrypt));
// app.post("/register",(req,res)=>{register.handleRegister(req,res,db,bcrypt)});
// app.post("/imageurl", auth.requireAuth, (req,res)=>{image.handleApiCall(req,res)});
// app.post("/profile/:id", auth.requireAuth, (req,res)=>{profile.handleProfileUpdate(req,res,db)});


// //GET REQUESTS
// app.get("/",(req,res)=>{res.json('Backend Server Started')});
app.get("/",(req,res)=>{res.send('Backend Server Started')});
app.get('/profile/:id', (req,res)=>{profile.handleProfileGet(req,res,db)});

//PUT REQUESTS
app.put("/image",  (req,res)=>{image.handleImage(req,res,db)});

//POST REQUESTS
//app.post("/signin",(req,res)=>{signin.signinAuthentication(req,res,db,bcrypt)});
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post("/register",(req,res)=>{register.handleRegister(req,res,db,bcrypt)});
app.post("/imageurl",  (req,res)=>{image.handleApiCall(req,res)});
app.post("/profile/:id",  (req,res)=>{profile.handleProfileUpdate(req,res,db)});




app.listen(3001,()=>{
	console.log('Running on port 3001!');
});

// app.listen(process.env.PORT || 3001, ()=> {
// 	if(process.env.PORT===3001){
// 		console.log('app is running on port 3001');
// 	}else{
// 		console.log(`app is running on port ${process.env.PORT}`);
// 	}
//   })