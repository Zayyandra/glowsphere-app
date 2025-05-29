import { useEffect, useState } from "react";
import {
  FaDollarSign,
  FaShoppingCart,
  FaBox,
  FaUsers,
  FaSync,
  FaQuoteLeft,
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
    }, 100);
    return () => clearTimeout(timeout);
  }, [refreshTrigger]);

  const statsCards = [
    {
      title: "Total Sales",
      value: "$1,000",
      change: "+5% from yesterday",
      icon: <FaDollarSign className="text-white text-xl" />,
      bgColor: "bg-red-100",
      iconBg: "bg-red-500",
    },
    {
      title: "Total Orders",
      value: "300",
      change: "+10% from yesterday",
      icon: <FaShoppingCart className="text-white text-xl" />,
      bgColor: "bg-orange-100",
      iconBg: "bg-orange-500",
    },
    {
      title: "Product Sold",
      value: "5",
      change: "+20% from yesterday",
      icon: <FaBox className="text-white text-xl" />,
      bgColor: "bg-green-100",
      iconBg: "bg-green-500",
    },
    {
      title: "New Customers",
      value: "8",
      change: "+5% from yesterday",
      icon: <FaUsers className="text-white text-xl" />,
      bgColor: "bg-purple-100",
      iconBg: "bg-purple-500",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Today's Sales" subtitle="Ringkasan penjualan harian" />

      {/* Kutipan Motivasi */}
      <div className="relative overflow-hidden rounded-2xl bg-indigo-100 p-6 shadow-md transition-all hover:shadow-lg">
        <div className="flex items-center justify-between">
          <div className="text-indigo-800 space-y-2">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <FaQuoteLeft className="text-indigo-400" /> Kutipan Hari Ini
            </h2>
            <p className="text-base italic animate-fade-in">
              {error ? error : `"${quote}"`}
            </p>
          </div>
          <button
            onClick={() => setRefreshTrigger((prev) => prev + 1)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-all"
          >
            <FaSync /> Refresh
          </button>
        </div>
      </div>

      {/* Kartu Statistik */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className={`p-5 rounded-2xl shadow-md transition hover:shadow-xl ${card.bgColor}`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm text-gray-600">{card.title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
              </div>
              <div
                className={`p-3 rounded-full shadow-md ${card.iconBg}`}
              >
                {card.icon}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{card.change}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
