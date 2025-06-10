import { Link } from "react-router-dom";
import ListMenu from "./ListMenu";

export default function Sidebar() {
  return (
    <div
      id="sidebar-container"
      className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col justify-between"
    >
      {/* Bagian Atas: Logo & Menu */}
      <div className="flex flex-col flex-1">
        <Link
          to="/"
          className="p-6 flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition"
        >
          {/* Huruf G (logo kecil) */}
          <img
            src="/img/glowsphere2.png"
            alt="G Icon"
            className="h-1 w-auto object-contain"
          />

          {/* Logo Utama */}
          <img
            src="/img/glowsphere.png"
            alt="Glowsphere Logo"
            className="h-36 w-auto object-contain"
          />
        </Link>

        {/* Menu List */}
        <div className="px-4 overflow-y-auto flex-1">
          <ListMenu />
        </div>
      </div>

      {/* Bagian Bawah: Promo Card & Footer */}
      <div>
        <div className="p-4">
          <div className="bg-indigo-500 text-white rounded-xl p-4 text-center">
            <div className="mb-2 flex justify-center">
              <div className="bg-white rounded-full p-2">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zM9 15v-2h2v2H9zm0-4V5h2v6H9z" />
                </svg>
              </div>
            </div>
            <h3 className="font-semibold text-lg">Glowsphere</h3>
            <p className="text-sm text-indigo-100 mb-4">
              Get access to our guest landing page
            </p>
            <a
              href="https://project-uts-sigma.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Glowsphere
            </a>
          </div>
        </div>

        <div className="p-4 bg-gray-100 border-t border-gray-200 text-center text-gray-500 text-xs">
          © 2025 Glowsphere. All rights reserved.
        </div>
      </div>
    </div>
  );
}
