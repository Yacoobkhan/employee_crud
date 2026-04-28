import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://crudoperati.netlify.app"
  ],
  credentials: true
}));
app.use(express.json());


app.use("/uploads", express.static("uploads"));


app.use("/api/employee", employeeRoutes);

app.get("/",(req,res)=>{
  res.send("API Working");
})

//DB Connection
try {
  await sequelize.authenticate();
  console.log("PostgreSQL connected");

  await sequelize.sync({ alter: true });
  console.log("DB synced");

} catch (err) {
  console.error("DB error:", err);
}

app.listen(process.env.PORT, () => 
  console.log(`Server running on port ${process.env.PORT}`)
);
