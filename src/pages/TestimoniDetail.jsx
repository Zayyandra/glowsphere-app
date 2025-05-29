// src/pages/TestimoniDetail.jsx
import { useParams } from "react-router-dom";
import testimoni from "../data/testimoni.json";
import PageHeader from "../components/PageHeader";

export default function TestimoniDetail() {
  const { id } = useParams();
  const item = testimoni.find((t) => t.id === id);

  if (!item) {
    return (
      <div className="p-6">
        <PageHeader />
        <div className="text-red-600 text-center mt-10 font-semibold">
          ❌ Testimoni dengan ID "{id}" tidak ditemukan.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <PageHeader />
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">🗣️ Detail Testimoni</h1>

        <div className="space-y-4">
          <div>
            <span className="font-medium text-gray-600">ID Testimoni:</span>
            <p className="text-gray-800">{item.id}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Nama:</span>
            <p className="text-gray-800">{item.name}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Produk:</span>
            <p className="text-gray-800">{item.product}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Pesan:</span>
            <p className="text-gray-800">{item.message}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Rating:</span>
            <p className="text-yellow-500 font-semibold">{item.rating} / 5</p>
          </div>
        </div>
      </div>
    </div>
  );
}
