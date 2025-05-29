import { FaSearch, FaBell } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";

export default function Header() {
  return (
    <div className="flex justify-between items-center py-4 px-6 bg-white shadow-sm border-b border-gray-200">
      {/* Kiri: Judul + Search */}
      <div className="flex items-center space-x-6">
        <h1 className="text-xl font-bold text-gray-800"></h1>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search here..."
            className="w-[800px] pl-10 pr-4 py-2 text-sm bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-blue-300"
          />

          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
        </div>
      </div>

      {/* Kanan: Language, Notifikasi, Profile */}
      <div className="flex items-center space-x-6">
        {/* Language Dropdown */}
        <div className="flex items-center space-x-1 cursor-pointer">
          <img
            src="https://flagcdn.com/us.svg"
            alt="US Flag"
            className="w-5 h-5 rounded-sm object-cover"
          />
          <span className="text-sm font-semibold">Eng (US)</span>
          <MdArrowDropDown className="text-lg" />
        </div>

        {/* Notification */}
        <div className="relative">
          <FaBell className="text-orange-500 text-lg" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <img
            src="https://avatar.iran.liara.run/public/28"
            alt="Profile"
            className="w-9 h-9 rounded-full"
          />
          <div className="text-right">
            <div className="text-sm font-semibold">Musfiq</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
          <MdArrowDropDown className="text-lg" />
        </div>
      </div>
    </div>
  );
}
