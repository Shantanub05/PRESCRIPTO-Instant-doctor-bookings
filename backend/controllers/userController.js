import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModal.js';
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay';


// API for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: 'Missing Details!' });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Invalid Email!' });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: 'Enter strong password!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API for user login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: 'Missing Details!' });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Invalid Email!' });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: 'Enter strong password!',
      });
    }
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      res.json({ success: false, message: 'User does not exist' });
    }

    const isMatched = await bcrypt.compare(password, userExist.password);

    if (isMatched) {
      const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Incorrect Credentials' });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API for getting user details
const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select('-password');
    res.json({ success: true, userData });
  } catch (error) {
    res.json('success:false,message:error.message');
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: 'Missing Data!' });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: 'image',
      });
      const imageUrl = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
    res.json({ success: true, message: 'profile updated' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select('-password');
    if (!docData.available) {
      return res.json({ success: false, message: 'Doctor not available' });
    }
    const slots_booked = docData.slots_booked;

    // check for avaialble slots 
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
         return res.json({ success: false, message: 'Slot not available' });
      } else {
        slots_booked[slotDate].push(slotTime)
      }
      
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }
    const userData = await userModel.findById(userId).select('-password');
    delete docData.slots_booked;
    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date:Date.now()
    }
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // save new slots data in doctors data 
    await doctorModel.findByIdAndUpdate(docId, { slots_booked })
    res.json({success:true,message:"Appointment booked"})
    
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const allAppointments = async (req, res) => {
  try {
    const { userId } = req.body;
    const allAppointments = await appointmentModel.find({ userId })
    res.json({ success: true, allAppointments });
  } catch (error) {
     res.json({ success: false, message: error.message });
  }
}

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData.userId !== userId) {
      return res({success:false,message:"Unauthorized"})
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
    
    const { docId, slotDate, slotTime } = appointmentData
    const docData = await doctorModel.findById(docId);

    let slots_booked = docData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
    await doctorModel.findByIdAndUpdate(docId, { slots_booked })
    res.json({success:true,message:"Appointment Cancelled!"})
  } catch (error) {
     res.json({ success: false, message: error.message });
  }
}

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const paymentRazorpay = async(req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    console.log(appointmentData)

    if (appointmentData.cancelled || !appointmentData) {
      return res.json({
        success: false,
        message: 'Appointment cancelled or not found',
      });
    }
    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    const order = await razorpayInstance.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

// API to verify paymenty
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    // console.log(orderInfo)
    if (orderInfo.status === 'paid') {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
      res.json({success:true,message:"payment sucessfull"})
    }
    else {
       res.json({ success: false, message: 'payment failed' });
    }

  } catch (error) {
      res.json({ success: false, message: error.message });
  }
} 



export {
  registerUser,
  userLogin,
  getUserDetails,
  updateUserProfile,
  bookAppointment,
  allAppointments,
  cancelAppointment,
  paymentRazorpay,
  verifyPayment,
};
