import React from "react";
import faq from "../data/faq.json"; // Pastikan file ini valid
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";

export default function FAQ() {
  return (
    <div className="p-6">
      <PageHeader />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          FAQ (Pertanyaan Umum)
        </h1>
        <Link
          to="/faq/add"
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-semibold shadow"
        >
          ➕ Add FAQ
        </Link>
      </div>

      <div className="space-y-4">
        {faq.map((faq, idx) => (
          <div key={idx} className="border p-4 rounded-md shadow-sm bg-white">
            <h3 className="font-semibold text-gray-800 mb-1">{faq.question}</h3>
            <p className="text-gray-700 text-sm">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
