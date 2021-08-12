const express =require('express');
const {body}= require('express-validator');
const router=express.Router();
const isAuth=require('../middleware/is-auth');

const loginController=require('../controllers/auth');


router.get('/feed',isAuth,loginController.getHome);
router.post('/signup',[
    body('email').isEmail().withMessage('Please Enter a valid Email').normalizeEmail(),
    body('password').isLength({min:6}).trim()
],loginController.postSignup);


router.post('/signin',loginController.postSignin);


module.exports=router;