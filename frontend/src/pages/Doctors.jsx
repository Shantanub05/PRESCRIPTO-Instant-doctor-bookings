import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {

  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const filterDoctors = () => { 
    if (speciality) {
      setFilteredDoctors(doctors.filter((item) => item.speciality === speciality));
    } else {
      setFilteredDoctors(doctors);
    }
  }

  useEffect(() => {
    filterDoctors();
  },[doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          <button
            onClick={() =>
              speciality === 'General physician'
                ? navigate('/doctors')
                : navigate('/doctors/')
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                speciality === 'General physician'
                  ? navigate('/doctors')
                  : navigate('/doctors/')
              }
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer text-left`}
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
                  : navigate('/doctors/Gynecologist')
              }
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer text-left`}
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
                  : navigate('/doctors/Dermatologist')
              }
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer text-left`}
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
                  : navigate('/doctors/Pediatricians')
              }
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer text-left`}
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
                  : navigate('/doctors/Neurologist')
              }
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer text-left`}
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
                  : navigate('/doctors/Gastroenterologist')
              }
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer text-left`}
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
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
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
}

export default Doctors
