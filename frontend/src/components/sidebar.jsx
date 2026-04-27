import { useState } from "react";
import { FaThLarge, FaUsers, FaCalendarAlt, FaEnvelope } from "react-icons/fa";

const Sidebar = () => {
  const [active, setActive] = useState("Employee");

  const menuItems = [
    { name: "Dashboard", icon: <FaThLarge /> },
    { name: "Employee", icon: <FaUsers /> },
    { name: "Calendar", icon: <FaCalendarAlt /> },
    { name: "Messages", icon: <FaEnvelope /> },
  ];

  return (
    <div className="h-screen w-64 bg-white flex flex-col">
    
      <div className="flex-1 p-4">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`flex items-center gap-3 px-4 py-3 my-1 rounded-full cursor-pointer transition-all 
              ${
                active === item.name
                  ? "bg-blue-500 text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-md font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
