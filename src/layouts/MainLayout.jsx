import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="flex bg-gray-200 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Konten utama */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Konten */}
        <div className="flex-1 px-6 py-4">
          <div className="card-box p-6 h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
