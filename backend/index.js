const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userModel= require("./model/userModel")

mongoose.connect("mongodb+srv://username:connectat123@cluster0.s2v90zc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
      console.log("Connected to MongoDB");
    });

const app = express();
app.use(express.json());
app.use(cors())

app.post("/register", (req, res)=>{
    const name=req.body.name;
    const email = req.body.email;
    const password = req.body.password
    userModel.findOne({email : email})
    .then(user=>{
        if(user){
            res.json("User already Exist")
        }
        else{
            userModel.create({name, email, password, type:"client"})
            .then(data=>res.json("Success"))
            .catch(err=>res.json(err))
        }
    })
    
})

app.post("/login", (req, res)=>{
    const {email, password}=req.body;
    userModel.findOne({email : email})
    .then(user=>{
        if(user){
            console.log("user: ", user)
            if(user.password == password){
                res.json({msg:"Success", type:user.type, email})
            }
            else{
                res.json("Wrong Password")
            }
        }
        else{
            res.json("User Not Found")
        }
    })
})

app.listen(5000, ()=>{
    console.log("Server is Running at 5000")
})