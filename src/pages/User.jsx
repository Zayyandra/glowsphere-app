import { useState, useEffect } from "react";
import { AiFillDelete, AiFillEdit, AiOutlineUserAdd } from "react-icons/ai";
import { userAPI } from "../services/userAPI";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function User() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    created_at: new Date().toISOString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) {
      setError("Harap lengkapi semua field!");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (editingUserId) {
        await userAPI.updateUser(editingUserId, formData);
        setSuccess("User diperbarui!");
      } else {
        await userAPI.createUser(formData);
        setSuccess("User ditambahkan!");
      }

      setFormData({
        name: "",
        email: "",
        role: "",
        created_at: new Date().toISOString(),
      });
      setEditingUserId(null);
      await loadUsers();
    } catch (err) {
      setError(`Error: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin hapus user ini?")) return;
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await userAPI.deleteUser(id);
      setSuccess("User dihapus!");
      await loadUsers();
    } catch (err) {
      setError(`Error: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at || new Date().toISOString(),
    });
    setEditingUserId(user.id);
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await userAPI.fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(`Gagal memuat user: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <AiOutlineUserAdd className="text-blue-600" />
          Manajemen Pengguna
        </h2>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {/* Form Tambah/Edit */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {editingUserId ? "Edit Pengguna" : "Tambah Pengguna"}
        </h3>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nama Lengkap"
            required
            disabled={loading}
            className="p-3 bg-gray-50 rounded-xl border border-gray-300"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            disabled={loading}
            className="p-3 bg-gray-50 rounded-xl border border-gray-300"
          />
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role (admin/user)"
            required
            disabled={loading}
            className="p-3 bg-gray-50 rounded-xl border border-gray-300"
          />
          <input
            type="datetime-local"
            name="created_at"
            value={formData.created_at?.slice(0, 16)}
            onChange={handleChange}
            required
            disabled={loading}
            className="p-3 bg-gray-50 rounded-xl border border-gray-300"
          />
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
            >
              {loading
                ? "Memproses..."
                : editingUserId
                ? "Simpan Perubahan"
                : "Tambah Pengguna"}
            </button>
          </div>
        </form>
      </div>

      {/* State */}
      {loading && <LoadingSpinner text="Memuat pengguna..." />}
      {!loading && users.length === 0 && !error && (
        <EmptyState text="Belum ada data pengguna." />
      )}
      {!loading && users.length > 0 && (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">
              Daftar Pengguna ({users.length})
            </h3>
          </div>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-blue-600 text-white text-sm">
                <th className="px-6 py-4 rounded-tl-xl text-left font-semibold">#</th>
                <th className="px-6 py-4 text-left font-semibold">Nama</th>
                <th className="px-6 py-4 text-left font-semibold">Email</th>
                <th className="px-6 py-4 text-left font-semibold">Role</th>
                <th className="px-6 py-4 text-left font-semibold">Dibuat</th>
                <th className="px-6 py-4 rounded-tr-xl text-left font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-blue-700">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(user.created_at).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })} WIB
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => handleEdit(user)} disabled={loading}>
                      <AiFillEdit className="text-blue-500 hover:text-blue-700 text-lg" />
                    </button>
                    <button onClick={() => handleDelete(user.id)} disabled={loading}>
                      <AiFillDelete className="text-red-500 hover:text-red-700 text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
