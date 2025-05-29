import React from "react";
import PageHeader from "../components/PageHeader";

export default function AddFAQ() {
  return (
    <div className="p-6">
      <PageHeader />
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        ➕ Tambah Pertanyaan FAQ
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 max-w-xl border border-gray-200">
        <form className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Pertanyaan
            </label>
            <input
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Contoh: Apakah tersedia COD?"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Jawaban
            </label>
            <textarea
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows="4"
              placeholder="Jawaban lengkap atas pertanyaan di atas..."
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Kategori
            </label>
            <input
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Pemesanan / Pengiriman / Produk / dll"
            />
          </div>

          <button
            type="button"
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
          >
            💾 Simpan FAQ
          </button>
        </form>
      </div>
    </div>
  );
}
