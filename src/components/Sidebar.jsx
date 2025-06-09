import { Link } from "react-router-dom"; // pastikan ada import ini
import ListMenu from "./ListMenu";

export default function Sidebar() {
  return (
    <div
      id="sidebar-container"
      className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col"
    >
      <Link to="/" className="p-6 flex items-center space-x-2 cursor-pointer hover:bg-gray-100 transition">
        <div className="bg-indigo-600 text-white h-8 w-8 rounded-lg flex items-center justify-center font-bold">
          G
        </div>
        <span className="text-lg font-bold text-gray-800">Glowsphere</span>
      </Link>

      <div className="flex-1 px-4 overflow-y-auto">
        <ListMenu />
      </div>

      <div className="p-4 bg-gray-100 border-t border-gray-200 text-center text-gray-500 text-xs">
        © 2025 Glowsphere. All rights reserved.
      </div>
    </div>
  );
}
