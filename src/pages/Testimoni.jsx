import React, { useState } from "react";
import testimoniData from "../data/testimoni.json";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";

export default function Testimoni() {
  const [page, setPage] = useState(1);
  const testimoniPerPage = 10;

  const totalPages = Math.ceil(testimoniData.length / testimoniPerPage);
  const startIdx = (page - 1) * testimoniPerPage;
  const paginatedTestimoni = testimoniData.slice(
    startIdx,
    startIdx + testimoniPerPage
  );

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="p-6">
      <PageHeader />

      <div className="bg-white rounded-xl shadow ring-1 ring-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">📋 Daftar Testimoni</h1>
          <Link
            to="/testimoni/add"
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md text-sm font-semibold shadow"
          >
            ➕ Tambah Testimoni
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 border border-gray-200">ID</th>
                <th className="px-4 py-3 border border-gray-200">Nama</th>
                <th className="px-4 py-3 border border-gray-200">Produk</th>
                <th className="px-4 py-3 border border-gray-200">Kategori</th>
                <th className="px-4 py-3 border border-gray-200">Pesan</th>
                <th className="px-4 py-3 border border-gray-200">Rating</th>
                <th className="px-4 py-3 border border-gray-200">Tanggal</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paginatedTestimoni.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-4 py-2 border border-gray-200 text-gray-700">
                    <Link
                      to={`/testimoni/${item.id}`}
                      className="text-emerald-600 hover:underline"
                    >
                      {item.id}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-gray-800">
                    <Link
                      to={`/testimoni/${item.id}`}
                      className="text-emerald-700 hover:underline"
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-gray-700">
                    {item.product}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-gray-600">
                    {item.category}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-gray-600">
                    {item.message}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-yellow-500">
                    {"⭐".repeat(item.rating)}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-gray-500">
                    {item.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
