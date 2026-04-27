import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const ViewEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [employee, setEmployee] = useState(null);

  // Fetch employee by ID
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/employee/${id}`)
      .then((res) => setEmployee(res.data))
      .catch((err) => console.error("Error fetching employee:", err));
  }, [id]);

  if (!employee) {
    return (
      <div className="p-6 text-center text-gray-500">
        No employee details...
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
      
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="text-xl">
          ←
        </button>
        <h1 className="text-3xl font-bold">View Employee Details</h1>
      </div>

      
      <div className="border-b mb-6">
        <button className="flex items-center gap-2 px-4 py-2 border-b-2 border-blue-500 text-blue-600 font-semibold">
          <FaUser /> Personal Information
        </button>
      </div>

     
      <div className="bg-white p-8 rounded-lg shadow">
        
        <div className="flex items-center gap-6 mb-6">
          <img
            src={
              employee.photo
                ? `${BACKEND_URL}/uploads/${employee.photo}`
                : "/default-avatar.png"
            }
            alt={employee.name}
            className="w-24 h-24 rounded-lg object-cover border"
            onError={(e) => (e.target.src = "/default-avatar.png")}
          />
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-2 gap-8 text-gray-700 ">
          
          <div className="divide-y">
            <div className="py-3">
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{employee.name}</p>
            </div>
            <div className="py-3">
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-medium">{employee.department}</p>
            </div>
            <div className="py-3">
              <p className="text-sm text-gray-500">Project</p>
              <p className="font-medium">{employee.project}</p>
            </div>
            <div className="py-3">
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium">{employee.status}</p>
            </div>
             <div className="divide-y"></div>
          </div>

          
          <div className="divide-y">
            <div className="py-3">
              <p className="text-sm text-gray-500">Employee ID</p>
              <p className="font-medium">{employee.employee_id}</p>
            </div>
            <div className="py-3">
              <p className="text-sm text-gray-500">Designation</p>
              <p className="font-medium">{employee.designation}</p>
            </div>
            <div className="py-3">
              <p className="text-sm text-gray-500">Type</p>
              <p className="font-medium">{employee.type}</p>
            </div>
            <div className="divide-y"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
