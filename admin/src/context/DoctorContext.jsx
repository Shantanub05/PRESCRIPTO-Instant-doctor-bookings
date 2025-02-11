import { createContext } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(
    localStorage.getItem('dToken') ? localStorage.getItem('dToken') : ''
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashdata] = useState(false);
  
  
  const getAppointments = async() => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/doctor/doctor-appointments',
        { headers: { dToken } }
      );
      if (data.success) {
        console.log(data.appointments.reverse());
        setAppointments(data.appointments)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const markComplete = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dToken } })
        if (data.success) {
          toast.success(data.message)
          getAppointments();
        } else {
          toast.error(data.message)
        }
    } catch (error) {
       toast.error(error.message);
    }
  }

  const markCancel = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/doctor/cancel-appointment',
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashdata = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', { headers: { dToken } })
      if (data.success) {
        setDashdata(data.dashData)
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
       toast.error(error.message);
    }
  }

  const value = {
    backendUrl,
    dToken,
    setDToken,
    getAppointments,
    appointments,
    setAppointments,
    markComplete,
    markCancel,
    getDashdata,
    dashData,
    setDashdata
  };

  return (
    <DoctorContext.Provider value={value}>{props.children}</DoctorContext.Provider>
  );
};
DoctorContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DoctorContextProvider;
