const {validationResult} =require('express-validator');
const bcrypt= require('bcryptjs');
const User=require('../model/user');
const jwt=require('jsonwebtoken');

exports.getHome=(req,res,next)=>{
    res.status(201).json({
        message:'Signup Page Loaded',
        posts:[{email:'tazimmadre5041@gmail.com',password:'123456'}]
    });
};

exports.postSignup=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const error=new Error('Validation Failed');
        throw error;
    }
    const email=req.body.email;
    const password=req.body.password;
    bcrypt.hash(password,12)
    .then(hashedPassword=>{
        const user=new User({
            email:email,
            password:hashedPassword
        });
        return user.save();
    }).then(result=>{
        res.status(201).json({
            message:'Signup Successful User Created',
            post:{id:new Date().toISOString(),Email:email,userId:result._id}
        });
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
          next(err);
    });
};

exports.postSignin=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    let loadedUser;
    User.findOne({email:email})
    .then(user=>{
        if(!user){
            const error= new Error('A user with this Email could not be found');
            error.statusCode=422;
            throw error;
            next(error);
        }
        loadedUser=user;
        return bcrypt.compare(password,user.password);
    })
    .then(isEqual=>{
        if(!isEqual){
            const error= new Error('Wrong Password');
            throw error;
            
        }
        const token=jwt.sign(
            {
                email:loadedUser.email,
                userId:loadedUser._id.toString()
            },'somesupersecretcode',
                {expiresIn:'1h'}
            );
        res.status(200).json({
            token:token,
            message:'Login Sucessful! Welcome to our Page',
            post:{id:new Date().toISOString,Email:email}
        })
    })
    .catch(err=>{console.log(err)})
};