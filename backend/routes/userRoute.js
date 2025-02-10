import express from 'express';
import {
  allAppointments,
  bookAppointment,
  getUserDetails,
  registerUser,
  updateUserProfile,
  userLogin,
  cancelAppointment,
  paymentRazorpay,
  verifyPayment
} from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', userLogin)
userRouter.get('/get-profile', authUser, getUserDetails)
userRouter.post('/update-profile', upload.single('image'), authUser, updateUserProfile);
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/appointments', authUser, allAppointments);
userRouter.post('/cancel-appointment', authUser, cancelAppointment);
userRouter.post('/payment-razorpay', authUser, paymentRazorpay)
userRouter.post('/verify-payment', authUser, verifyPayment);

export default userRouter