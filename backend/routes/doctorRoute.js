import express from 'express';
import {
  getDoctorList,
  docLogin,
  appointmentsDoctor,
  markComplete,
  markCancel,
  dashboardData,
} from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';
const doctorRouter = express.Router();

doctorRouter.get('/list', getDoctorList);
doctorRouter.post('/login', docLogin);
doctorRouter.get('/doctor-appointments', authDoctor, appointmentsDoctor);
doctorRouter.post('/complete-appointment', authDoctor, markComplete);
doctorRouter.post('/cancel-appointment', authDoctor, markCancel);
doctorRouter.get('/dashboard', authDoctor, dashboardData);

export default doctorRouter;
