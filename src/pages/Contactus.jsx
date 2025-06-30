import { useState, useEffect, useCallback } from "react";
// No need for AiFillDelete, AiFillEdit as admin can only read
// No need for productAPI, will use contactusAPI
import { contactusAPI } from "../services/contactusAPI"; // Assuming you have this file
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import GenericTable from "../components/GenericTable";

// The initialFormData and form-related states/functions are removed
// as the admin will only be viewing messages, not submitting forms.

// Komponen utama ContactUsList
export default function ContactUsList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]); // Renamed from 'products' to 'messages'

  const loadMessages = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await contactusAPI.fetchContactus();
      // Sort messages by created_at in descending order (latest first)
      const sorted = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setMessages(sorted);
    } catch (err) {
      console.error(
        "Terjadi error saat fetch pesan kontak:",
        err.response ? err.response.data : err.message
      );
      let errorMessage = "Gagal memuat data pesan kontak. ";
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage += err.response.data.message;
      } else if (err.message) {
        errorMessage += err.message;
      } else {
        errorMessage += "Silakan cek koneksi atau URL API Anda.";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // Removed handleChange, handleSubmit, handleDelete, handleEdit functions
  // as they are not needed for a read-only view.

  const tableColumns = [
    "#",
    "ID",
    "Nama",
    "Email",
    "Pesan",
    "Tanggal Dibuat",
  ];

  return (
    <div className="w-full px-6 py-6 space-y-8">
      {/* Bagian Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Pesan Kontak Masuk</h2>
        <p className="text-gray-600">
          Lihat semua pesan yang dikirimkan melalui formulir kontak.
        </p>
      </div>

      {/* Bagian Alert (Error) */}
      <div className="space-y-4">
        {error && <AlertBox type="error">{error}</AlertBox>}
        {/* Success alert is removed as there are no success actions (create/update/delete) */}
      </div>

      {/* Removed the form section completely */}

      {/* Bagian Loading, Empty State, atau Tabel Pesan */}
      {loading ? (
        <LoadingSpinner text="Memuat data pesan..." />
      ) : messages.length === 0 ? (
        error ? (
          <EmptyState text="Terjadi kesalahan. Coba lagi nanti." />
        ) : (
          <EmptyState text="Belum ada pesan masuk." />
        )
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">Daftar Pesan ({messages.length})</h3>
          </div>

          <GenericTable
            columns={tableColumns}
            data={messages}
            renderRow={(item, index) => (
              <>
                <td className="px-3 py-3 text-sm text-gray-700">{index + 1}.</td>
                <td className="px-3 py-3 text-sm font-mono text-gray-700">{item.id}</td>
                <td className="px-3 py-3 font-semibold text-gray-800 text-sm whitespace-nowrap">
                  {item.name}
                </td>
                <td className="px-3 py-3 text-sm text-blue-600 whitespace-nowrap">
                  <a href={`mailto:${item.email}`} className="hover:underline">{item.email}</a>
                </td>
                <td className="px-3 py-3 text-sm text-gray-700 whitespace-normal max-w-lg">
                  {item.message}
                </td>
                <td className="px-3 py-3 text-sm text-nowrap text-gray-700">
                  {item.created_at
                    ? new Date(item.created_at).toLocaleString("id-ID")
                    : "N/A"}
                </td>
                {/* Removed Action buttons (Edit/Delete) */}
              </>
            )}
          />
        </div>
      )}
    </div>
  );
}