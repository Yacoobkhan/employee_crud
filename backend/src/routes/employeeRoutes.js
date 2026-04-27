import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import Employee from "../models/employee.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
    },
  });

  const upload = multer({storage});
  

// Create Employee
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const employeeData = req.body;

    if (req.file) {
      employeeData.photo = req.file.filename; 
    }

    const newEmployee = await Employee.create(employeeData);
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ error: "Failed to create employee" });
  }
});


// Get all Employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

// Get Employee By id
router.get("/:id", async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id); // only fetch
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.json(employee);
    } catch (err) {
      console.error("Error fetching employee:", err);
      res.status(500).json({ error: "Failed to fetch employee" });
    }
  });

// Update Employee By id
router.put("/:id", upload.single("photo"), async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employeeData = req.body;

    const existingEmployee = await Employee.findByPk(employeeId);
    if (!existingEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    if (req.file) {
      employeeData.photo = req.file.filename;
    } else {
      employeeData.photo = existingEmployee.photo;
    }

    await existingEmployee.update(employeeData);
    res.json(existingEmployee);
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: "Failed to update employee" });
  }
});

//Delete Employee By id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Employee.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) return res.status(404).json({ error: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ error: "Failed to delete employee" });
  }
});

export default router;
