import { useEffect, useState } from "react";
import {
  FaDollarSign,
  FaShoppingCart,
  FaBox,
  FaUsers,
  FaSearch,
  FaChevronDown,
  // FaSync, // Dihapus karena Kutipan Hari Ini dihapus
  // FaQuoteLeft, // Dihapus karena Kutipan Hari Ini dihapus
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
import axios from "axios"; // axios tetap diimpor, tetapi tidak digunakan lagi untuk kutipan

export default function Dashboard() {
  // const [quote, setQuote] = useState(""); // Dihapus
  // const [error, setError] = useState(null); // Dihapus
  // const [refreshTrigger, setRefreshTrigger] = useState(0); // Dihapus

  // Data dummy yang Disesuaikan dengan Gambar image_010b85.png
  const todaySalesData = [
    { name: "Total Sales", value: "$1k", change: "+5% from yesterday", bgColor: "bg-red-100", iconBg: "bg-red-500", icon: <FaDollarSign className="text-red-600" /> },
    { name: "Total Order", value: "300", change: "+3% from yesterday", bgColor: "bg-orange-100", iconBg: "bg-orange-500", icon: <FaShoppingCart className="text-orange-600" /> },
    { name: "Product Sold", value: "5", change: "+2% from yesterday", bgColor: "bg-green-100", iconBg: "bg-green-500", icon: <FaBox className="text-green-600" /> },
    { name: "New Customers", value: "8", change: "+2% from yesterday", bgColor: "bg-purple-100", iconBg: "bg-purple-500", icon: <FaUsers className="text-purple-600" /> },
  ];

  const totalRevenueData = [
    { day: "Monday", online: 18, offline: 12 },
    { day: "Tuesday", online: 24, offline: 10 },
    { day: "Wednesday", online: 15, offline: 8 },
    { day: "Thursday", online: 28, offline: 15 },
    { day: "Friday", online: 20, offline: 10 },
    { day: "Saturday", online: 25, offline: 12 },
    { day: "Sunday", online: 18, offline: 9 },
  ];

  const visitorInsightsData = [
    { month: "Jan", loyal: 200, new: 100, unique: 150 },
    { month: "Feb", loyal: 250, new: 120, unique: 180 },
    { month: "Mar", loyal: 220, new: 110, unique: 160 },
    { month: "Apr", loyal: 280, new: 140, unique: 200 },
    { month: "May", loyal: 300, new: 150, unique: 220 },
    { month: "Jun", loyal: 270, new: 130, unique: 190 },
    { month: "Jul", loyal: 320, new: 160, unique: 240 },
    { month: "Aug", loyal: 350, new: 170, unique: 260 },
    { month: "Sep", loyal: 330, new: 165, unique: 250 },
    { month: "Oct", loyal: 380, new: 190, unique: 280 },
    { month: "Nov", loyal: 360, new: 180, unique: 270 },
    { month: "Dec", loyal: 400, new: 200, unique: 300 },
  ];

  const customerSatisfactionData = [
    { month: "Jan", satisfaction: 3000 },
    { month: "Feb", satisfaction: 3500 },
    { month: "Mar", satisfaction: 2800 },
    { month: "Apr", satisfaction: 4000 },
    { month: "May", satisfaction: 3800 },
    { month: "Jun", satisfaction: 4500 },
    { month: "Jul", satisfaction: 4200 },
  ];

  const targetVsRealityData = [
    { month: "Jan", reality: 6, target: 8 },
    { month: "Feb", reality: 7, target: 9 },
    { month: "Mar", reality: 5, target: 7 },
    { month: "Apr", reality: 8, target: 10 },
    { month: "May", reality: 10, target: 12 },
    { month: "Jun", reality: 9, target: 11 },
    { month: "Jul", reality: 11, target: 13 },
    { month: "Aug", reality: 12, target: 14 },
    { month: "Sep", reality: 10, target: 12 },
    { month: "Oct", reality: 13, target: 15 },
    { month: "Nov", reality: 12, target: 14 },
    { month: "Dec", reality: 14, target: 16 },
  ];

  const topProductsData = [
    { id: "01", name: "Home Decor Range", popularity: 80, sales: "45%" },
    { id: "02", name: "Disney Princess Pink Bag", popularity: 70, sales: "29%" },
    { id: "03", name: "Bathroom Essentials", popularity: 60, sales: "18%" },
    { id: "04", name: "Apple Smartwatches", popularity: 50, sales: "25%" },
    // Tambahkan lebih banyak jika ada di gambar
  ];

  const volumeServiceLevelData = [
    { name: "Volume", value: 1135, fill: "#5850ec" }, // Purple/Blue
    { name: "Services", value: 635, fill: "#10b981" }, // Green
  ];

  // Efek samping untuk API kutipan dihapus karena tidak lagi digunakan
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     axios
  //       .get(`https://api.adviceslip.com/advice`)
  //       .then((res) => {
  //         setQuote(res.data.slip.advice);
  //         setError(null);
  //       })
  //       .catch(() => setError("Gagal mengambil kutipan motivasi."));
  //   }, 100);
  //   return () => clearTimeout(timeout);
  // }, [refreshTrigger]);

  return (
    // Outer container for the entire dashboard content, matching the light grey background from image_010b85.png
    <div className="min-h-screen bg-gray-100 p-6 font-sans text-gray-800">

      {/* Top Header Bar - Sesuai gambar image_010b85.png */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-violet-400"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center px-3 py-2 rounded-lg border border-gray-200">
            <img src="https://flagcdn.com/w20/gb.png" alt="English Flag" className="w-5 h-4 mr-2" />
            <span>Eng (US)</span>
            <FaChevronDown className="ml-2 text-gray-500 text-xs" />
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40" // Replace with actual avatar
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
            />
            <div>
              <p className="font-semibold text-sm">Mustaq</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <FaChevronDown className="text-gray-500 text-xs" />
          </div>
        </div>
      </div>

      {/* Konten Dashboard Utama - Fokus pada image_010b85.png */}
      <div className="space-y-6">
        {/* Top Row: Today's Sales and Visitor Insights */}
        <div className="grid grid-cols-3 gap-6">
          {/* Today's Sales */}
          <div className="col-span-2 bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Today's Sales</h2>
              <button className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                <FaBox className="inline-block mr-2" /> Export
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-6">Sales Summary</p>
            <div className="grid grid-cols-4 gap-4">
              {todaySalesData.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl text-center shadow-sm ${item.bgColor}`}
                >
                  <div className="flex items-center justify-center mb-2">
                    <div className={`p-3 rounded-full ${item.iconBg}`}>
                      {item.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1 text-gray-900">{item.value}</div>
                  <p className="text-sm text-gray-600 mb-2">{item.name}</p>
                  <p className={`text-xs ${item.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {item.change}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visitor Insights */}
          <div className="col-span-1 bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Visitor Insights</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={visitorInsightsData}
                margin={{ top: 5, right: 0, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tickFormatter={(tick) => tick.substring(0, 3)} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ paddingLeft: '20px' }} />
                <Line
                  type="monotone"
                  dataKey="loyal"
                  stroke="#8884d8" // Purple
                  strokeWidth={2}
                  dot={false}
                  name="Loyal Customers"
                />
                <Line
                  type="monotone"
                  dataKey="new"
                  stroke="#82ca9d" // Green
                  strokeWidth={2}
                  dot={false}
                  name="New Customers"
                />
                <Line
                  type="monotone"
                  dataKey="unique"
                  stroke="#ff7300" // Orange
                  strokeWidth={2}
                  dot={false}
                  name="Unique Customers"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Middle Row: Total Revenue, Customer Satisfaction, Target vs Reality */}
        <div className="grid grid-cols-3 gap-6">
          {/* Total Revenue */}
          <div className="bg-white p-6 rounded-2xl shadow-md col-span-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Total Revenue</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={totalRevenueData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tickFormatter={(tick) => tick.substring(0, 3)} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ paddingLeft: '20px' }} />
                <Bar dataKey="online" fill="#5850ec" name="Online Sales" barSize={10} /> {/* Blue-purple */}
                <Bar dataKey="offline" fill="#1e90ff" name="Offline Sales" barSize={10} /> {/* Lighter blue */}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Customer Satisfaction */}
          <div className="bg-white p-6 rounded-2xl shadow-md col-span-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Customer Satisfaction</h2>
            <p className="text-gray-500 text-sm mb-4">Last Month: <span className="font-semibold text-gray-800">$3,004</span> This Month: <span className="font-semibold text-violet-600">$4,504</span></p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={customerSatisfactionData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="satisfaction" stroke="#82ca9d" strokeWidth={2} dot={false} /> {/* Green */}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Target vs Reality */}
          <div className="bg-white p-6 rounded-2xl shadow-md col-span-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Target vs Reality</h2>
            <div className="flex justify-between items-center text-sm mb-4">
              <div>
                <p className="text-gray-500">Reality Sales</p>
                <p className="font-bold text-gray-900">8,623</p>
              </div>
              <div>
                <p className="text-gray-500">Target Sales</p>
                <p className="font-bold text-violet-600">12,023</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={targetVsRealityData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tickFormatter={(tick) => tick.substring(0, 3)} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="reality" fill="#1e90ff" barSize={10} name="Reality" /> {/* Lighter blue */}
                <Bar dataKey="target" fill="#5850ec" barSize={10} name="Target" /> {/* Blue-purple */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row: Top Products, Sales Mapping (placeholder), Volume vs Service Level */}
        <div className="grid grid-cols-3 gap-6">
          {/* Top Products */}
          <div className="bg-white p-6 rounded-2xl shadow-md col-span-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h2>
            <div className="space-y-4">
              {topProductsData.map((product) => (
                <div key={product.id} className="flex items-center">
                  <span className="text-gray-500 text-sm w-8">{product.id}</span>
                  <div className="flex-grow ml-4">
                    <p className="text-gray-900 font-medium">{product.name}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${product.popularity}%`,
                          // Colors based on image: green for 80%, pink for 70%, purple for 60%, orange for 50%
                          backgroundColor:
                            product.popularity === 80 ? '#10b981' :
                            product.popularity === 70 ? '#ec4899' :
                            product.popularity === 60 ? '#8b5cf6' :
                            product.popularity === 50 ? '#f97316' :
                            '#3b82f6' // Default if none match
                        }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-gray-600 text-sm ml-4">{product.sales}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Mapping by Country (Placeholder as Recharts cannot render maps) */}
          <div className="bg-white p-6 rounded-2xl shadow-md col-span-1 flex flex-col justify-center items-center text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Sales Mapping by Country</h2>
            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              <p>Map visualization placeholder (requires a separate map library)</p>
            </div>
          </div>

          {/* Volume vs Service Level */}
          <div className="bg-white p-6 rounded-2xl shadow-md col-span-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Volume vs Service Level</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={volumeServiceLevelData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ paddingLeft: '20px' }} />
                <Bar dataKey="value" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}