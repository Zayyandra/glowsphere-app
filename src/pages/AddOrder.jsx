import React from 'react';
import PageHeader from "../components/PageHeader";

export default function AddOrder() {
  return (
    <div className="p-6">
      <PageHeader />
      <h1 className="text-2xl font-bold text-gray-800 mb-6">➕ Tambah Order Baru</h1>
      
      <div className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 max-w-xl">
        <form className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Order ID</label>
            <input className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="O011" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Nama Customer</label>
            <input className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Nama Lengkap" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Produk</label>
            <input className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Nama Produk" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Jumlah</label>
            <input type="number" className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="1" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Total Harga</label>
            <input type="number" className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="100000" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Status</label>
            <select className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option>Pending</option>
              <option>Completed</option>
              <option>Canceled</option>
            </select>
          </div>
          <button
            type="button"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            💾 Simpan Order
          </button>
        </form>
      </div>
    </div>
  );
}
