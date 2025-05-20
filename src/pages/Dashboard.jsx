import { FaDownload, FaArrowLeft, FaPlus, FaArrowUp, FaDollarSign, FaShoppingCart, FaBox, FaUsers } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
  const statsCards = [
    {
      title: "Total Sales",
      value: "$1k",
      change: "+5% from yesterday",
      icon: <FaDollarSign className="text-white" />,
      bgColor: "bg-red-100",
      iconBg: "bg-red-400",
    },
    {
      title: "Total Order",
      value: "300",
      change: "+10% from yesterday",
      icon: <FaShoppingCart className="text-white" />,
      bgColor: "bg-orange-100",
      iconBg: "bg-orange-400",
    },
    {
      title: "Product Sold",
      value: "5",
      change: "+20% from yesterday",
      icon: <FaBox className="text-white" />,
      bgColor: "bg-green-100",
      iconBg: "bg-green-400",
    },
    {
      title: "New Customers",
      value: "8",
      change: "+5% from yesterday",
      icon: <FaUsers className="text-white" />,
      bgColor: "bg-purple-100",
      iconBg: "bg-purple-400",
    },
  ];

  return (
    <div className="p-4">
      <PageHeader
        title="Today's Sales"
        subtitle="Sales Summary"
      />

      {/* Tombol-tombol di bawah judul */}
      <div className="flex justify-end space-x-2 mt-4 mb-6">
        <button className="flex items-center space-x-1 bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 text-sm">
          <FaPlus />
          <span>Add Button</span>
        </button>
        <button className="flex items-center space-x-1 bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 text-sm">
          <FaDownload />
          <span>Export</span>
        </button>
        <button className="flex items-center space-x-1 bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 text-sm">
          <FaArrowLeft />
          <span>Kembali</span>
        </button>
      </div>

      {/* Card Summary */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((card, index) => (
            <div key={index} className={`${card.bgColor} rounded-lg p-4 shadow-inner`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">{card.value}</h3>
                  <p className="text-sm font-medium text-gray-700">{card.title}</p>
                  <div className="flex items-center mt-2 text-xs text-green-600">
                    <FaArrowUp className="mr-1 text-xs" />
                    <span>{card.change}</span>
                  </div>
                </div>
                <div className={`${card.iconBg} p-2 rounded-full`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
