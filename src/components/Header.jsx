import { FaSearch, FaBell } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";

export default function Header() {
  return (
    <div className="flex justify-between items-center py-4 px-6 bg-white shadow-sm border-b border-gray-200">
      {/* Left: Title + Search */}
      <div className="flex items-center gap-10">
        <h1 className="text-2xl font-poppins-bold text-black">Dashboard</h1>

        <div className="relative w-[400px]">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
        </div>
      </div>

      {/* Right: Language, Notification, Profile */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1 cursor-pointer">
          <img
            src="https://flagcdn.com/us.svg"
            alt="US Flag"
            className="w-5 h-5 rounded-sm object-cover"
          />
          <span className="text-sm font-semibold" style={{ color: "#0f1a44" }}>
            Eng (US)
          </span>
          <MdArrowDropDown className="text-lg" />
        </div>

        <div className="relative bg-orange-100 p-2 rounded-full">
          <FaBell className="text-orange-500 text-lg" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </div>

        <div className="flex items-center space-x-2 cursor-pointer">
          <img
            src="https://avatar.iran.liara.run/public/28"
            alt="Profile"
            className="w-9 h-9 rounded-full"
          />
          <div className="text-right">
            <div className="text-sm font-semibold" style={{ color: "#0f1a44" }}>
              Musfiq
            </div>
            <div className="text-xs text-gray-400">Admin</div>
          </div>
          <MdArrowDropDown className="text-lg" />
        </div>
      </div>
    </div>
  );
}
