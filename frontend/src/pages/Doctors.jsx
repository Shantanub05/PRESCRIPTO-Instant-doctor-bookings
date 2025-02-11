import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors, getDoctorList } = useContext(AppContext);
  const navigate = useNavigate();
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const filterDoctors = () => {
    if (speciality) {
      setFilteredDoctors(
        doctors.filter((item) => item.speciality === speciality)
      );
    } else {
      setFilteredDoctors(doctors);
    }
  };

  useEffect(() => {
    filterDoctors();
  }, [doctors, speciality]);

  useEffect(() => {
    getDoctorList(); // Fetch the doctor list when the component mounts
  }, []);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transitoin-all sm:hidden ${
            showFilter ? 'bg-primary text-white' : ''
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? 'flex' : 'hidden sm:flex'
          }`}
        >
          <button
            onClick={() =>
              speciality === 'General physician'
                ? navigate('/doctors')
                : navigate('/doctors/General physician')
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                speciality === 'General physician'
                  ? navigate('/doctors')
                  : navigate('/doctors/General physician');
              }
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer text-left ${
              speciality === 'General physician'
                ? 'bg-indigo-100 text-black'
                : ''
            }`}
          >
            General physician
          </button>
          <button
            onClick={() =>
              speciality === 'Gynecologist'
                ? navigate('/doctors')
                : navigate('/doctors/Gynecologist')
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                speciality === 'Gynecologist'
                  ? navigate('/doctors')
                  : navigate('/doctors/Gynecologist');
              }
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer text-left ${
              speciality === 'Gynecologist' ? 'bg-indigo-100 text-black' : ''
            }`}
          >
            Gynecologist
          </button>
          <button
            onClick={() =>
              speciality === 'Dermatologist'
                ? navigate('/doctors')
                : navigate('/doctors/Dermatologist')
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                speciality === 'Dermatologist'
                  ? navigate('/doctors')
                  : navigate('/doctors/Dermatologist');
              }
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer text-left ${
              speciality === 'Dermatologist' ? 'bg-indigo-100 text-black' : ''
            }`}
          >
            Dermatologist
          </button>
          <button
            onClick={() =>
              speciality === 'Pediatricians'
                ? navigate('/doctors')
                : navigate('/doctors/Pediatricians')
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                speciality === 'Pediatricians'
                  ? navigate('/doctors')
                  : navigate('/doctors/Pediatricians');
              }
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer text-left ${
              speciality === 'Pediatricians' ? 'bg-indigo-100 text-black' : ''
            }`}
          >
            Pediatricians
          </button>
          <button
            onClick={() =>
              speciality === 'Neurologist'
                ? navigate('/doctors')
                : navigate('/doctors/Neurologist')
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                speciality === 'Neurologist'
                  ? navigate('/doctors')
                  : navigate('/doctors/Neurologist');
              }
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer text-left ${
              speciality === 'Neurologist' ? 'bg-indigo-100 text-black' : ''
            }`}
          >
            Neurologist
          </button>
          <button
            onClick={() =>
              speciality === 'Gastroenterologist'
                ? navigate('/doctors')
                : navigate('/doctors/Gastroenterologist')
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                speciality === 'Gastroenterologist'
                  ? navigate('/doctors')
                  : navigate('/doctors/Gastroenterologist');
              }
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer text-left ${
              speciality === 'Gastroenterologist'
                ? 'bg-indigo-100 text-black'
                : ''
            }`}
          >
            Gastroenterologist
          </button>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filteredDoctors.map((item) => (
            <button
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={item._id}
            >
              <img className="bg-blue-50" src={item.image} alt="" />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center ${
                    item.available ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  <p
                    className={`w-2 h-2 ${
                      item.available ? 'bg-green-500' : 'bg-red-500'
                    } rounded-full`}
                  ></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
