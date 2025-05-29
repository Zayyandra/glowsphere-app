// src/pages/ProductDetail.jsx
import { useParams } from "react-router-dom";
import products from "../data/product.json";
import PageHeader from "../components/PageHeader";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.productId === id);

  if (!product) {
    return (
      <div className="p-6">
        <PageHeader />
        <div className="text-red-600 text-center mt-10 font-semibold">
          ❌ Produk dengan ID "{id}" tidak ditemukan.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <PageHeader />
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">📦 Detail Produk</h1>

        {/* Gambar Produk */}
        {product.image && (
          <div className="mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-h-96 object-contain bg-white rounded-xl shadow"
            />
          </div>
        )}

        <div className="space-y-4">
          <div>
            <span className="font-medium text-gray-600">ID Produk:</span>
            <p className="text-gray-800">{product.productId}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Nama Produk:</span>
            <p className="text-gray-800">{product.name}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Kategori:</span>
            <p className="text-gray-800">{product.category}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Harga:</span>
            <p className="text-green-600 font-semibold">
              Rp {product.price.toLocaleString("id-ID")}
            </p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Stok:</span>
            <p className="text-gray-800">{product.stock}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
