import { BsPeopleFill } from "react-icons/bs";
import { BiCart, BiLockAlt } from "react-icons/bi";
import { MdDashboard, MdErrorOutline } from "react-icons/md";
import {
  FaChartBar,
  FaBox,
  FaCommentAlt,
  FaCog,
  FaSignOutAlt,
  FaNewspaper,   // untuk Artikel
  FaUsers,       // untuk Tim
  FaBriefcase,   // untuk Lowongan Kerja (Job)
  FaUserShield,  // untuk User
} from "react-icons/fa";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const menuClass = ({ isActive }) =>
  `flex cursor-pointer items-center rounded-xl p-4 space-x-2
${
  isActive
    ? "text-blue-700 bg-blue-200 font-extrabold"
    : "text-gray-600 hover:text-blue-700 hover:bg-blue-200 hover:font-extrabold"
}`;

export default function ListMenu() {
  const menus = [
    { id: 1, icon: <MdDashboard />, label: "Dashboard", path: "/" },
    { id: 2, icon: <FaChartBar />, label: "Manajemen Testimoni", path: "/Testimoni" },
    { id: 3, icon: <BiCart />, label: "Manajemen Pemesanan", path: "/Order" },
    { id: 4, icon: <FaBox />, label: "Manajemen Produk", path: "/Product" },
    { id: 5, icon: <FaChartBar />, label: "Manajemen Contact Us", path: "/Contactus" },
    { id: 6, icon: <FaCommentAlt />, label: "Manajemen FAQ", path: "/FAQ" },
    { id: 7, icon: <FaNewspaper />, label: "Manajemen Artikel", path: "/Article" },         // Artikel
    { id: 8, icon: <FaUsers />, label: "Manajemen Tim", path: "/Team" },                   // Tim
    { id: 9, icon: <FaBriefcase />, label: "Manajemen Lowongan Kerja", path: "/Job" },     // Lowongan Kerja
    { id: 10, icon: <FaUserShield />, label: "Manajemen User", path: "/User" },            // User
    { id: 11, icon: <FaCog />, label: "Settings", path: "/settings" },
    { id: 12, icon: <MdErrorOutline />, label: "Error 400", path: "/error/400" },
    { id: 13, icon: <BiLockAlt />, label: "Error 401", path: "/error/401" },
    { id: 14, icon: <RiShieldKeyholeLine />, label: "Error 403", path: "/error/403" },
  ];

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
          <div className="gap-2 flex cursor-pointer items-center rounded-xl p-3 font-medium text-indigo-600 hover:bg-gray-100">
            <FaSignOutAlt className="text-lg" />
            <span className="text-sm">Sign Out</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
