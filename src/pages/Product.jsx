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
  
  // Mengubah formData menjadi tag1, tag2, tag3
  const [formData, setFormData] = useState({
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
    tag1: "",
    tag2: "",
    tag3: "",
    image1: "",
    image2: "",
    image3: "",
  });

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
      delete productDataToSend.id;
      delete productDataToSend.created_at;

      for (const key in productDataToSend) {
        if (productDataToSend[key] === "") {
          productDataToSend[key] = null;
        }
      }

      if (editingProductId) {
        await productAPI.updateProduct(editingProductId, productDataToSend);
        setSuccess("Produk berhasil diperbarui!");
      } else {
        await productAPI.createProduct(productDataToSend);
        setSuccess("Produk berhasil ditambahkan!");
      }

      setFormData({
        name: "", price: 0, discount: 0, description: "", overview: "",
        usage: "", ingredients: "", details: "", vendor: "", sku: "",
        size: "", tag1: "", tag2: "", tag3: "", image1: "", image2: "", image3: ""
      });
      setEditingProductId(null);
      loadProducts();
    } catch (err) {
      console.error("Terjadi kesalahan saat menyimpan produk:", err.response ? err.response.data : err.message);
      setError(`Gagal menyimpan produk: ${err.response ? JSON.stringify(err.response.data) : err.message}`);
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
      setError(`Gagal menghapus produk: ${err.response ? JSON.stringify(err.response.data) : err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
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
      tag1: product.tag1 || "",
      tag2: product.tag2 || "",
      tag3: product.tag3 || "",
      image1: product.image1 || "",
      image2: product.image2 || "",
      image3: product.image3 || "",
    });
    setEditingProductId(product.id);
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await productAPI.fetchProduct();
      const sorted = data.sort((a, b) => a.id - b.id);
      setProducts(sorted);
    } catch (err) {
      console.error("Terjadi error saat fetch produk:", err.response ? err.response.data : err.message);
      setError(`Gagal memuat data produk: ${err.response ? JSON.stringify(err.response.data) : err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const tableColumns = [
    "#", "ID", "Nama", "Harga", "Diskon", "Deskripsi", "Overview", "Usage",
    "Ingredients", "Details", "Vendor", "SKU", "Size", "Created At", "Tag 1", "Tag 2", "Tag 3", "Aksi"
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

          {/* Input Tag 1, Tag 2, Tag 3 */}
          <input type="text" name="tag1" value={formData.tag1} placeholder="Tag Kategori 1" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200" />
          <input type="text" name="tag2" value={formData.tag2} placeholder="Tag Kategori 2" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200" />
          <input type="text" name="tag3" value={formData.tag3} placeholder="Tag Kategori 3" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200" />

          {/* Input URL Gambar */}
          <input type="text" name="image1" value={formData.image1} placeholder="URL Gambar 1" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200 col-span-full md:col-span-1" />
          <input type="text" name="image2" value={formData.image2} placeholder="URL Gambar 2" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200 col-span-full md:col-span-1" />

        <input type="text" name="image2" value={formData.image2} placeholder="URL Gambar 2" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200 col-span-full md:col-span-1" />
          <input type="text" name="image3" value={formData.image3} placeholder="URL Gambar 3" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200 col-span-full md:col-span-1" />

          {/* Input Deskripsi & Overview */}
          <textarea name="description" value={formData.description} placeholder="Deskripsi Produk" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200 col-span-full" required></textarea>
          <textarea name="overview" value={formData.overview} placeholder="Overview Produk" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200 col-span-full" ></textarea>

          {/* Input Ingredients & Usage */}
          <textarea name="ingredients" value={formData.ingredients} placeholder="Bahan-Bahan" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200 col-span-full" ></textarea>
          <textarea name="usage" value={formData.usage} placeholder="Cara Penggunaan" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200 col-span-full" ></textarea>

          {/* Input Details */}
          <textarea name="details" value={formData.details} placeholder="Informasi Tambahan" disabled={loading} onChange={handleChange} className="p-3 bg-gray-50 rounded-lg border border-gray-200 col-span-full" ></textarea>

          {/* Tombol Submit */}
          <div className="col-span-full flex justify-end">
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700" disabled={loading}>
              {loading ? <LoadingSpinner /> : (editingProductId ? "Perbarui Produk" : "Tambah Produk")}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Daftar Produk</h3>

        {loading && <LoadingSpinner />}
        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        {products.length === 0 ? (
          <EmptyState message="Tidak ada produk yang ditemukan." />
        ) : (
          <GenericTable
            columns={tableColumns}
            data={products}
            renderRow={(product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.discount}%</td>
                <td>{product.description}</td>
                <td>{product.overview}</td>
                <td>{product.usage}</td>
                <td>{product.ingredients}</td>
                <td>{product.details}</td>
                <td>{product.vendor}</td>
                <td>{product.sku}</td>
                <td>{product.size}</td>
                <td>{new Date(product.created_at).toLocaleString()}</td>
                <td>{product.tag1}</td>
                <td>{product.tag2}</td>
                <td>{product.tag3}</td>
                <td className="flex space-x-3">
                  <button onClick={() => handleEdit(product)} className="text-blue-600">
                    <AiFillEdit />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600">
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            )}
          />
        )}
      </div>
    </div>
  );
}
