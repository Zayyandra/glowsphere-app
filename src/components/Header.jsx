import { FaSearch, FaBell, FaChartBar, FaCog } from "react-icons/fa";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-100 rounded-lg">
      {/* Search Bar */}
      <div className="relative w-1/3">
        <input
          className="border border-gray-300 p-2 pl-10 bg-white rounded-md outline-none text-sm w-full"
          type="text"
          placeholder="Search here..."
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
      </div>

      {/* Icon Area + Profile */}
      <div className="flex items-center space-x-4">
        
        {/* Notification Icon with badge */}
        <div className="relative bg-blue-100 p-2 rounded-md">
          <FaBell className="text-blue-600" />
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            50
          </span>
        </div>

        {/* Chart Icon */}
        <div className="bg-blue-100 p-2 rounded-md">
          <FaChartBar className="text-blue-600" />
        </div>

        {/* Settings Icon */}
        <div className="bg-red-100 p-2 rounded-md">
          <FaCog className="text-red-500" />
        </div>

        {/* Divider */}
        <div className="h-8 border-r border-gray-300" />

        {/* Profile Info */}
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <div className="text-sm font-semibold">Zayyandra Rajel Ahsan</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
          <img
            src="https://avatar.iran.liara.run/public/28"
            alt="Profile"
            className="w-9 h-9 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
