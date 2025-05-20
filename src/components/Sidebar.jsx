import ListMenu from "./ListMenu";

export default function Sidebar() {
  return (
    <div
      id="sidebar-container"
      className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col"
    >
      <div className="p-6 flex items-center space-x-2">
        <div className="bg-indigo-600 text-white h-8 w-8 rounded-lg flex items-center justify-center font-bold">
          D
        </div>
        <span className="text-lg font-bold">Dabang</span>
      </div>

      <div className="flex-1 px-4 overflow-y-auto">
        <ListMenu />
      </div>

      <div className="p-4 bg-gray-100 border-t border-gray-200 text-center text-gray-500 text-xs">
        © 2025 Zayyandra Rajel Ahsan. All rights reserved.
      </div>
    </div>
  );
}
