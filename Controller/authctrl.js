

import User from "../models/UserModel.js"; 
import dotenv from "dotenv"; 
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
dotenv.config();
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ success: false, message: "missing details" });
  }
  try {
    const exitCheck = await User.findOne({ email });
    if (exitCheck) {
      return res.json({success:false,"user already exit"});
    }
    const hashedpass = await bcrypt.hash(password, 10);
    const user=new userModel({name,email,password:hashedpass})
    await user.save();

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiredIn:'7d'});


    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:process.env.NODE_ENV==='production'?'none':'strict',
        maxAge:7*24*60*60*1000
    });
    return res.json({success:true});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const login=async (req,res)=>{
    const{email,password}=req.body;
    if(!email||!password){
        return res.json({success:false,message:"you doesn't have account yet"})
    }

    try{
        const user = await User.findOne({ email });

        if(!user){
            return res.json({success:false,message:"Invalid email or password"})
        }

        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,message:" password is not matching"})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiredIn:'7d'});


    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:process.env.NODE_ENV==='production'?'none':'strict',
        maxAge:7*24*60*60*1000
    });

    return res.json({success:true});
    }catch(error){
        return res.json({success:false,message:error.message})
    }

}


export const logout=async (req,res)=>{
    try{
      res.clearCookies("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:process.env.NODE_ENV==='production'?'none':'strict',
        maxAge:7*24*60*60*1000
    })

    return res.json({success:true,message:"your are loggedout"});
}catch(error){
    return res.json({success:false,message:error.message})

}
}