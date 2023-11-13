const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/user.js');
const ReviewModel = require('./models/Review.js');
const bcrypt=require("bcrypt")


const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/brewery_reviews", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  const dbName = mongoose.connection.db.databaseName;
  console.log(`Connected to MongoDB database: ${dbName}`);
});





// const Review = mongoose.model('Review', reviewSchema);


app.post("/signup", (req, res) => {
bcrypt.hash(req.body.password,10)
.then((hashedPassword)=>{
UserModel.create({
username:req.body.username,
password:hashedPassword
})
    .then(User => res.json(User))
    .catch(error => res.status(500).json({ error: error.message }))
})
.catch(err => res.status(500).send({
message:" error in hashing password",err}))
  
    
});


// Login route
// app.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Find the user in the database
//     const user = await User.findOne({ username });

//     if (!user || user.password !== password) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
app.post("/login",(req,res)=>{
UserModel.findOne({username:req.body.username})
// if username is found
.then(User =>{
bcrypt.compare(req.body.password,User.password)
// comparing passwords
.then((passwordCheck)=>{
if(passwordCheck){
res.status(200).send({
message:' login succesfully'
})}
else res.status(400).send(" please enter correct password")
})

})

// no username found
.catch(err =>{
res.status(500).send({
message:" error in finding username"})
})

});

app.post("/reviews",(req,res) =>{
ReviewModel.create(req.body)
.then(Review =>(res.json(Review)))
.catch(err => res.json(err))

})

app.get("/",function(req,res){
  res.send("hello world this is freaking!")
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



