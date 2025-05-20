import React from 'react';
import PageHeader from "../components/PageHeader";

export default function EditContactUs() {
  return (
    <div className="p-6">
      <PageHeader />
      <h1 className="text-2xl font-bold text-gray-800 mb-6">✏️ Edit Informasi Kontak</h1>

      <div className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 max-w-xl">
        <form className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              defaultValue="support@glowsphere.id"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Telepon</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              defaultValue="021-12345678"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">WhatsApp</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              defaultValue="0812-3456-7890"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Alamat</label>
            <textarea
              rows="3"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              defaultValue="Jl. Cantik Raya No. 88, Jakarta"
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            💾 Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}
