import { useState, useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { productAPI } from "../services/productAPI"; // Menggunakan productAPI yang sudah ada
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import GenericTable from "../components/GenericTable";

export default function ProductList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [products, setProducts] = useState([]);

  // Menginisialisasi formData dengan semua kolom dari tabel produk Anda
  // KOLOM 'tags' DIHAPUS DARI SINI
  const initialFormData = {
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
    // tags: "", // <-- KOLOM 'tags' DIHAPUS SEPENUHNYA
    image1: "",
    image2: "",
    image3: "",
    tag1: "",
    tag2: "",
    tag3: "", // 'tag3' tetap ada
  };

  const [formData, setFormData] = useState(initialFormData);
  const [editingProductId, setEditingProductId] = useState(null);

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

      // Mengubah string kosong menjadi null untuk kolom yang diizinkan null di Supabase
      // Pastikan kolom numerik 0 tidak diubah menjadi null
      for (const key in productDataToSend) {
        if (typeof productDataToSend[key] === 'string' && productDataToSend[key].trim() === '') {
          productDataToSend[key] = null;
        }
        // Tidak perlu penanganan khusus untuk 0 karena `parseFloat(value) || 0` sudah memastikan angka
      }

      if (!editingProductId) {
        delete productDataToSend.id;
        delete productDataToSend.created_at;
      }

      if (editingProductId) {
        await productAPI.updateProduct(editingProductId, productDataToSend);
        setSuccess("Produk berhasil diperbarui!");
      } else {
        await productAPI.createProduct(productDataToSend);
        setSuccess("Produk berhasil ditambahkan!");
      }

      setFormData(initialFormData); // Reset ke initialFormData
      setEditingProductId(null);
      loadProducts();
    } catch (err) {
      console.error("Terjadi kesalahan saat menyimpan produk:", err.response ? err.response.data : err.message);
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
      console.error("Terjadi kesalahan saat menghapus produk:", err.response ? err.response.data : err.message);
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
    // Memuat data produk ke form untuk diedit
    // KOLOM 'tags' DIHAPUS DARI SINI
    setFormData({
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
      // tags: product.tags || "", // <-- KOLOM 'tags' DIHAPUS
      image1: product.image1 || "",
      image2: product.image2 || "",
      image3: product.image3 || "",
      tag1: product.tag1 || "",
      tag2: product.tag2 || "",
      tag3: product.tag3 || "", // 'tag3' tetap ada
    });
    setEditingProductId(product.id);
  };

  const loadProducts = async () => {
    try {
      console.log("Memulai loadProducts...");
      setLoading(true);
      setError("");
      const data = await productAPI.fetchProduct();
      console.log("Data produk berhasil:", data);

      const sorted = data.sort((a, b) => a.id - b.id);
      setProducts(sorted);
    } catch (err) {
      console.error("Terjadi error saat fetch produk:", err.response ? err.response.data : err.message);
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
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Mendefinisikan kolom untuk GenericTable
  // KOLOM 'tags' DIHAPUS DARI SINI
  const tableColumns = [
    "#", "ID", "Nama", "Harga", "Diskon", "Deskripsi", "Overview", "Usage",
    "Ingredients", "Details", "Vendor", "SKU", "Size", "Created At",
    "Tag1", "Tag2", "Tag3", // 'tag3' ditambahkan, 'tags' dihapus
    "Image 1", "Image 2", "Image 3", "Aksi"
  ];

  return (
    <div className="max-w-full mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Manajemen Produk</h2>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {editingProductId ? "Edit Produk" : "Tambah Produk Baru"}
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Input teks dan number */}
          <input type="text" name="name" value={formData.name} placeholder="Nama Produk" disabled={loading} onChange={handleChange} required className="p-3 bg-gray-50 rounded-lg border border-gray-200" />
          <input type="number" name="price" value={formData.price} placeholder="Harga" disabled={loading} onChange={handleChange} required className="p-3 bg-gray-50 rounded-lg border border-gray-200" />
          <input type="number" name="discount" value={formData.discount} placeholder="Diskon (%)" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200" />
          <input type="text" name="sku" value={formData.sku} placeholder="SKU" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200" />
          <input type="text" name="size" value={formData.size} placeholder="Ukuran (misal: 100ml)" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200" />
          <input type="text" name="vendor" value={formData.vendor} placeholder="Vendor" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200" />
          {/* <input type="text" name="tags" value={formData.tags} placeholder="Tags (koma-separated)" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200" /> <-- KOLOM 'tags' DIHAPUS DARI FORM */}
          <input type="text" name="tag1" value={formData.tag1} placeholder="Tag Kategori 1" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200" />
          <input type="text" name="tag2" value={formData.tag2} placeholder="Tag Kategori 2" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200" />
          <input type="text" name="tag3" value={formData.tag3} placeholder="Tag Kategori 3" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200" /> {/* 'tag3' tetap ada di form */}
          
          {/* Input URL Gambar */}
          <input type="text" name="image1" value={formData.image1} placeholder="URL Gambar 1" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200 col-span-full md:col-span-1" />
          <input type="text" name="image2" value={formData.image2} placeholder="URL Gambar 2" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200 col-span-full md:col-span-1" />
          <input type="text" name="image3" value={formData.image3} placeholder="URL Gambar 3" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200 col-span-full md:col-span-1" />


          {/* Textarea untuk deskripsi panjang */}
          <textarea name="description" value={formData.description} placeholder="Deskripsi Produk" disabled={loading} onChange={handleChange} required rows={3} className="col-span-full p-3 bg-gray-50 rounded-lg border border-gray-200" />
          <textarea name="overview" value={formData.overview} placeholder="Overview Produk" disabled={loading} onChange={handleChange} rows={3} className="col-span-full p-3 bg-gray-50 rounded-lg border border-gray-200" />
          <textarea name="usage" value={formData.usage} placeholder="Cara Penggunaan" disabled={loading} onChange={handleChange} rows={3} className="col-span-full p-3 bg-gray-50 rounded-lg border border-gray-200" />
          <textarea name="ingredients" value={formData.ingredients} placeholder="Bahan-bahan" disabled={loading} onChange={handleChange} rows={3} className="col-span-full p-3 bg-gray-50 rounded-lg border border-gray-200" />
          <textarea name="details" value={formData.details} placeholder="Detail Produk (Disuplai oleh..., Aman untuk...)" disabled={loading} onChange={handleChange} rows={3} className="col-span-full p-3 bg-gray-50 rounded-lg border border-gray-200" />


          <button
            type="submit"
            disabled={loading}
            className="col-span-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all mt-4"
          >
            {loading ? "Mohon Tunggu..." : editingProductId ? "Perbarui Produk" : "Tambah Produk"}
          </button>
        </form>
      </div>

      {loading && <LoadingSpinner text="Memuat data produk..." />}
      {!loading && products.length === 0 && !error && <EmptyState text="Belum ada produk." />}
      {!loading && products.length === 0 && error && <EmptyState text="Terjadi kesalahan. Coba lagi nanti." />}

      {!loading && products.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto mt-10">
          <div className="px-6 py-4">
            <h3 className="text-lg font-semibold">Daftar Produk ({products.length})</h3>
          </div>

          <GenericTable
            columns={tableColumns}
            data={products}
            renderRow={(item, index) => (
              <>
                <td className="px-4 py-3 text-sm">{index + 1}.</td>
                <td className="px-4 py-3 text-sm font-mono">{item.id}</td>
                <td className="px-4 py-3 font-semibold text-blue-600 text-sm max-w-[150px] whitespace-normal">{item.name}</td>
                <td className="px-4 py-3 text-sm text-nowrap">{item.price?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                <td className="px-4 py-3 text-sm text-nowrap">{item.discount}%</td>
                <td className="px-4 py-3 text-sm max-w-[200px] overflow-hidden text-ellipsis" title={item.description}>{item.description}</td>
                <td className="px-4 py-3 text-sm max-w-[200px] overflow-hidden text-ellipsis" title={item.overview}>{item.overview}</td>
                <td className="px-4 py-3 text-sm max-w-[200px] overflow-hidden text-ellipsis" title={item.usage}>{item.usage}</td>
                <td className="px-4 py-3 text-sm max-w-[200px] overflow-hidden text-ellipsis" title={item.ingredients}>{item.ingredients}</td>
                <td className="px-4 py-3 text-sm max-w-[200px] overflow-hidden text-ellipsis" title={item.details}>{item.details}</td>
                <td className="px-4 py-3 text-sm">{item.vendor}</td>
                <td className="px-4 py-3 text-sm">{item.sku}</td>
                <td className="px-4 py-3 text-sm">{item.size}</td>
                <td className="px-4 py-3 text-sm text-nowrap">{item.created_at ? new Date(item.created_at).toLocaleString('id-ID') : 'N/A'}</td>
                {/* KOLOM 'tags' DIHAPUS DARI SINI */}
                <td className="px-4 py-3 text-sm">{item.tag1}</td>
                <td className="px-4 py-3 text-sm">{item.tag2}</td>
                <td className="px-4 py-3 text-sm">{item.tag3}</td> {/* 'tag3' tetap ada di tabel */}
                <td className="px-4 py-3 text-sm">
                  {item.image1 ? (
                    <img src={item.image1.startsWith('http') ? item.image1 : `https://ibblbpjrmcaimtbilpeh.supabase.co/storage/v1/object/public/images/${item.image1}`} alt="Product 1" className="h-12 w-12 object-cover rounded-md" onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/48"; }}/>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm">
                  {item.image2 ? (
                    <img src={item.image2.startsWith('http') ? item.image2 : `https://ibblbpjrmcaimtbilpeh.supabase.co/storage/v1/object/public/images/${item.image2}`} alt="Product 2" className="h-12 w-12 object-cover rounded-md" onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/48"; }}/>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm">
                  {item.image3 ? (
                    <img src={item.image3.startsWith('http') ? item.image3 : `https://ibblbpjrmcaimtbilpeh.supabase.co/storage/v1/object/public/images/${item.image3}`} alt="Product 3" className="h-12 w-12 object-cover rounded-md" onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/48"; }}/>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-nowrap">
                  <button onClick={() => handleEdit(item)} disabled={loading} className="mr-2 p-1">
                    <AiFillEdit className="text-blue-500 text-2xl hover:text-blue-700" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} disabled={loading} className="p-1">
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