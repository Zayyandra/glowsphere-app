import { BsPeopleFill } from "react-icons/bs";
import { BiCart, BiLockAlt } from "react-icons/bi";
import { MdDashboard, MdErrorOutline } from "react-icons/md";
import {
  FaChartBar,
  FaBox,
  FaCommentAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const menuClass = ({ isActive }) =>
  `gap-2 flex cursor-pointer items-center rounded-xl p-3 font-medium transition ${
    isActive ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"
  }`;

export default function ListMenu() {
  const menus = [
    { id: 1, icon: <MdDashboard />, label: "Dashboard", path: "/" },
    { id: 2, icon: <FaChartBar />, label: "Manajemen Testimoni", path: "/Testimoni" },
    { id: 3, icon: <BiCart />, label: "Manajemen Pemesanan", path: "/Order" },
    { id: 4, icon: <FaBox />, label: "Manajemen Produk", path: "/Product" },
    { id: 5, icon: <FaChartBar />, label: "Manajemen Contact Us", path: "/Contactus" },
    { id: 6, icon: <FaCommentAlt />, label: "Manajemen FAQ", path: "/FAQ" },
    { id: 7, icon: <FaCog />, label: "Settings", path: "/settings" },
    { id: 8, icon: <MdErrorOutline />, label: "Error 400", path: "/error/400" },
    { id: 9, icon: <BiLockAlt />, label: "Error 401", path: "/error/401" },
    { id: 10, icon: <RiShieldKeyholeLine />, label: "Error 403", path: "/error/403" },
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
