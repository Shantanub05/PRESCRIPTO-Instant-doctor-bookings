import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModal.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';

// API for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    //check for empty data
    if (
      !email ||
      !password ||
      !name ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: 'All fields are required' });
    }

    //validate email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: 'Invalid email',
      });
    }

    //validate password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: 'Password must be at least 8 characters',
      });
    }

    // Check if email already exists
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.json({
        success: false,
        message: 'Doctor with this email already exists',
      });
    }

    //hasing password
    const hashedPassword = await bcrypt.hash(password, 10);

    //upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: 'image',
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      image: imageUrl,
      date: Date.now(),
    };

    const newDoctorData = new doctorModel(doctorData);
    await newDoctorData.save();

    res.json({ success: true, message: 'Doctor added successfully' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for admin login

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.json({ success: false, message: 'All fields are required' });
    }

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, message: 'Login successful', token });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for fetching all doctors

const allDoctors = async (req, res) => {
  try {
    const allDoctors = await doctorModel.find({}).select('-password');
    return res.json({ success: true, allDoctors });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to get all appointments
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({})
    res.json({ success: true, appointments });
  } catch (error) {
     return res.json({ success: false, message: error.message });
  }
}

// Cancel appointments
const cancelAppointment = async (req, res) => {
  try {
    const {  appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    console.log(appointmentData);
   
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const { docId, slotDate, slotTime } = appointmentData;
    const docData = await doctorModel.findById(docId);

    let slots_booked = docData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: 'Appointment Cancelled!' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const dashboardData = async (req,res) => {
  try {
    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData = {
      doctors: doctors.length,
      users: users.length,
      appointments: appointments.length,
      latestAppointments: appointments.reverse().slice(0,5)
    };

    res.json({success:true,dashData})
  } catch (error) {
     res.json({ success: false, message: error.message });
  }
}

export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  cancelAppointment,
  dashboardData,
};
