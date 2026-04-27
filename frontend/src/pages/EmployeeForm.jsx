import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeForm = () =>{
  const { id } = useParams();
  const [preview, setPreview] = useState(null);
  const isEdit = !!id;
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [employee, setEmployee] = useState({
    name: "",
    employee_id: "", 
    department: "Design",
    designation: "",
    project: "",
    type: "Office",
    status: "Permanent",
    photo: null,
  });

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setEmployee((prev) => ({ ...prev, photo: file }));
    setPreview(URL.createObjectURL(file)); 
  }
};

 useEffect(() => {
  if (isEdit) {
    axios
      .get(`${BACKEND_URL}/api/employee/${id}`)
      .then((res) => {
        setEmployee({ ...res.data, photo: null });
        if (res.data.photo) {
          setPreview(`${BACKEND_URL}/uploads/${res.data.photo}`); 
        }
      })
      .catch((err) => console.error(err));
  }
}, [id, isEdit]);


  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in employee) {
      if (employee[key] !== null) formData.append(key, employee[key]);
    }

    try {
      if (isEdit) {
        await axios.put(`${BACKEND_URL}/api/employee/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Employee updated successfully");
      } else {
        await axios.post(`${BACKEND_URL}/api/employee`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Employee added successfully");
      }
      navigate("/"); 
    } catch (err) {
      console.error(err);
      alert("Failed to save employee");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Employee Details" : "Add New Employee"}
      </h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border flex items-center justify-center bg-gray-100">
           
          {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUser className="text-gray-400 text-3xl" />
              )}
            </div>
            <input type="file" onChange={handleFileChange} accept="image/*" />
        </div>

        <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium">Name*</label>
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Employee ID*</label>
            <input
              type="text"
              name="employee_id" 
              value={employee.employee_id}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Department*</label>
            <select
              name="department"
              value={employee.department}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option>Design</option>
              <option>Development</option>
              <option>HR</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Designation*</label>
            <input
              type="text"
              name="designation"
              value={employee.designation}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Project</label>
            <input
              type="text"
              name="project"
              value={employee.project}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Type*</label>
            <select
              name="type"
              value={employee.type}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option>Office</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Status*</label>
            <select
              name="status"
              value={employee.status}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option>Permanent</option>
              <option>Contract</option>
              <option>Intern</option>
            </select>
          </div>

          <div className="col-span-2 mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
