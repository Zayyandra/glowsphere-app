import { useState, useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { articleAPI } from "../services/articleAPI";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import GenericTable from "../components/GenericTable";

export default function Article() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [articles, setArticles] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    text: "",
    created_at: new Date().toISOString(),
  });

  const [editingArticleId, setEditingArticleId] = useState(null);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (editingArticleId) {
        await articleAPI.updateArticle(editingArticleId, formData);
        setSuccess("Artikel berhasil diperbarui!");
      } else {
        await articleAPI.createArticle(formData);
        setSuccess("Artikel berhasil ditambahkan!");
      }

      setFormData({
        title: "",
        author: "",
        text: "",
        created_at: new Date().toISOString(),
      });
      setEditingArticleId(null);
      loadArticles();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus artikel ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await articleAPI.deleteArticle(id);
      loadArticles();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article) => {
    setFormData({
      title: article.title,
      author: article.author,
      text: article.text,
      created_at: article.created_at || new Date().toISOString(),
    });
    setEditingArticleId(article.id);
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await articleAPI.fetchArticles();
      setArticles(data);
    } catch (err) {
      setError("Gagal memuat artikel");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Manajemen Artikel
        </h2>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {editingArticleId ? "Edit Artikel" : "Tambah Artikel Baru"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Judul artikel"
            disabled={loading}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />

          <input
            type="text"
            name="author"
            value={formData.author}
            placeholder="Nama penulis"
            disabled={loading}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <input
            type="text"
            name="text"
            value={formData.text}
            placeholder="Text Artikel"
            disabled={loading}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />

          <input
            type="datetime-local"
            name="created_at"
            value={formData.created_at?.slice(0, 16)}
            disabled={loading}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />

          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
          >
            {loading
              ? "Mohon Tunggu..."
              : editingArticleId
              ? "Perbarui Artikel"
              : "Tambah Artikel"}
          </button>
        </form>
      </div>

      {loading && <LoadingSpinner text="Memuat artikel..." />}

      {!loading && articles.length === 0 && !error && (
        <EmptyState text="Belum ada artikel. Tambahkan artikel pertama!" />
      )}

      {!loading && articles.length === 0 && error && (
        <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
      )}

      {!loading && articles.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto mt-10">
          <div className="px-6 py-4">
            <h3 className="text-lg font-semibold">
              Daftar Artikel ({articles.length})
            </h3>
          </div>

          <GenericTable
            columns={["#", "Judul", "Penulis", "Text", "Tanggal", "Aksi"]}
            data={articles}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-4 font-medium text-gray-700">
                  {index + 1}.
                </td>
                <td className="px-6 py-4 font-semibold text-blue-600 max-w-xs truncate">
                  {item.title}
                </td>
                <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                  {item.author}
                </td>
                <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                  {item.text}
                </td>{" "}
                {/* batas max lebar */}
                <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                  {new Date(item.created_at).toLocaleString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  WIB
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(item)}
                    disabled={loading}
                    className="mr-2"
                  >
                    <AiFillEdit className="text-blue-500 text-2xl hover:text-blue-700 transition-colors" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={loading}
                  >
                    <AiFillDelete className="text-red-400 text-2xl hover:text-red-600 transition-colors" />
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
