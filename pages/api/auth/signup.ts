import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../model/Schema";
import bcrypt from 'bcryptjs'
import connectMongoose from "../../../lib/connectMongo";


export default async function  handler(req:NextApiRequest,res:NextApiResponse) {
    await connectMongoose().catch(err=>res.json({error:'Connection refused'}))
    const {username,email,password}=req.body;
        if(req.method==='POST') {
            const user=await User.findOne({email:req.body.email});
            if(user) {
                return res.status(403).json({message:'User with this email already exists'})
            }
            const hashedPassword=await bcrypt.hash(password,12);
            const newUser=await User.create({username,email,password:hashedPassword});
            return res.status(201).json({success:true,data:newUser})
        }else{
            return res.status(500).json({message:'Invalid HTTP method'})
        }
}