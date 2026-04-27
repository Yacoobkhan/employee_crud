import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import Employee from "../models/employee.js";

const router = express.Router();

// 👉 Use memory storage (no local uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage });


// ================= CREATE =================
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    let photoUrl = null;

    if (req.file) {
      // Convert buffer → base64
      const base64 = req.file.buffer.toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "employees",
      });

      photoUrl = result.secure_url;
    }

    const employee = await Employee.create({
      ...req.body,
      photo: photoUrl,
    });

    res.status(201).json(employee);
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ error: "Failed to create employee" });
  }
});


// ================= GET ALL =================
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});


// ================= GET BY ID =================
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(employee);
  } catch (err) {
    console.error("Error fetching employee:", err);
    res.status(500).json({ error: "Failed to fetch employee" });
  }
});


// ================= UPDATE =================
router.put("/:id", upload.single("photo"), async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    let photoUrl = employee.photo;

    if (req.file) {
      const base64 = req.file.buffer.toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "employees",
      });

      photoUrl = result.secure_url;
    }

    await employee.update({
      ...req.body,
      photo: photoUrl,
    });

    res.json(employee);
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: "Failed to update employee" });
  }
});


// ================= DELETE =================
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Employee.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ error: "Failed to delete employee" });
  }
});

export default router;