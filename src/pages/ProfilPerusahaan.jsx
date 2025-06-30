import { useState } from "react";
import AlertBox from "../components/AlertBox";

const initialData = {
  name: "Glowsphere Indonesia",
  address: "Jl. Kecantikan No. 88, Jakarta Selatan",
  location: "Jakarta, Indonesia",
  email: "contact@glowsphere.co.id",
  phone: "+62 812-3456-7890",
  website: "https://glowsphere.co.id",
  description: "Glowsphere adalah perusahaan kosmetik dan skincare yang berfokus pada produk alami dan aman untuk berbagai segmen konsumen di Indonesia.",
};

export default function Company() {
  const [formData, setFormData] = useState(initialData);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.email) {
      setError("Nama perusahaan, alamat, dan email wajib diisi.");
      return;
    }

    setSuccess("Data perusahaan berhasil diperbarui.");
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-6 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Profil Perusahaan</h2>
        <p className="text-gray-600">Ubah informasi tentang perusahaan Glowsphere Anda.</p>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-2xl shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Perusahaan</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 rounded"
          />
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Perusahaan</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border border-gray-200 rounded"
          />
        </div>

        <button
          type="submit"
          className="col-span-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
