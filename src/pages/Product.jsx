import { useState, useEffect, useCallback } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { productAPI } from "../services/productAPI";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import GenericTable from "../components/GenericTable";

// Definisikan initialFormData di luar komponen agar tidak dire-create setiap render
const initialFormData = {
  id: null, // Tambahkan 'id' di initialFormData, default null
  name: "",
  price: 0,
  discount: 0,
  description: "",
  overview: "",
  usage: "",
  ingredients: "",
  details: "",
  vendor: "",
  sku: "",
  size: "",
  image1: "",
  image2: "",
  image3: "",
  tag1: "",
  tag2: "",
  tag3: "",
};

// Komponen utama ProductList
export default function ProductList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [editingProductId, setEditingProductId] = useState(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await productAPI.fetchProduct();
      const sorted = data.sort((a, b) => a.id - b.id);
      setProducts(sorted);
    } catch (err) {
      console.error(
        "Terjadi error saat fetch produk:",
        err.response ? err.response.data : err.message
      );
      let errorMessage = "Gagal memuat data produk. ";
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
    loadProducts();
  }, [loadProducts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["price", "discount"].includes(name)) {
      setFormData({ ...formData, [name]: parseFloat(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.description) {
      setError("Nama, harga, dan deskripsi produk harus diisi.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const productDataToSend = { ...formData };

      for (const key in productDataToSend) {
        if (
          typeof productDataToSend[key] === "string" &&
          productDataToSend[key].trim() === ""
        ) {
          productDataToSend[key] = null;
        }
      }

      // Hapus ID dan created_at jika membuat produk baru
      // ID harus dihapus dari productDataToSend karena ini adalah nilai yang diambil dari form,
      // dan Supabase akan meng-generate ID baru secara otomatis untuk INSERT.
      if (!editingProductId) {
        delete productDataToSend.id; // Pastikan ID tidak dikirim saat membuat baru
        delete productDataToSend.created_at;
      }

      if (editingProductId) {
        await productAPI.updateProduct(editingProductId, productDataToSend);
        setSuccess("Produk berhasil diperbarui!");
      } else {
        await productAPI.createProduct(productDataToSend);
        setSuccess("Produk berhasil ditambahkan!");
      }

      setFormData(initialFormData);
      setEditingProductId(null);
      loadProducts();
    } catch (err) {
      console.error(
        "Terjadi kesalahan saat menyimpan produk:",
        err.response ? err.response.data : err.message
      );
      let errorMessage = "Gagal menyimpan produk. ";
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage += err.response.data.message;
      } else if (err.message) {
        errorMessage += err.message;
      } else {
        errorMessage += "Silakan cek koneksi atau data Anda.";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus produk ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await productAPI.deleteProduct(id);
      setSuccess("Produk berhasil dihapus!");
      loadProducts();
    } catch (err) {
      console.error(
        "Terjadi kesalahan saat menghapus produk:",
        err.response ? err.response.data : err.message
      );
      let errorMessage = "Gagal menghapus produk. ";
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

  const handleEdit = (product) => {
    setFormData({
      id: product.id, // Pastikan ID dimuat ke formData saat edit
      name: product.name || "",
      price: product.price || 0,
      discount: product.discount || 0,
      description: product.description || "",
      overview: product.overview || "",
      usage: product.usage || "",
      ingredients: product.ingredients || "",
      details: product.details || "",
      vendor: product.vendor || "",
      sku: product.sku || "",
      size: product.size || "",
      image1: product.image1 || "",
      image2: product.image2 || "",
      image3: product.image3 || "",
      tag1: product.tag1 || "",
      tag2: product.tag2 || "",
      tag3: product.tag3 || "",
    });
    setEditingProductId(product.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tableColumns = [
    "#",
    "ID",
    "Nama",
    "Harga",
    "Diskon",
    "Deskripsi",
    "Overview",
    "Usage",
    "Ingredients",
    "Details",
    "Vendor",
    "SKU",
    "Size",
    "Created At",
    "Tag1",
    "Tag2",
    "Tag3",
    "Image 1",
    "Image 2",
    "Image 3",
    "Aksi",
  ];

  return (
    <div className="w-full px-6 py-6 space-y-8">
      {/* Bagian Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manajemen Produk</h2>
        <p className="text-gray-600">
          Kelola daftar produk Anda di sini. Tambah, edit, dan hapus produk
          dengan mudah.
        </p>
      </div>

      {/* Bagian Alert (Error/Success) */}
      <div className="space-y-4">
        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}
      </div>

      {/* Bagian Form Tambah/Edit Produk */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          {editingProductId ? "Edit Produk" : "Tambah Produk Baru"}
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Input ID (hanya muncul saat mode edit) */}
          {editingProductId && (
            <div className="lg:col-span-1">
              <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">ID Produk</label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id || ''} // Tampilkan ID atau string kosong jika null
                disabled // ID tidak bisa diedit
                readOnly // Pastikan tidak bisa diedit
                className="w-full p-3 bg-gray-100 rounded-lg border border-gray-200 cursor-not-allowed" // Styling untuk read-only
              />
            </div>
          )}

          {/* Kelompok Input Utama (sesuaikan `col-span` jika ID muncul) */}
          {/* Jika ID muncul, kolom berikutnya mungkin perlu `lg:col-span-1` atau `lg:col-span-2` */}
          {/* Di sini, saya akan asumsikan ID mengambil 1 kolom, jadi sisa kolom utama akan geser */}
          <div className={`${editingProductId ? 'lg:col-span-1' : 'lg:col-span-1'}`}>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Produk <span className="text-red-500">*</span></label>
            <input type="text" id="name" name="name" value={formData.name} placeholder="Nama Produk" disabled={loading} onChange={handleChange} required className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="lg:col-span-1">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Harga <span className="text-red-500">*</span></label>
            <input type="number" id="price" name="price" value={formData.price} placeholder="Harga" disabled={loading} onChange={handleChange} required className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="lg:col-span-1">
            <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">Diskon (%)</label>
            <input type="number" id="discount" name="discount" value={formData.discount} placeholder="Diskon (%)" disabled={loading} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="lg:col-span-1">
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
            <input type="text" id="sku" name="sku" value={formData.sku} placeholder="SKU Produk" disabled={loading} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="lg:col-span-1">
            <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">Ukuran</label>
            <input type="text" id="size" name="size" value={formData.size} placeholder="Ukuran (misal: 100ml)" disabled={loading} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="lg:col-span-1">
            <label htmlFor="vendor" className="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
            <input type="text" id="vendor" name="vendor" value={formData.vendor} placeholder="Vendor Produk" disabled={loading} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500" />
          </div>

          {/* Kelompok Tag Kategori */}
          <div className="lg:col-span-1">
            <label htmlFor="tag1" className="block text-sm font-medium text-gray-700 mb-1">Tag Kategori 1</label>
            <input type="text" id="tag1" name="tag1" value={formData.tag1} placeholder="Tag Kategori 1" disabled={loading} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="lg:col-span-1">
            <label htmlFor="tag2" className="block text-sm font-medium text-gray-700 mb-1">Tag Kategori 2</label>
            <input type="text" id="tag2" name="tag2" value={formData.tag2} placeholder="Tag Kategori 2" disabled={loading} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="lg:col-span-1">
            <label htmlFor="tag3" className="block text-sm font-medium text-gray-700 mb-1">Tag Kategori 3</label>
            <input type="text" id="tag3" name="tag3" value={formData.tag3} placeholder="Tag Kategori 3" disabled={loading} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500" />
          </div>

          {/* Kelompok URL Gambar */}
          <div className="md:col-span-2 lg:col-span-3">
            <label htmlFor="image1" className="block text-sm font-medium text-gray-700 mb-1">URL Gambar 1</label>
            <input type="text" id="image1" name="image1" value={formData.image1} placeholder="URL Gambar Produk 1" disabled={loading} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label htmlFor="image2" className="block text-sm font-medium text-gray-700 mb-1">URL Gambar 2</label>
            <input type="text" id="image2" name="image2" value={formData.image2} placeholder="URL Gambar Produk 2" disabled={loading} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label htmlFor="image3" className="block text-sm font-medium text-gray-700 mb-1">URL Gambar 3</label>
            <input type="text" id="image3" name="image3" value={formData.image3} placeholder="URL Gambar Produk 3" disabled={loading} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500" />
          </div>


          {/* Kelompok Textarea Deskripsi Panjang */}
          <div className="col-span-full">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Produk <span className="text-red-500">*</span></label>
            <textarea id="description" name="description" value={formData.description} placeholder="Deskripsi lengkap produk Anda..." disabled={loading} onChange={handleChange} required rows={4} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="col-span-full">
            <label htmlFor="overview" className="block text-sm font-medium text-gray-700 mb-1">Overview Produk</label>
            <textarea id="overview" name="overview" value={formData.overview} placeholder="Ringkasan singkat tentang produk..." disabled={loading} onChange={handleChange} rows={4} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="col-span-full">
            <label htmlFor="usage" className="block text-sm font-medium text-gray-700 mb-1">Cara Penggunaan</label>
            <textarea id="usage" name="usage" value={formData.usage} placeholder="Petunjuk penggunaan produk..." disabled={loading} onChange={handleChange} rows={4} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="col-span-full">
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">Bahan-bahan</label>
            <textarea id="ingredients" name="ingredients" value={formData.ingredients} placeholder="Daftar bahan-bahan produk..." disabled={loading} onChange={handleChange} rows={4} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="col-span-full">
            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">Detail Produk</label>
            <textarea id="details" name="details" value={formData.details} placeholder="Informasi detail tambahan (Disuplai oleh..., Aman untuk...)" disabled={loading} onChange={handleChange} rows={4} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500" />
          </div>


          {/* Tombol Submit Form */}
          <button
            type="submit"
            disabled={loading}
            className="col-span-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Mohon Tunggu..." : editingProductId ? "Perbarui Produk" : "Tambah Produk"}
          </button>

          {/* Tombol Batal Edit (opsional, jika sedang mode edit) */}
          {editingProductId && (
            <button
              type="button"
              onClick={() => {
                setEditingProductId(null);
                setFormData(initialFormData);
                setError("");
                setSuccess("");
              }}
              disabled={loading}
              className="col-span-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal Edit
            </button>
          )}
        </form>
      </div>

      {/* Bagian Loading, Empty State, atau Tabel Produk */}
      {loading ? (
        <LoadingSpinner text="Memuat data produk..." />
      ) : products.length === 0 ? (
        error ? (
          <EmptyState text="Terjadi kesalahan. Coba lagi nanti." />
        ) : (
          <EmptyState text="Belum ada produk." />
        )
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">Daftar Produk ({products.length})</h3>
          </div>

          <GenericTable
            columns={tableColumns}
            data={products}
            renderRow={(item, index) => (
              <>
                <td className="px-3 py-3 text-sm text-gray-700">{index + 1}.</td>
                <td className="px-3 py-3 text-sm font-mono text-gray-700">{item.id}</td>
                <td className="px-3 py-3 font-semibold text-blue-600 text-sm whitespace-normal">
                  {item.name}
                </td>
                <td className="px-3 py-3 text-sm text-nowrap text-gray-700">
                  {item.price?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td className="px-3 py-3 text-sm text-nowrap text-gray-700">
                  {item.discount}%
                </td>
                <td className="px-3 py-3 text-sm text-gray-700 whitespace-normal">
                  {item.description}
                </td>
                <td className="px-3 py-3 text-sm text-gray-700 whitespace-normal">
                  {item.overview}
                </td>
                <td className="px-3 py-3 text-sm text-gray-700 whitespace-normal">
                  {item.usage}
                </td>
                <td className="px-3 py-3 text-sm text-gray-700 whitespace-normal">
                  {item.ingredients}
                </td>
                <td className="px-3 py-3 text-sm text-gray-700 whitespace-normal">
                  {item.details}
                </td>
                <td className="px-3 py-3 text-sm text-gray-700">{item.vendor}</td>
                <td className="px-3 py-3 text-sm text-gray-700">{item.sku}</td>
                <td className="px-3 py-3 text-sm text-gray-700">{item.size}</td>
                <td className="px-3 py-3 text-sm text-nowrap text-gray-700">
                  {item.created_at
                    ? new Date(item.created_at).toLocaleString("id-ID")
                    : "N/A"}
                </td>
                <td className="px-3 py-3 text-sm text-gray-700">{item.tag1}</td>
                <td className="px-3 py-3 text-sm text-gray-700">{item.tag2}</td>
                <td className="px-3 py-3 text-sm text-gray-700">{item.tag3}</td>
                {/* Gambar Produk */}
                {[item.image1, item.image2, item.image3].map((imgUrl, idx) => (
                  <td key={`image-${idx}`} className="px-3 py-3 text-sm">
                    {imgUrl ? (
                      <img
                        src={
                          imgUrl.startsWith("http")
                            ? imgUrl
                            : `https://ibblbpjrmcaimtbilpeh.supabase.co/storage/v1/object/public/images/${imgUrl}`
                        }
                        alt={`Product ${idx + 1}`}
                        className="h-12 w-12 object-cover rounded-md border border-gray-200"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/48";
                        }}
                      />
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                ))}
                {/* Aksi */}
                <td className="px-3 py-3 text-sm text-nowrap">
                  <button
                    onClick={() => handleEdit(item)}
                    disabled={loading}
                    className="mr-2 p-2 rounded-full hover:bg-blue-100 transition-colors"
                    title="Edit Produk"
                  >
                    <AiFillEdit className="text-blue-500 text-xl" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={loading}
                    className="p-2 rounded-full hover:bg-red-100 transition-colors"
                    title="Hapus Produk"
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