import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import validator from 'validator';


// login user
const loginUser = async(req, res) =>{
  const {email, password} = req.body;
  try {
    const user = await userModel.findOne({email});

    if(!user){
      return res.status(401).send({success:false, message: "User doesn't exist"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(401).send({success:false, message: "Invalid email or password"});
    }

    const token = createToken(user._id);
    res.send({success:true, token});

  } catch (error) {
    console.log(error);
    res.send({success:false, message: "Error"});
  }
}


const createToken = (id) =>{
  return jwt.sign({id}, process.env.JWT_SECRET);
}


// register user

const registerUser = async(req, res) =>{
  const {name, password, email} = req.body;
  try {
    // checking if the user is already exists
    const exists = await userModel.findOne({email});
    if(exists){
      return res.status(401).send({success:false, message: "User already exists"});
    }

    // validaing email format and strong password

    if(!validator.isEmail(email)){
      return res.status(400).send({success:false, message: "Invalid email provided"});
    }

    if(password.length < 8){
      return res.status(401).send({success:false, message: "Please provide a strong password"});
    }

    // hashing user password

    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, salt);


    const newUser = new userModel({
      name,
      password: hashedPassword,
      email
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.send({success:true, token});


  } catch (error) {
    console.log(error);
    res.send({success:false, message: "Error"});
  }
}


export {
  loginUser,
  registerUser
}