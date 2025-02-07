import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModal.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken';

// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
      const imageFile = req.file;

      //check for empty data 
      if (!email || !password || !name || !speciality || !degree || !experience || !about || !fees || !address) {
        return res.json({ success:false ,message:"All fields are required" });
      }

      //validate email
      if (!validator.isEmail(email)) {
        return res.json({
          success: false, message:'Invalid email'
        })
      }

      //validate password
      if (password.length < 8) {
        return res.json({
          success:false ,message:'Password must be at least 8 characters'
        })
      }

      //hasing password
      const hashedPassword = await bcrypt.hash(password, 10);

      //upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      const imageUrl = imageUpload.secure_url;

      const doctorData = {
        name, email, password: hashedPassword, speciality, degree, experience, about, fees, address : JSON.parse(address), image: imageUrl, date: Date.now()
      }

      const newDoctorData = new doctorModel(doctorData);
      newDoctorData.save();

      res.json({success: true, message:'Doctor added successfully'})
       
    } catch (error) {
      console.log(error)
      res.json({sucess:false,message:error.message})
  }
  
 
}

//API for admin login

const loginAdmin = async (req,res) => {
 try {
  
   const { email, password } = req.body;
   
   if (!email || !password) {
     res.json({success:false,message:'All fields are required'})
   }

  

   if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
     const token = jwt.sign(email + password, process.env.JWT_SECRET)
     res.json({sucess:true, message:'Login successful', token})
   } else {
     res.json({success:false,message:'Invalid credentials'})
   }


 } catch (error) {
  console.log(error);
  res.json({ sucess: false, message: error.message });
 }
}

export { addDoctor, loginAdmin };