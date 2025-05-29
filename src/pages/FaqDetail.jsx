// src/pages/FaqDetail.jsx
import { useParams } from "react-router-dom";
import faqData from "../data/faq.json";
import PageHeader from "../components/PageHeader";

export default function FaqDetail() {
  const { id } = useParams();
  const faq = faqData.find((item) => item.id === id);

  if (!faq) {
    return (
      <div className="p-6">
        <PageHeader />
        <div className="text-red-600 text-center mt-10 font-semibold">
          ❌ FAQ dengan ID "{id}" tidak ditemukan.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <PageHeader />
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">❓ Detail FAQ</h1>

        <div className="space-y-4">
          <div>
            <span className="font-medium text-gray-600">ID FAQ:</span>
            <p className="text-gray-800">{faq.id}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Kategori:</span>
            <p className="text-gray-800">{faq.category}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Pertanyaan:</span>
            <p className="text-gray-800">{faq.question}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Jawaban:</span>
            <p className="text-gray-800">{faq.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
