import { useState, useEffect, useCallback } from "react";
import { bookingAPI } from "../services/bookingAPI";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import GenericTable from "../components/GenericTable";

export default function BookingList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState([]);

  const loadBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await bookingAPI.fetchBooking();
    const sorted = data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      setBookings(sorted);
    } catch (err) {
      let errorMessage = "Gagal memuat data booking. ";
      if (err.response?.data?.message) {
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
    loadBookings();
  }, [loadBookings]);

  const tableColumns = [
    "#", "ID", "Nama", "Email", "Tanggal Booking", "Waktu", "Produk", "Jumlah", "Total Harga", "Catatan", "Tanggal Dibuat"
  ];

  return (
    <div className="w-full px-6 py-6 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Daftar Booking Produk</h2>
        <p className="text-gray-600">Lihat semua data pemesanan produk yang masuk.</p>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}

      {loading ? (
        <LoadingSpinner text="Memuat data booking..." />
      ) : bookings.length === 0 ? (
        error ? (
          <EmptyState text="Terjadi kesalahan. Coba lagi nanti." />
        ) : (
          <EmptyState text="Belum ada data booking." />
        )
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">Total Booking: {bookings.length}</h3>
          </div>

          <GenericTable
            columns={tableColumns}
            data={bookings}
            renderRow={(item, index) => (
              <>
                <td className="px-3 py-3 text-sm">{index + 1}.</td>
                <td className="px-3 py-3 text-sm font-mono">{item.id}</td>
                <td className="px-3 py-3 text-sm">{item.name}</td>
                <td className="px-3 py-3 text-sm text-blue-600">
                  <a href={`mailto:${item.email}`} className="hover:underline">{item.email}</a>
                </td>
                <td className="px-3 py-3 text-sm">{item.date || "—"}</td>
                <td className="px-3 py-3 text-sm">{item.time || "—"}</td>
                <td className="px-3 py-3 text-sm">{item.product || "—"}</td>
                <td className="px-3 py-3 text-sm">{item.quantity || 1}</td>
                <td className="px-3 py-3 text-sm font-semibold text-gray-800">
                  {item.total_price
                    ? `Rp${Number(item.total_price).toLocaleString("id-ID")}`
                    : "Rp0"}
                </td>
                <td className="px-3 py-3 text-sm max-w-md whitespace-normal">
                  {item.notes || <span className="text-gray-400 italic">Tidak ada</span>}
                </td>
                <td className="px-3 py-3 text-sm text-nowrap text-gray-500">
                  {item.created_at
                    ? new Date(item.created_at).toLocaleString("id-ID")
                    : "—"}
                </td>
              </>
            )}
          />
        </div>
      )}
    </div>
  );
}
