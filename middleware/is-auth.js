const jwt= require('jsonwebtoken');

module.exports=(req,res,next)=>{
    const authHeader=req.get('Authorization');
    if(!authHeader){
        const error=new Error('not Authenticated');
        throw error;
    }
    const token=authHeader.split(' ')[1];
    let decodeToken;
    try{
        decodedToken=jwt.verify(token,'somesupersecretcode');
    }
    catch(err){
        throw err;
    }
    if(!decodedToken){
        const error=new Error('Not Authenticated');
        throw error;
    }
    req.userId=decodedToken.userId;
    next();

}