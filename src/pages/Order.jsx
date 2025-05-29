import React from "react";
import order from "../data/order.json";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";

export default function Order() {
  const statusColor = {
    Completed: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Canceled: "bg-red-100 text-red-600",
  };

  const totalOrders = order.length;
  const uniqueCustomers = [...new Set(order.map((o) => o.customerName))].length;

  return (
    <div className="p-6">
      <PageHeader />

      {/* Grid statistik atas */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-500">
          <h2 className="text-lg font-semibold text-gray-700">Total Order</h2>
          <p className="text-4xl font-bold text-blue-600 mt-1">{totalOrders}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-5 border-l-4 border-emerald-500">
          <h2 className="text-lg font-semibold text-gray-700">
            Pelanggan Unik
          </h2>
          <p className="text-4xl font-bold text-emerald-600 mt-1">
            {uniqueCustomers}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">📦 Daftar Order</h1>
        <Link
          to="/order/add"
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-semibold shadow"
        >
          ➕ Add Order
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow ring-1 ring-gray-200 p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Produk</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {order.map((order, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-2 font-medium text-gray-700">
                    <Link
                      to={`/order/${order.orderId}`}
                      className="text-blue-600 hover:underline"
                    >
                      {order.orderId}
                    </Link>
                  </td>{" "}
                  <td className="px-4 py-2 text-gray-800">
                    {order.customerName}
                  </td>
                  <td className="px-4 py-2">{order.product}</td>
                  <td className="px-4 py-2">{order.quantity}</td>
                  <td className="px-4 py-2 text-black font-medium">
                    Rp {order.total.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        statusColor[order.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
