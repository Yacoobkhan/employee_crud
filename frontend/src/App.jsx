import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import EmployeeForm from "./pages/EmployeeForm";
import EmployeeList from "./pages/EmployeeList";
import ViewEmployee from "./pages/ViewEmployee";

export default function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Layout />}>
         
          <Route index element={<EmployeeList />} />
          <Route path="employee/add" element={<EmployeeForm />} />
          <Route path="employee/edit/:id" element={<EmployeeForm />} />
          <Route path="employee/view/:id" element={<ViewEmployee />} />
        </Route>
      </Routes>
    </Router>
  );
}
