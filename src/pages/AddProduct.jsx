import React from 'react';
import PageHeader from "../components/PageHeader";

export default function AddProduct() {
  return (
    <div className="p-6">
      <PageHeader />
      <h1 className="text-2xl font-bold text-gray-800 mb-6">➕ Add New Product</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 max-w-xl">
        <form className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Product ID</label>
            <input
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="P021"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Product Name</label>
            <input
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Glow Serum Bright"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
            <select
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option>Skincare</option>
              <option>Haircare</option>
              <option>Bodycare</option>
              <option>Cosmetics</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Price (Rp)</label>
            <input
              type="number"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="55000"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="100"
            />
          </div>
          <button
            type="button"
            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold transition"
          >
            💾 Save Product
          </button>
        </form>
      </div>
    </div>
  );
}
