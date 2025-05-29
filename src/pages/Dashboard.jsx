import { useEffect, useState } from "react";
import {
  FaDownload,
  FaArrowLeft,
  FaPlus,
  FaArrowUp,
  FaDollarSign,
  FaShoppingCart,
  FaBox,
  FaUsers,
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import axios from "axios";

export default function Dashboard() {
  const [quote, setQuote] = useState("");
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      axios
        .get(`https://api.adviceslip.com/advice`)
        .then((res) => {
          setQuote(res.data.slip.advice);
          setError(null);
        })
        .catch(() => setError("Gagal mengambil kutipan motivasi."));
    }, 100); // debounce 100ms

    return () => clearTimeout(timeout); // cleanup jika trigger berubah
  }, [refreshTrigger]);

  const statsCards = [
    {
      title: "Total Sales",
      value: "$1k",
      change: "+5% from yesterday",
      icon: <FaDollarSign className="text-white text-lg" />,
      bgColor: "bg-red-50",
      iconBg: "bg-red-500",
    },
    {
      title: "Total Orders",
      value: "300",
      change: "+10% from yesterday",
      icon: <FaShoppingCart className="text-white text-lg" />,
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-500",
    },
    {
      title: "Product Sold",
      value: "5",
      change: "+20% from yesterday",
      icon: <FaBox className="text-white text-lg" />,
      bgColor: "bg-green-50",
      iconBg: "bg-green-500",
    },
    {
      title: "New Customers",
      value: "8",
      change: "+5% from yesterday",
      icon: <FaUsers className="text-white text-lg" />,
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-500",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Today's Sales" subtitle="Sales Summary" />

      {/* Quote Section */}
      <div className="bg-gradient-to-r from-indigo-100 to-blue-100 border border-blue-300 rounded-xl p-5 shadow">
        <h2 className="text-lg font-semibold text-indigo-700 mb-1">💡 Inspirational Quote</h2>
        <p className="text-gray-700 italic mb-2">
          {error ? (
            <span className="text-red-500">{error}</span>
          ) : (
            `“${quote || "Memuat kutipan motivasi..." }”`
          )}
        </p>
        <button
          onClick={() => setRefreshTrigger((prev) => prev + 1)}
          className="bg-indigo-500 text-white px-3 py-1 rounded-md hover:bg-indigo-600 transition text-sm"
        >
          🔄 Refresh Quote
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-end gap-2">
        <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition">
          <FaPlus />
          <span>Add</span>
        </button>
        <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition">
          <FaDownload />
          <span>Export</span>
        </button>
        <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition">
          <FaArrowLeft />
          <span>Kembali</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-xl p-5 shadow-md transition hover:scale-[1.02] ${card.bgColor}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold">{card.value}</h3>
                <p className="text-sm text-gray-700 font-medium">{card.title}</p>
                <div className="flex items-center mt-2 text-green-600 text-xs font-semibold bg-green-100 rounded-full px-2 py-1 w-fit">
                  <FaArrowUp className="mr-1 text-xs" />
                  {card.change}
                </div>
              </div>
              <div className={`${card.iconBg} p-3 rounded-full shadow-md`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
