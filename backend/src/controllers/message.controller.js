import User from "../models/user.model.js";
import Message from "../models/message.models.js";
import { BSON } from "bson";
import mongoose from "mongoose";
import { getReceiverSocketId,io } from "../lib/socket.js";


export const UsersForSidebar = async (req,res) => {

     try{
  const loggedInuserId = req.user._id;
    const filteredUsers = await User.find({_id:{$ne:loggedInuserId}}).select("-password");
    res.status(200).json(filteredUsers)
     } catch(error){
         console.log("Error in Sidebarusers:","", error.message);
         res.status(500).json({message:"Internal Server Error"})
        }
}

export const getMessages = async (req,res) => {

    try {
         
         const {id} = req.params;
          const Convertid = new mongoose.Types.ObjectId(id); 
        
         const SenderId = req.user._id;

         const messages = await Message.find({
            $or:[
                {senderId:SenderId,receiverId:Convertid},
                {senderId:Convertid,receiverId:SenderId}
            ]
         });
         res.status(200).json(messages)
    } catch(error){
        console.log("Error in getMessages Controller:","",error.message);
        res.status(500).json({error:"Internal Server Error"})
    }

}

export const sendMessage = async (req,res) => {

    try{
        /* const bsonBuffer = req.body; 
  try {
    const deserializedData = BSON.deserialize(bsonBuffer);
    res.json({ received: deserializedData });
  } catch (error) {
    res.status(400).send('Invalid BSON data');
  }  */



    
    const {text,image} = req.body;
    const {id:receiverId} = req.params;
    const senderId = req.user._id;

        
       const newMessage = new Message ({
    
        senderId,
        receiverId,
        text,
        image
    });

    
    

    

    await newMessage.save();
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){io.to(receiverSocketId).emit("newMessage", newMessage)}
    res.status(201).json(newMessage);
    } catch(error){
      console.log("error in send message controller","", error.message);
      res.status(500).json({message:"Internal Server Error"})
    }
}