import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Employee = sequelize.define(
  "Employee",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    employee_id: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    department: { type: DataTypes.STRING(100), allowNull: false },
    designation: { type: DataTypes.STRING(100), allowNull: false },
    project: { type: DataTypes.STRING(100) },
    type: {
      type: DataTypes.ENUM("Office", "Remote", "Hybrid"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Permanent", "Contract", "Intern"),
      defaultValue: "Permanent",
    },
    photo: { type: DataTypes.STRING(255) },
  },
  {
    tableName: "employees", 
    timestamps: false,      
  }
);

export default Employee;