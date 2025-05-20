export default function Dashboard() {
    return (
        <div className="p-6 bg-[#FFF7F2] min-h-screen flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-6 text-[#A41E34] text-center">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-5xl">
                <StatCard title="Pengunjung" value="1,250" icon="👥" />
                <StatCard title="Total Produk" value="50" icon="📦" />
                <StatCard title="Total Artikel" value="75" icon="📝" />
                <StatCard title="Total Booking" value="30" icon="📅" />
            </div>
        </div>
    );
}

function StatCard({ title, value, icon }) {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center border border-gray-300 transition transform hover:scale-105 hover:shadow-2xl">
            <div className="text-6xl mb-3">{icon}</div>
            <h2 className="text-xl font-semibold text-[#5A2A2A] text-center">{title}</h2>
            <p className="text-3xl font-bold mt-3 text-[#A41E34]">{value}</p>
        </div>
    );
}
