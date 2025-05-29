import React from "react";
import faq from "../data/faq.json";
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
        {faq.map((faqItem, idx) => (
          <Link
            key={idx}
            to={`/faq/${faqItem.id}`}
            className="block border p-4 rounded-md shadow-sm bg-white hover:bg-gray-50 transition"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-gray-800 mb-1">
                {faqItem.question}
              </h3>
              <span className="text-xs text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded">
                {faqItem.category}
              </span>
            </div>
            <p className="text-gray-700 text-sm">{faqItem.answer}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
