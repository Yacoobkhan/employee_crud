import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  console.log(BACKEND_URL);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/employee`);
      console.log(res.data);
      setEmployees(res.data || []);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

 
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true); 
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/employee/${deleteId}`);
      fetchEmployees();
      setShowConfirm(false);
      setDeleteId(null);
    } catch (err) {
      console.error("Error deleting employee:", err);
      alert("Failed to delete employee");
    }
  };

  // Filter employees
  const filteredEmployees = employees.filter((emp) =>
    Object.values(emp).some((value) =>
      String(value || "").toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="p-6 w-full">
     
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employee</h1>

        <div className="flex items-center gap-3">
         
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none bg-transparent w-48"
            />
          </div>

          {/* Add Employee */}
          <button
            onClick={() => navigate("/employee/add")}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            <FaPlus /> Add New Employee
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 text-gray-600 text-sm border-b ">
            <tr>
              <th className="py-3 px-4 text-left">Employee Name</th>
              <th className="py-3 px-4 text-left">Employee ID</th>
              <th className="py-3 px-4 text-left">Department</th>
              <th className="py-3 px-4 text-left">Designation</th>
              <th className="py-3 px-4 text-left">Project</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-10 text-gray-500 font-semibold"
                >
                  No records found
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => (
                <tr key={emp.id} className="border-t hover:bg-gray-50">
                 
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          emp.photo
                            ? `${BACKEND_URL}/uploads/${emp.photo}`
                            : "/default-avatar.png"
                        }
                        className="w-[50px] h-[50px] rounded-full object-cover border"
                        onError={(e) => (e.target.src = "/default-avatar.png")}
                      />
                      <span className="font-medium">{emp.name}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4">{emp.employee_id}</td>
                  <td className="py-3 px-4">{emp.department}</td>
                  <td className="py-3 px-4">{emp.designation}</td>
                  <td className="py-3 px-4">{emp.project}</td>
                  <td className="py-3 px-4">{emp.type}</td>
                  <td className="py-3 px-4">{emp.status}</td>

                  
                  <td className="py-3 px-4 flex gap-3 ">
                    <button
                      onClick={() => navigate(`/employee/view/${emp.id}`)}
                      className="text-gray-600 hover:text-blue-500 py-4"
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => navigate(`/employee/edit/${emp.id}`)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => confirmDelete(emp.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl p-6 w-80 text-center shadow-lg">
            <div className="text-blue-500 text-4xl mb-4">🗑️</div>
            <p className="text-lg font-medium mb-6">
              Are you sure you want to Delete?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-red-500 text-white w-32 py-2 rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-blue-500 text-white w-32 py-2 rounded-lg hover:bg-blue-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;




