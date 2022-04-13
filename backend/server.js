import Log from './tables.js';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express()
const port = process.env.PORT || 8001

app.use(express.json());
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Login', {
    useNewUrlParser: true
    }).then(() => {
    console.log('Database connected sucessfully !')
    },
    error => {
        console.log('Database could not be connected : ' + error)
    }
)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


app.post('/signin',async(req,res) => {
    const uname = req.body.Username;
    const pword = req.body.Password;
    // console.log(uname);

    if(!uname || !pword){
        console.log("HELLO")
        return res.status(201).json({msg:'Please enter all fields',res:false})
    }

    Log.findOne({Username : uname})
        .then( user => {
            // console.log(user)
            if(!user){
                // console.log("HELLO")
                return res.status(201).json({msg:'User does not exists',res:false})
            }
            else{
                bcrypt.compare(pword,user.Password)
                    .then(isMatch => {
                        if(!isMatch)
                            return res.status(201).send({ msg:'Invalid credentials',res:false});
                        else{
                            return res.status(201).send({msg:'Logged in',res:true,name:user.Name})
                        }
                    })
            }
        })
        .catch((err) => {
            return res.status(201).json({msg:err,res:false})
        })
})

app.post('/signup',async(req,res) => {
    const uname = req.body.Username;
    const pword = req.body.Password;
    
    // console.log(uname);
    if(!uname || !pword){
        return res.status(201).json({msg:'Please enter all fields'})
    }

    Log.findOne({Username : uname})
        .then(user => {
            // console.log(user)
            if(user){
                // console.log(user)
                return res.status(201).json({msg: 'User already exists',res:false})
            }
            else{
                // console.log(uname)
                if(pword.length > 7){
                    const myData = new Log(req.body);

                    bcrypt.genSalt(10,(err,salt) => {
                        bcrypt.hash(pword,salt,(err,hash)=>{
                            if(err)
                                throw err;
                            
                            myData.Password = hash;
                            let result = myData.save();

                            if(result){
                                return res.status(201).json({msg:'User added',res:true});
                            }
                            else{
                                return res.status(201).json({msg : err,res:false});
                            }
                        })
                    })                    
                }
                else{
                    return res.status(201).json({msg:"Password must be atleast 8 characters long"})
                }
            }
        })
})

app.post('/forgot',async(req,res) => {
    const uname = req.body.Username;
    const pword = req.body.Password;

    if(!uname || !pword){
        return res.status(201).json({msg: 'Please enter your username'})
    }

    if(pword.length > 7){
        Log.findOne({Username:uname})
            .then(user => {
                bcrypt.genSalt(10,(err,salt) => {
                    bcrypt.hash(pword,salt,(err,hash)=>{
                        if(err)
                            throw err;

                        req.body.Password = hash;

                        Log.findByIdAndUpdate({_id : user._id},req.body)
                            .then(u => {
                                if(u){
                                    return res.status(201).json({msg :"Your password has been updated"})
                                }
                                else{
                                    return res.status(201).json({msg:"Email Address doesn't exist"})
                                }
                            }
                        )
                    })
                }) 
            }
        )
    }
})

app.listen(port,() => {
    console.log("Server listening on port:" + port)
})