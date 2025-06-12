// src/components/ListMenu.jsx
import { BsPeopleFill } from "react-icons/bs";
import { BiCart, BiLockAlt } from "react-icons/bi";
import { MdDashboard, MdErrorOutline } from "react-icons/md";
import {
  FaChartBar,
  FaBox,
  FaCommentAlt,
  FaCog,
  FaSignOutAlt,
  FaNewspaper,   // Artikel
  FaUsers,       // Tim
  FaBriefcase,   // Lowongan Kerja
  FaUserShield,  // User
} from "react-icons/fa";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";

const menuClass = ({ isActive }) =>
  `flex items-center space-x-2 rounded-xl p-4 cursor-pointer transition-colors duration-200
${isActive
    ? "bg-[#7069F4] text-white font-semibold"
    : "text-gray-600 hover:text-white hover:bg-[#7069F4]"}`;

export default function ListMenu() {
  const navigate = useNavigate();

  const menus = [
    { id: 1, icon: <MdDashboard />, label: "Dashboard", path: "/" },
    { id: 2, icon: <FaChartBar />, label: "Manajemen Testimoni", path: "/Testimoni" },
    { id: 3, icon: <BiCart />, label: "Manajemen Pemesanan", path: "/Order" },
    { id: 4, icon: <FaBox />, label: "Manajemen Produk", path: "/Product" },
    { id: 5, icon: <FaChartBar />, label: "Manajemen Contact Us", path: "/Contactus" },
    { id: 6, icon: <FaCommentAlt />, label: "Manajemen FAQ", path: "/FAQ" },
    { id: 7, icon: <FaNewspaper />, label: "Manajemen Artikel", path: "/Article" },
    { id: 8, icon: <FaUsers />, label: "Manajemen Tim", path: "/Team" },
    { id: 9, icon: <FaBriefcase />, label: "Manajemen Lowongan Kerja", path: "/Job" },
    { id: 10, icon: <FaUserShield />, label: "Manajemen User", path: "/User" },
    { id: 11, icon: <FaCog />, label: "Settings", path: "/settings" },
    { id: 12, icon: <MdErrorOutline />, label: "Error 400", path: "/error/400" },
    { id: 13, icon: <BiLockAlt />, label: "Error 401", path: "/error/401" },
    { id: 14, icon: <RiShieldKeyholeLine />, label: "Error 403", path: "/error/403" },
  ];

  const handleSignOut = () => {
    // TODO: Tambahkan proses logout seperti hapus token, clear session, dsb.
    navigate('/login');
  };

  return (
    <div id="sidebar-menu" className="mt-6">
      <ul id="menu-list" className="space-y-2">
        {menus.map((menu) => (
          <li key={menu.id}>
            <NavLink to={menu.path} className={menuClass}>
              <span className="text-lg">{menu.icon}</span>
              <span className="text-sm">{menu.label}</span>
            </NavLink>
          </li>
        ))}
<li className="mt-auto pt-6">
  <details className="dropdown dropdown-top w-full" id="logoutDropdown">
    <summary className="flex items-center gap-2 p-3 cursor-pointer rounded-xl text-indigo-600 hover:bg-gray-100 w-full">
      <FaSignOutAlt className="text-lg" />
      <span className="text-sm">Log Out</span>
    </summary>
    <ul className="menu dropdown-content z-[1] p-2 shadow bg-white rounded-box w-52">
      <li>
        <button
          onClick={handleSignOut}
          className="text-red-600 hover:text-red-800"
        >
          Konfirmasi Log Out
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            const dropdown = document.getElementById("logoutDropdown");
            if (dropdown) dropdown.open = false;
          }}
          className="text-gray-700 hover:text-black"
        >
          Batal
        </button>
      </li>
    </ul>
  </details>
</li>
      </ul>
    </div>
  );
}
