import { useEffect, useState } from "react";
import data from "./products.json";
import "./admin.css";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [packagingFilter, setPackagingFilter] = useState("All");

  useEffect(() => {
    setProducts(data);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || product.category === categoryFilter;
    const matchesPackaging = packagingFilter === "All" || product.packaging.type === packagingFilter;
    return matchesSearch && matchesCategory && matchesPackaging;
  });

  const uniqueCategories = ["All", ...new Set(data.map((p) => p.category))];
  const uniquePackaging = ["All", ...new Set(data.map((p) => p.packaging.type))];

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-pink-600">Admin Produk Glowsphere</h1>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari produk..."
          className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/4"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/4"
          value={packagingFilter}
          onChange={(e) => setPackagingFilter(e.target.value)}
        >
          {uniquePackaging.map((pack) => (
            <option key={pack} value={pack}>{pack}</option>
          ))}
        </select>
      </div>

      {/* Header Grid */}
      <div className="hidden md:grid grid-cols-7 font-semibold bg-pink-100 text-pink-700 text-sm border border-gray-300">
        {["Gambar", "Nama Produk", "Kategori", "Harga", "Bahan Aktif", "Kemasan", "Dimensi"].map((header, i) => (
          <div key={i} className="px-3 py-2 border-r border-gray-300 last:border-r-0">
            {header}
          </div>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        filteredProducts.map((p) => (
          <div
            key={p.id}
            className="grid grid-cols-1 md:grid-cols-7 text-sm border-l border-r border-b border-gray-300"
          >
            <div className="px-3 py-2 border-b md:border-b-0 md:border-r border-gray-300 flex justify-center md:justify-start">
              <img src={p.image} alt={p.title} className="w-16 h-16 object-cover rounded" />
            </div>
            <div className="px-3 py-2 border-b md:border-b-0 md:border-r border-gray-300">{p.title}</div>
            <div className="px-3 py-2 border-b md:border-b-0 md:border-r border-gray-300">{p.category}</div>
            <div className="px-3 py-2 border-b md:border-b-0 md:border-r border-gray-300">Rp {p.price.toLocaleString()}</div>
            <div className="px-3 py-2 border-b md:border-b-0 md:border-r border-gray-300">{p.ingredients.main}</div>
            <div className="px-3 py-2 border-b md:border-b-0 md:border-r border-gray-300">
              {p.packaging.type} ({p.packaging.size})
            </div>
            <div className="px-3 py-2">{p.dimensions.height}x{p.dimensions.width}x{p.dimensions.depth} cm</div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 py-4 border-b border-gray-300">
          Tidak ada produk ditemukan.
        </div>
      )}
    </div>
  );
}
