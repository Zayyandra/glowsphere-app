import React, { useState } from "react";
import products from "../data/product.json";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";

export default function Products() {
  const [page, setPage] = useState(1);
  const productsPerPage = 10;

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIdx = (page - 1) * productsPerPage;
  const paginatedProducts = products.slice(
    startIdx,
    startIdx + productsPerPage
  );

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const categoryColors = {
    Skincare: "bg-rose-100 text-rose-600",
    Haircare: "bg-indigo-100 text-indigo-600",
    Bodycare: "bg-teal-100 text-teal-600",
    Cosmetics: "bg-yellow-100 text-yellow-600",
    default: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="p-6">
      <PageHeader />

      {/* Statistik ringkas */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500">
          <h2 className="text-lg font-semibold text-gray-700">Total Produk</h2>
          <p className="text-4xl font-bold text-green-600 mt-1">
            {products.length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-5 border-l-4 border-purple-500">
          <h2 className="text-lg font-semibold text-gray-700">Kategori Unik</h2>
          <p className="text-4xl font-bold text-purple-600 mt-1">
            {[...new Set(products.map((p) => p.category))].length}
          </p>
        </div>
      </div>

      {/* Kotak putih besar untuk header + tabel */}
      <div className="bg-white rounded-xl shadow ring-1 ring-gray-200 p-4">
        {/* Judul dan tombol */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">🛒 Daftar Produk</h1>
          <Link
            to="/product/add"
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md text-sm font-semibold shadow"
          >
            ➕ Tambah Produk
          </Link>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nama Produk</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3">Stok</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paginatedProducts.map((product, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {product.productId}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    <Link
                      to={`/product/${product.productId}`}
                      className="text-emerald-600 hover:underline"
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        categoryColors[product.category] ||
                        categoryColors.default
                      }`}
                    >
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    Rp {product.price.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-2 font-semibold text-green-600">
                    {product.stock}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ⬅️ Sebelumnya
          </button>
          <span>
            Halaman {page} dari {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Selanjutnya ➡️
          </button>
        </div>
      </div>
    </div>
  );
}
