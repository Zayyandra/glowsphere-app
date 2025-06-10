import { useState, useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { faqAPI } from "../services/faqAPI";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import GenericTable from "../components/GenericTable";

export default function FaqList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [faqs, setFaqs] = useState([]);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  const [editingFaqId, setEditingFaqId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) {
      setError("Harap isi pertanyaan dan jawaban.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (editingFaqId) {
        await faqAPI.updateFaq(editingFaqId, formData);
        setSuccess("FAQ berhasil diperbarui!");
      } else {
        await faqAPI.createFaq(formData);
        setSuccess("FAQ berhasil ditambahkan!");
      }

      setFormData({ question: "", answer: "" });
      setEditingFaqId(null);
      loadFaqs();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus FAQ ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await faqAPI.deleteFaq(id);
      setSuccess("FAQ berhasil dihapus!");
      loadFaqs();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (faq) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
    });
    setEditingFaqId(faq.id);
  };

const loadFaqs = async () => {
  try {
    console.log("Memulai loadFaqs...");
    setLoading(true);
    setError("");
    const data = await faqAPI.fetchFaq();
    console.log("Data berhasil:", data);

    // Urutkan berdasarkan ID ASCENDING
    const sorted = data.sort((a, b) => a.id - b.id);

    setFaqs(sorted);
  } catch (err) {
    console.error("Terjadi error saat fetch:", err);
    setError("Gagal memuat data FAQ.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadFaqs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Manajemen FAQ</h2>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {editingFaqId ? "Edit FAQ" : "Tambah FAQ Baru"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="question"
            value={formData.question}
            placeholder="Pertanyaan"
            disabled={loading}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />

          <textarea
            name="answer"
            value={formData.answer}
            placeholder="Jawaban"
            disabled={loading}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all"
          >
            {loading ? "Mohon Tunggu..." : editingFaqId ? "Perbarui FAQ" : "Tambah FAQ"}
          </button>
        </form>
      </div>

      {loading && <LoadingSpinner text="Memuat data FAQ..." />}
      {!loading && faqs.length === 0 && !error && <EmptyState text="Belum ada FAQ." />}
      {!loading && faqs.length === 0 && error && <EmptyState text="Terjadi kesalahan. Coba lagi nanti." />}

      {!loading && faqs.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto mt-10">
          <div className="px-6 py-4">
            <h3 className="text-lg font-semibold">Daftar FAQ ({faqs.length})</h3>
          </div>

          <GenericTable
            columns={["#", "Pertanyaan", "Jawaban", "Aksi"]}
            data={faqs}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-4">{index + 1}.</td>
                <td className="px-6 py-4 font-semibold text-blue-600">{item.question}</td>
                <td className="px-6 py-4">{item.answer}</td>
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
