import { useState, useEffect, useCallback } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { articleAPI } from "../services/articleAPI";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import GenericTable from "../components/GenericTable";

const initialFormData = {
  id: null,
  title: "",
  author: "",
  date: new Date().toISOString().split("T")[0],
  content: "",
  image_url: "",
};

export default function Article() {
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [editingArticleId, setEditingArticleId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const fetchedData = await articleAPI.fetchArticles();

      if (!Array.isArray(fetchedData)) {
        console.warn("Data yang diterima dari API bukan array:", fetchedData);
        setArticles([]);
        setError("Data artikel tidak valid. Mohon coba lagi.");
        return;
      }

      const sorted = [...fetchedData].sort((a, b) => (a.id || 0) - (b.id || 0));
      setArticles(sorted);
    } catch (err) {
      console.error("Gagal memuat artikel:", err);

      let errorMessage = "Gagal memuat artikel. ";
      if (err.response) {
        if (err.response.data && err.response.data.message) {
          errorMessage += err.response.data.message;
        } else if (err.response.status) {
          errorMessage += `Kode Status: ${err.response.status}. `;
        } else {
          errorMessage += "Server merespons dengan kesalahan.";
        }
      } else if (err.request) {
        errorMessage +=
          "Tidak ada respons dari server. Periksa koneksi atau URL API.";
      } else {
        errorMessage += `Terjadi kesalahan pada permintaan: ${err.message}.`;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.content) {
      setError("Judul, Penulis, dan Konten artikel harus diisi.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const dataToSend = { ...formData };
      if (!editingArticleId) {
        delete dataToSend.id;
      }

      for (const key in dataToSend) {
        if (typeof dataToSend[key] === "string" && !dataToSend[key].trim()) {
          dataToSend[key] = null;
        }
      }

      if (editingArticleId) {
        await articleAPI.updateArticle(editingArticleId, dataToSend);
        setSuccess("Artikel berhasil diperbarui!");
      } else {
        await articleAPI.createArticle(dataToSend);
        setSuccess("Artikel berhasil ditambahkan!");
      }

      setFormData(initialFormData);
      setEditingArticleId(null);
      loadArticles();
    } catch (err) {
      console.error(
        "Gagal menyimpan artikel:",
        err.response ? err.response.data : err.message
      );
      let errorMessage = "Gagal menyimpan artikel. ";
      if (err.response && err.response.data && err.response.data.message) {
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

  const handleEdit = (article) => {
    setFormData({
      id: article.id,
      title: article.title || "",
      author: article.author || "",
      date: article.date
        ? new Date(article.date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      content: article.content || "",
      image_url: article.image_url || "",
    });
    setEditingArticleId(article.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus artikel ini?")) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await articleAPI.deleteArticle(id);
      setSuccess("Artikel berhasil dihapus!");
      loadArticles();
    } catch (err) {
      console.error(
        "Gagal menghapus artikel:",
        err.response ? err.response.data : err.message
      );
      let errorMessage = "Gagal menghapus artikel. ";
      if (err.response && err.response.data && err.response.data.message) {
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

  const tableColumns = [
    "#",
    "Judul",
    "Penulis",
    "Tanggal",
    "Konten",
    "Gambar",
    "Aksi",
  ];

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-gray-50">
      {/* Header Halaman */}
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          Manajemen Artikel
        </h2>
        <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto sm:mx-0">
          Kelola daftar artikel Anda di sini. Tambah, edit, dan hapus artikel
          dengan mudah.
        </p>
      </div>

      {/* Area Notifikasi */}
      <div className="space-y-4 max-w-full lg:max-w-4xl mx-auto">
        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}
      </div>

      {/* Form Tambah/Edit Artikel */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-10 max-w-full lg:max-w-4xl mx-auto">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 border-b pb-4">
          {editingArticleId ? "Edit Artikel" : "Tambah Artikel Baru"}
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {editingArticleId && (
            <div className="md:col-span-2">
              <label
                htmlFor="id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ID Artikel
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

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Judul Artikel <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              disabled={loading}
              placeholder="Masukkan judul artikel"
              required
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama Penulis <span className="text-red-500">*</span>
            </label>
            <input
              id="author"
              name="author"
              type="text"
              value={formData.author}
              onChange={handleChange}
              disabled={loading}
              placeholder="Masukkan nama penulis"
              required
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Konten Artikel <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              rows={6}
              value={formData.content}
              onChange={handleChange}
              disabled={loading}
              placeholder="Tulis isi konten artikel lengkap di sini..."
              required
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tanggal
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              disabled={loading}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="image_url"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              URL Gambar
            </label>
            <input
              id="image_url"
              name="image_url"
              type="text"
              value={formData.image_url}
              onChange={handleChange}
              disabled={loading}
              placeholder="Contoh: https://example.com/gambar-artikel.jpg"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Tombol Aksi Form */}
          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg shadow-lg"
          >
            {loading
              ? "Mohon Tunggu..."
              : editingArticleId
              ? "Perbarui Artikel"
              : "Tambah Artikel"}
          </button>

          {editingArticleId && (
            <button
              type="button"
              onClick={() => {
                setEditingArticleId(null);
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

      {/* Area Tampilan Artikel (Loading, Empty State, atau Tabel) */}
      {loading ? (
        <LoadingSpinner text="Memuat artikel..." />
      ) : articles.length === 0 ? (
        <EmptyState
          text={
            error ? "Terjadi kesalahan. Coba lagi nanti." : "Belum ada artikel."
          }
        />
      ) : (
        <div className="bg-white rounded-2xl shadow-xl mt-8 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">
              Daftar Artikel ({articles.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <GenericTable
              columns={tableColumns}
              data={articles}
              renderRow={(item, index) => (
                <tr
                  key={item.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  {/* Kolom # */}
                  <td className="px-4 py-3 text-sm text-gray-700 text-center align-top">
                    {index + 1}
                  </td>

                  {/* Kolom Judul */}
                  <td className="px-4 py-3 text-sm text-blue-600 font-medium align-top">
                    <div className="max-w-[240px] lg:max-w-[300px] line-clamp-2 overflow-hidden">
                      {item.title || "N/A"}
                    </div>
                  </td>

                  {/* Kolom Penulis */}
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap align-top">
                    {item.author || "N/A"}
                  </td>

                  {/* Kolom Tanggal */}
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap align-top">
                    {item.date
                      ? new Date(item.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </td>

                  {/* Kolom Konten */}
                  <td className="px-4 py-3 text-sm text-gray-700 align-top">
                    <div className="max-w-[320px] lg:max-w-[450px] line-clamp-3 overflow-hidden">
                      {item.content || "N/A"}
                    </div>
                  </td>

                  {/* Kolom Gambar */}
                  <td className="px-4 py-3 text-center align-top">
                    {item.image_url ? (
                      <a
                        href={item.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <img
                          src={item.image_url}
                          alt="Gambar"
                          className="h-12 w-12 object-cover rounded-lg border border-gray-300 hover:border-blue-400"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/48?text=No+Image";
                          }}
                        />
                      </a>
                    ) : (
                      <span className="text-gray-400 text-xs">N/A</span>
                    )}
                  </td>

                  {/* Kolom Aksi */}
                  <td className="px-4 py-3 text-sm align-top">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        disabled={loading}
                        className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition disabled:opacity-50"
                        title="Edit Artikel"
                      >
                        <AiFillEdit className="text-blue-600 text-lg" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={loading}
                        className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition disabled:opacity-50"
                        title="Hapus Artikel"
                      >
                        <AiFillDelete className="text-red-600 text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}
