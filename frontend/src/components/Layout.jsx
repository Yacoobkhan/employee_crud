import { FaBell, FaCog } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <nav className="w-full bg-white flex justify-between items-center px-6 py-3 border-b border-gray-200 shadow-sm">
        <div className="text-xl font-bold text-blue-500 tracking-wide">
          RS-TECH
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <FaCog className="text-gray-600" size={18} />
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <FaBell className="text-gray-600" size={18} />
          </button>
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="profile"
            className="w-9 h-9 rounded-full border"
          />
        </div>
      </nav>

      <div className="flex flex-1">
        <div className="border-r border-gray-200">
          <Sidebar />
        </div>

        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
