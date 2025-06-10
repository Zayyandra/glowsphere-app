import { useState, useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { careerAPI } from "../services/careerAPI";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import GenericTable from "../components/GenericTable";

export default function CareerList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [careers, setCareers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
  });

  const [editingCareerId, setEditingCareerId] = useState(null);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.description) {
      setError("Harap lengkapi semua field!");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (editingCareerId) {
        await careerAPI.updateCareer(editingCareerId, formData);
        setSuccess("Data pekerjaan berhasil diperbarui!");
      } else {
        await careerAPI.createCareer(formData);
        setSuccess("Data pekerjaan berhasil ditambahkan!");
      }

      setFormData({
        title: "",
        location: "",
        description: "",
      });
      setEditingCareerId(null);
      loadCareers();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus data pekerjaan ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await careerAPI.deleteCareer(id);
      setSuccess("Data pekerjaan berhasil dihapus!");
      loadCareers();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (career) => {
    setFormData({
      title: career.title,
      location: career.location,
      description: career.description,
    });
    setEditingCareerId(career.id);
  };

const loadCareers = async () => {
  try {
    console.log("Memulai loadCareers...");
    setLoading(true);
    setError("");
    const data = await careerAPI.fetchCareer();
    console.log("Data berhasil:", data);

    // Urutkan berdasarkan ID secara ASCENDING
    const sorted = data.sort((a, b) => a.id - b.id);

    setCareers(sorted);
  } catch (err) {
    console.error("Terjadi error saat fetch:", err);
    setError("Gagal memuat data pekerjaan.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadCareers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Manajemen Pekerjaan</h2>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {editingCareerId ? "Edit Data Pekerjaan" : "Tambah Pekerjaan Baru"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Judul Pekerjaan"
            disabled={loading}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            placeholder="Lokasi"
            disabled={loading}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />

          <textarea
            name="description"
            value={formData.description}
            placeholder="Deskripsi Pekerjaan"
            disabled={loading}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all"
            >
              {loading ? "Mohon Tunggu..." : editingCareerId ? "Perbarui Data" : "Tambah Pekerjaan"}
            </button>
            {editingCareerId && (
              <button
                type="button"
                onClick={() => {
                  setFormData({ title: "", location: "", description: "" });
                  setEditingCareerId(null);
                }}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-2xl transition-all"
              >
                Batal Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {loading && <LoadingSpinner text="Memuat data pekerjaan..." />}
      {!loading && careers.length === 0 && !error && <EmptyState text="Belum ada pekerjaan." />}
      {!loading && careers.length === 0 && error && <EmptyState text="Terjadi kesalahan. Coba lagi nanti." />}

      {!loading && careers.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto mt-10">
          <div className="px-6 py-4">
            <h3 className="text-lg font-semibold">Daftar Pekerjaan ({careers.length})</h3>
          </div>

          <GenericTable
            columns={["#", "Judul", "Lokasi", "Deskripsi", "Aksi"]}
            data={careers}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-4">{index + 1}.</td>
                <td className="px-6 py-4 font-semibold text-blue-600">{item.title}</td>
                <td className="px-6 py-4">{item.location}</td>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleEdit(item)} disabled={loading} className="mr-2">
                    <AiFillEdit className="text-blue-500 text-2xl hover:text-blue-700" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} disabled={loading}>
                    <AiFillDelete className="text-red-400 text-2xl hover:text-red-600" />
                  </button>
                </td>
              </>
            )}
          />
        </div>
      )}
    </div>
  );
}
