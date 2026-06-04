import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import dotenv from 'dotenv'


export const signup = async (req,res) => {
    

   
       
     const {email,name,password} = req.body;

     try{
        if  (!email || !name || !password){
            return res.status(400).json({message:"all fields are required!"});
        };
         if (password.length  < 6){
            return res.status(400).json({message:"password must be at least 6 characters!"});
         };
        
            const user =  await User.findOne({email});
            if (user) return res.status(400).json({message:"email already exists"});
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            
            const newUser = new User ({
                email,
                name,
                password:hashedPassword
            });

            if(newUser) {
                   generateToken(newUser._id,res)
                    await newUser.save();
                     // Source - https://stackoverflow.com/a
// Posted by Aaron Boteler
// Retrieved 2026-01-28, License - CC BY-SA 4.0

  

                     res.status(201).json({
                        _id:newUser._id,
                        email: newUser.email,
                        name:newUser.name
                    });
                    
                   
            } else {
                res.status(400).json({message:"Invalid user data"})
            }

         }

      catch (error){
      console.log("error in signup! Check the controller function!",error.message);
      res.status(500).json({message:"internal server error!"})
     }

    }

export const login = async (req,res) => {
   
     const {email,password} = req.body;

     try {
     const user = await User.findOne({email})
     if(!user){res.status(400).json({message:"Invalid credentials!"})}
     const isPasswordCorrect = await bcrypt.compare(password,user.password);
     if(!isPasswordCorrect){res.status(400).json({message:"Invalid credentials"})}
     generateToken(user._id, res)
     res.status(200).json({
        id:user._id,
        name:user.name,
        email:user.email
     })

     }
     catch(error){console.log("Error in Login Controller:","",error.message)
        res.status(500).json({message:"Internal Server Error"})
     }

    
    
}

export const logout = async (req,res) => {

     try {
      res.cookie("jwt","",{maxAge:0})
      res.status(200).json({message:"Logged out Successfully!"})
     } catch(error){console.log("Error in Log out controller!:","",error.message)
        res.status(500).json({message:"Internal Server Error!"})
     }
     
    
}

export const checkAuth = async (req,res) => {

   try{
    res.status(200).json(req.user);
   } catch(error){
      console.log("Error in check Auth controller:","", error.message);
      res.status(500).json({message:"Internal Server Error"})

   }

}