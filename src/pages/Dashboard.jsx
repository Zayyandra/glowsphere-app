import { useEffect, useState } from "react";
import {
  FaDollarSign,
  FaShoppingCart,
  FaBox,
  FaUsers,
  FaSync,
  FaQuoteLeft,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import PageHeader from "../components/PageHeader";
import axios from "axios";

export default function Dashboard() {
  const [quote, setQuote] = useState("");
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Data dummy
  const loginData = [
    { day: "Sen", login: 40 },
    { day: "Sel", login: 60 },
    { day: "Rab", login: 30 },
    { day: "Kam", login: 80 },
    { day: "Jum", login: 50 },
    { day: "Sab", login: 70 },
    { day: "Min", login: 20 },
  ];

  const bookingData = [
    { bulan: "Jan", jumlah: 30 },
    { bulan: "Feb", jumlah: 45 },
    { bulan: "Mar", jumlah: 28 },
    { bulan: "Apr", jumlah: 50 },
    { bulan: "Mei", jumlah: 80 },
  ];

  const artikelPopuler = [
    { judul: "Tips Sehat", views: 1200 },
    { judul: "Manfaat Air", views: 900 },
    { judul: "Olahraga Ringan", views: 750 },
  ];

  const statsCards = [
    {
      title: "Total Pengunjung",
      value: "1,234",
      change: "+12% minggu ini",
      icon: <FaUsers className="text-white text-xl" />,
      bgColor: "bg-blue-100",
      iconBg: "bg-blue-500",
    },
    {
      title: "Total Produk",
      value: "58",
      change: "+3 produk baru",
      icon: <FaBox className="text-white text-xl" />,
      bgColor: "bg-green-100",
      iconBg: "bg-green-500",
    },
    {
      title: "Total Artikel",
      value: "120",
      change: "+5 artikel baru",
      icon: <FaQuoteLeft className="text-white text-xl" />,
      bgColor: "bg-yellow-100",
      iconBg: "bg-yellow-500",
    },
    {
      title: "Total Booking",
      value: "97",
      change: "+15% dari minggu lalu",
      icon: <FaShoppingCart className="text-white text-xl" />,
      bgColor: "bg-pink-100",
      iconBg: "bg-pink-500",
    },
  ];

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

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Dashboard" subtitle="Ringkasan informasi utama" />

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
              <div className={`p-3 rounded-full shadow-md ${card.iconBg}`}>
                {card.icon}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{card.change}</p>
          </div>
        ))}
      </div>

      {/* Grafik Statistik */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        {/* Grafik Login */}
        <div className="bg-white p-5 rounded-2xl shadow-md col-span-1">
          <h3 className="font-semibold text-lg mb-4">Statistik Login User (mingguan)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={loginData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="login" stroke="#6366f1" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Grafik Booking */}
        <div className="bg-white p-5 rounded-2xl shadow-md col-span-1">
          <h3 className="font-semibold text-lg mb-4">Statistik Booking (bulanan)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bulan" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="jumlah" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Artikel Populer */}
        <div className="bg-white p-5 rounded-2xl shadow-md col-span-1">
          <h3 className="font-semibold text-lg mb-4">Artikel Populer</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={artikelPopuler} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="judul" type="category" />
              <Tooltip />
              <Bar dataKey="views" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
