import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { teamAPI } from "../services/teamAPI";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import GenericTable from "../components/GenericTable";

export default function TeamList() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    photo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const loadTeams = async () => {
  try {
    setLoading(true);
    const data = await teamAPI.fetchTeam();

    // Urutkan berdasarkan id ASCENDING
    const sorted = data.sort((a, b) => a.id - b.id);

    setTeams(sorted);
  } catch {
    setError("Gagal memuat data tim.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadTeams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, role, bio, photo } = formData;
    if (!name || !role || !bio || !photo) {
      setError("Harap isi semua kolom.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (editingId) {
        await teamAPI.updateTeam(editingId, { name, role, bio, photo });
        setSuccess("Data tim berhasil diperbarui!");
      } else {
        await teamAPI.createTeam({ name, role, bio, photo });
        setSuccess("Data tim berhasil ditambahkan!");
      }

      setFormData({ name: "", role: "", bio: "", photo: "" });
      setEditingId(null);
      loadTeams();
    } catch {
      setError("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      role: item.role,
      bio: item.bio,
      photo: item.photo,
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    const confirmDel = confirm("Yakin ingin menghapus data tim ini?");
    if (!confirmDel) return;

    try {
      setLoading(true);
      await teamAPI.deleteTeam(id);
      setSuccess("Data tim berhasil dihapus.");
      loadTeams();
    } catch {
      setError("Gagal menghapus data tim.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Manajemen Tim</h2>

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
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio / Pesan"
            className="w-full p-3 rounded-xl border"
            required
          />
          <input
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="URL Foto"
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

      {/* Tabel Tim */}
      {loading && <LoadingSpinner text="Memuat data..." />}
      {!loading && teams.length === 0 && <EmptyState text="Belum ada data tim." />}

      {!loading && teams.length > 0 && (
        <GenericTable
          columns={["#", "Nama", "Role", "Bio", "Foto", "Aksi"]}
          data={teams}
          renderRow={(item, index) => (
            <>
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.role}</td>
              <td className="px-4 py-2 italic">"{item.bio}"</td>
              <td className="px-4 py-2">
                <img
                  src={item.photo}
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
