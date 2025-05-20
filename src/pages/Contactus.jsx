import React from 'react';
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";

export default function ContactUs() {
  return (
    <div className="p-6">
      <PageHeader />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📞 Contact Us</h1>
        <Link
          to="/ContactUs/edit"
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-semibold shadow"
        >
          ✏️ Edit Kontak
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 max-w-xl">
        <p className="text-gray-700 mb-4">Untuk pertanyaan lebih lanjut, hubungi kami melalui informasi berikut:</p>
        <ul className="space-y-3 text-gray-700 text-sm">
          <li><span className="font-medium text-gray-900">📧 Email:</span> support@glowsphere.id</li>
          <li><span className="font-medium text-gray-900">📞 Telepon:</span> 021-12345678</li>
          <li><span className="font-medium text-gray-900">💬 WhatsApp:</span> 0812-3456-7890</li>
          <li><span className="font-medium text-gray-900">📍 Alamat:</span> Jl. Cantik Raya No. 88, Jakarta</li>
        </ul>
      </div>
    </div>
  );
}
