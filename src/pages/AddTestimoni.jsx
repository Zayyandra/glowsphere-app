import React from "react";
import PageHeader from "../components/PageHeader";

export default function AddTestimoni() {
  return (
    <div className="p-6">
      <PageHeader />
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        ➕ Tambah Testimoni Baru
      </h1>

      {/* Grid tipis di form container */}
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-xl border border-gray-200">
        <form className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Testimoni ID
            </label>
            <input
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="T001"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Alya Rahma"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Produk
            </label>
            <input
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Glow Serum Bright"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Pesan
            </label>
            <textarea
              rows="4"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Kulitku jadi lebih cerah dan lembab. Produk ini luar biasa!"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Kategori
            </label>
            <input
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Skincare / Makeup / dll"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Rating (1–5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="5"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Tanggal
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <button
            type="button"
            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold transition"
          >
            💾 Simpan Testimoni
          </button>
        </form>
      </div>
    </div>
  );
}
