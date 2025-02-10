import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Doctors from './pages/Doctors';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Appointments from './pages/Appointments';
import BookAppointment from './pages/BookAppointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/" element={<Home />} />
        <Route path="/appointment/:docId" element={<BookAppointment />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App
