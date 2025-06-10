import { useState, useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { testimoniAPI } from "../services/testimoniAPI";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import GenericTable from "../components/GenericTable";

export default function TestimoniList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [testimonis, setTestimonis] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    quote: "",
    rating: "",
    avatar: "",
  });

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const loadTestimoni = async () => {
  try {
    setLoading(true);
    const data = await testimoniAPI.fetchTestimoni();

    // Urutkan berdasarkan id ASCENDING
    const sorted = data.sort((a, b) => a.id - b.id);

    setTestimonis(sorted);
  } catch {
    setError("Gagal memuat data testimoni.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadTestimoni();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, role, quote, rating, avatar } = formData;
    if (!name || !role || !quote || !rating || !avatar) {
      setError("Harap isi semua kolom.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const payload = { ...formData, rating: parseInt(formData.rating) };

      if (editingId) {
        await testimoniAPI.updateTestimoni(editingId, payload);
        setSuccess("Berhasil diperbarui!");
      } else {
        await testimoniAPI.createTestimoni(payload);
        setSuccess("Berhasil ditambahkan!");
      }

      setFormData({ name: "", role: "", quote: "", rating: "", avatar: "" });
      setEditingId(null);
      loadTestimoni();
    } catch {
      setError("Terjadi kesalahan saat menyimpan.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDel = confirm("Yakin ingin menghapus testimoni ini?");
    if (!confirmDel) return;

    try {
      setLoading(true);
      await testimoniAPI.deleteTestimoni(id);
      setSuccess("Testimoni dihapus.");
      loadTestimoni();
    } catch {
      setError("Gagal menghapus testimoni.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      role: item.role,
      quote: item.quote,
      rating: item.rating.toString(),
      avatar: item.avatar,
    });
    setEditingId(item.id);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Manajemen Testimoni</h2>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {/* Form Tambah/Edit */}
      <div className="bg-white shadow rounded-2xl p-6 mb-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nama"
            className="w-full p-3 rounded-xl border"
            required
          />
          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role / Jabatan"
            className="w-full p-3 rounded-xl border"
            required
          />
          <textarea
            name="quote"
            value={formData.quote}
            onChange={handleChange}
            placeholder="Testimoni"
            className="w-full p-3 rounded-xl border"
            required
          />
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating (1-5)"
            min="1"
            max="5"
            className="w-full p-3 rounded-xl border"
            required
          />
          <input
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="URL Avatar (gambar)"
            className="w-full p-3 rounded-xl border"
            required
          />

          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
          >
            {editingId ? "Perbarui" : "Tambah"}
          </button>
        </form>
      </div>

      {/* Tabel Testimoni */}
      {loading && <LoadingSpinner text="Memuat data..." />}
      {!loading && testimonis.length === 0 && <EmptyState text="Belum ada testimoni." />}

      {!loading && testimonis.length > 0 && (
        <GenericTable
          columns={["#", "Nama", "Role", "Quote", "Rating", "Avatar", "Aksi"]}
          data={testimonis}
          renderRow={(item, index) => (
            <>
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.role}</td>
              <td className="px-4 py-2 italic">"{item.quote}"</td>
              <td className="px-4 py-2 text-center">{item.rating}</td>
              <td className="px-4 py-2">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td className="px-4 py-2">
                <button onClick={() => handleEdit(item)} className="mr-2">
                  <AiFillEdit className="text-blue-500 text-xl" />
                </button>
                <button onClick={() => handleDelete(item.id)}>
                  <AiFillDelete className="text-red-500 text-xl" />
                </button>
              </td>
            </>
          )}
        />
      )}
    </div>
  );
}
