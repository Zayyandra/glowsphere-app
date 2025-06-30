import { useState, useEffect, useCallback } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { galleryAPI } from "../services/galleryAPI";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import GenericTable from "../components/GenericTable";

const initialFormData = {
  id: null,
  file: "",
  created_at: new Date().toISOString(),
};

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadGalleryItems = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const fetchedData = await galleryAPI.fetchGallerys();

      if (!Array.isArray(fetchedData)) {
        console.warn("Data yang diterima dari API bukan array:", fetchedData);
        setGalleryItems([]);
        setError("Data galeri tidak valid. Mohon coba lagi.");
        return;
      }

      const sorted = [...fetchedData].sort((a, b) => (a.id || 0) - (b.id || 0));
      setGalleryItems(sorted);
    } catch (err) {
      console.error("Gagal memuat galeri:", err);

      let errorMessage = "Gagal memuat galeri. ";
      if (err.response) {
        if (err.response.data?.message) {
          errorMessage += err.response.data.message;
        } else if (err.response.status) {
          errorMessage += `Kode Status: ${err.response.status}. `;
        } else {
          errorMessage += "Server merespons dengan kesalahan.";
        }
      } else if (err.request) {
        errorMessage += "Tidak ada respons dari server. Periksa koneksi atau URL API.";
      } else {
        errorMessage += `Terjadi kesalahan pada permintaan: ${err.message}.`;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGalleryItems();
  }, [loadGalleryItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      setError("URL Gambar harus diisi.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const dataToSend = { ...formData };
      if (!editingGalleryId) {
        delete dataToSend.id;
        dataToSend.created_at = new Date().toISOString();
      } else {
        delete dataToSend.created_at;
      }

      if (typeof dataToSend.file === "string" && !dataToSend.file.trim()) {
        dataToSend.file = null;
      }

      if (editingGalleryId) {
        await galleryAPI.updateGallery(editingGalleryId, dataToSend);
        setSuccess("Item galeri berhasil diperbarui!");
      } else {
        await galleryAPI.createGallery(dataToSend);
        setSuccess("Item galeri berhasil ditambahkan!");
      }

      setFormData(initialFormData);
      setEditingGalleryId(null);
      loadGalleryItems();
    } catch (err) {
      console.error("Gagal menyimpan item galeri:", err.response?.data || err.message);
      let errorMessage = "Gagal menyimpan item galeri. ";
      if (err.response?.data?.message) {
        errorMessage += err.response.data.message;
      } else if (err.message) {
        errorMessage += err.message;
      } else {
        errorMessage += "Periksa data Anda.";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      file: item.file || "",
      created_at: item.created_at || new Date().toISOString(),
    });
    setEditingGalleryId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus item galeri ini?")) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await galleryAPI.deleteGallery(id);
      setSuccess("Item galeri berhasil dihapus!");
      loadGalleryItems();
    } catch (err) {
      console.error("Gagal menghapus item galeri:", err.response?.data || err.message);
      let errorMessage = "Gagal menghapus item galeri. ";
      if (err.response?.data?.message) {
        errorMessage += err.response.data.message;
      } else if (err.message) {
        errorMessage += err.message;
      } else {
        errorMessage += "Silakan coba lagi.";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-gray-50">
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          Manajemen Galeri
        </h2>
        <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto sm:mx-0">
          Kelola daftar gambar galeri Anda di sini. Tambah, edit, dan hapus gambar
          dengan mudah.
        </p>
      </div>

      <div className="space-y-4 max-w-full lg:max-w-4xl mx-auto">
        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-10 max-w-full lg:max-w-4xl mx-auto">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 border-b pb-4">
          {editingGalleryId ? "Edit Item Galeri" : "Tambah Item Galeri Baru"}
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {editingGalleryId && (
            <div className="md:col-span-2">
              <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                ID Item Galeri
              </label>
              <input
                id="id"
                type="text"
                value={formData.id || ""}
                readOnly
                disabled
                className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed text-gray-600"
              />
            </div>
          )}

          <div className="md:col-span-2">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
              URL Gambar <span className="text-red-500">*</span>
            </label>
            <input
              id="file"
              name="file"
              type="text"
              value={formData.file}
              onChange={handleChange}
              disabled={loading}
              placeholder="https://...supabase.co/storage/v1/object/public/images/..."
              required
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {editingGalleryId && formData.created_at && (
            <div className="md:col-span-2">
              <label htmlFor="created_at" className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Dibuat
              </label>
              <input
                id="created_at"
                type="text"
                value={new Date(formData.created_at).toLocaleString("id-ID", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })}
                readOnly
                disabled
                className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed text-gray-600"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg shadow-lg"
          >
            {loading
              ? "Mohon Tunggu..."
              : editingGalleryId
              ? "Perbarui Item Galeri"
              : "Tambah Item Galeri"}
          </button>

          {editingGalleryId && (
            <button
              type="button"
              onClick={() => {
                setEditingGalleryId(null);
                setFormData(initialFormData);
                setError("");
                setSuccess("");
              }}
              disabled={loading}
              className="md:col-span-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg"
            >
              Batal Edit
            </button>
          )}
        </form>
      </div>

      {loading ? (
        <LoadingSpinner text="Memuat galeri..." />
      ) : galleryItems.length === 0 ? (
        <EmptyState text={error ? "Terjadi kesalahan. Coba lagi nanti." : "Belum ada item galeri."} />
      ) : (
        <div className="bg-white rounded-2xl shadow-xl mt-8 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">
              Daftar Galeri ({galleryItems.length})
            </h3>
          </div>

          <GenericTable
            columns={["#", "Gambar", "Tanggal Dibuat", "Aksi"]}
            data={galleryItems}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-4 text-center">{index + 1}</td>

                <td className="px-6 py-4 text-center">
                  {item.file ? (
                    <a
                      href={item.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <img
                        src={item.file}
                        alt={`Galeri ${index + 1}`}
                        className="h-20 w-20 object-cover rounded-md border border-gray-200 hover:border-blue-400"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/80?text=No+Image";
                        }}
                      />
                    </a>
                  ) : (
                    <span className="text-gray-400 text-xs">N/A</span>
                  )}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                  {item.created_at
                    ? new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(item)}
                    disabled={loading}
                    className="p-2 rounded-full hover:bg-blue-100 transition"
                    title="Edit"
                  >
                    <AiFillEdit className="text-blue-500 text-xl" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={loading}
                    className="p-2 rounded-full hover:bg-red-100 transition ml-2"
                    title="Hapus"
                  >
                    <AiFillDelete className="text-red-500 text-xl" />
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
