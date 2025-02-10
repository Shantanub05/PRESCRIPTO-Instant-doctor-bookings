import doctorModel from '../models/doctorModal.js';
import bcrypt from 'bcrypt';
import appointmentModel from '../models/appointmentModel.js';
import jwt from 'jsonwebtoken';

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: 'Availability Changed!' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getDoctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(['-email', '-password']);
    res.json({ success: true, doctors });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const docLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      res.json({ success: false, message: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Invalid Credentials' });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//API to get doc appointments
const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });
    console.log(appointments);
    res.json({ success: true, appointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const markComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: 'Appointment Completed' });
    } else {
      return res.json({ success: false, message: 'Failed' });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const markCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: 'Appointment Cancelled' });
    } else {
      return res.json({ success: false, message: 'Failed' });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export {
  changeAvailability,
  getDoctorList,
  docLogin,
  appointmentsDoctor,
  markCancel,
  markComplete,
};
