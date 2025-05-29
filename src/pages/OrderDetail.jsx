// src/pages/OrderDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import orderData from "../data/order.json";
import PageHeader from "../components/PageHeader";

export default function OrderDetail() {
  const { id } = useParams();
  const order = orderData.find((o) => o.orderId === id);

  if (!order) {
    return (
      <div className="p-6">
        <PageHeader />
        <p className="text-center text-red-600 mt-10 font-semibold">
          ❌ Order ID "{id}" tidak ditemukan.
        </p>
      </div>
    );
  }

// Fungsi menampilkan badge status dengan emoji & warna
const renderStatusBadge = (status) => {
  const normalized = status.toLowerCase();
  let colorClasses = "";
  let emoji = "";
  let label = "";

  if (normalized === "completed" || normalized === "complete") {
    colorClasses = "bg-green-100 text-green-800 border-green-300";
    emoji = "✅";
    label = "Completed";
  } else if (normalized === "pending") {
    colorClasses = "bg-yellow-100 text-yellow-800 border-yellow-300";
    emoji = "⏳";
    label = "Pending";
  } else if (normalized === "canceled" || normalized === "cancel") {
    colorClasses = "bg-red-100 text-red-800 border-red-300";
    emoji = "❌";
    label = "Canceled";
  } else {
    colorClasses = "bg-gray-100 text-gray-800 border-gray-300";
    label = status;
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium ${colorClasses}`}
    >
      <span className="mr-2">{emoji}</span>
      {label}
    </span>
  );
};


  return (
    <div className="p-6">
      <PageHeader />
      <div className="max-w-xl bg-white border rounded-xl shadow-md p-6 space-y-4 transition-all hover:shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          📋 Detail Order
        </h2>
        <div className="space-y-2 text-gray-700 text-base">
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Nama Customer:</strong> {order.customerName}</p>
          <p><strong>Produk:</strong> {order.product}</p>
          <p><strong>Jumlah:</strong> {order.quantity}</p>
          <p><strong>Total:</strong> Rp {order.total.toLocaleString("id-ID")}</p>
          <p><strong>Status:</strong> {renderStatusBadge(order.status)}</p>
        </div>
      </div>
    </div>
  );
}
