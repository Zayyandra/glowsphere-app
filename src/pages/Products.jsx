import { useState, useEffect, useCallback } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { productAPI } from "../services/productsAPI";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import GenericTable from "../components/GenericTable";

const initialFormData = {
  id: null,
  name: "",
  price: 0,
  discount: 0,
  overview: "",
  usage: "",
  ingredients: "",
  details: "",
  sku: "",
  size: "",
  tag1: "",
  tag2: "",
  tag3: "",
  image1: "",
  image2: "",
  image3: "",
};

// Kolom yang digunakan di form dan tabel
const fieldsToShow = [
  "name", "price", "discount",
  "overview", "usage", "ingredients", "details",
  "sku", "size", "tag1", "tag2", "tag3",
  "image1", "image2", "image3"
];

const formatCurrency = (val) =>
  typeof val === "number"
    ? val.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
    : val;

export default function Product() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [editingId, setEditingId] = useState(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productAPI.fetchProduct();
      setProducts(data.sort((a, b) => a.id - b.id));
    } catch (err) {
      setError("Gagal memuat data produk: " + (err.message || "Tidak diketahui"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["price", "discount"].includes(name) ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      setError("Nama dan harga wajib diisi.");
      return;
    }

    const productData = {};
    fieldsToShow.forEach((field) => {
      const value = formData[field];
      productData[field] =
        typeof value === "string" && value.trim() === "" ? null : value;
    });

    if (!editingId) delete productData.id;

    try {
      setLoading(true);
      if (editingId) {
        await productAPI.updateProduct(editingId, productData);
        setSuccess("Produk diperbarui.");
      } else {
        await productAPI.createProduct(productData);
        setSuccess("Produk ditambahkan.");
      }

      setFormData(initialFormData);
      setEditingId(null);
      loadProducts();
    } catch (err) {
      setError("Gagal menyimpan produk: " + (err.message || "Tidak diketahui"));
      console.error("Error saving product:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    const filtered = { id: product.id };
    fieldsToShow.forEach((field) => {
      filtered[field] = product[field] || "";
    });
    setFormData({ ...initialFormData, ...filtered });
    setEditingId(product.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    try {
      setLoading(true);
      await productAPI.deleteProduct(id);
      setSuccess("Produk berhasil dihapus.");
      loadProducts();
    } catch (err) {
      setError("Gagal menghapus produk: " + (err.message || "Tidak diketahui"));
    } finally {
      setLoading(false);
    }
  };

  const tableColumns = ["#", ...fieldsToShow.map(f => f.charAt(0).toUpperCase() + f.slice(1)), "Aksi"];

  return (
    <div className="w-full px-6 py-6 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Manajemen Produk</h2>
        <p className="text-gray-600">Tambah, ubah, dan hapus produk.</p>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-6 rounded-2xl shadow-lg"
      >
        {fieldsToShow.map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ")}
            </label>
            {["overview", "usage", "ingredients", "details"].includes(field) ? (
              <textarea
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                disabled={loading}
                rows={3}
                className="w-full p-2 border border-gray-200 rounded"
              />
            ) : (
              <input
                type={["price", "discount"].includes(field) ? "number" : "text"}
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                disabled={loading}
                className="w-full p-2 border border-gray-200 rounded"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="col-span-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {editingId ? "Perbarui Produk" : "Tambah Produk"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setFormData(initialFormData);
              setEditingId(null);
              setError("");
              setSuccess("");
            }}
            className="col-span-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400"
          >
            Batal Edit
          </button>
        )}
      </form>

      {loading ? (
        <LoadingSpinner text="Memuat data produk..." />
      ) : products.length === 0 ? (
        <EmptyState text="Belum ada produk." />
      ) : (
        <GenericTable
          columns={tableColumns}
          data={products}
          renderRow={(item, index) => (
            <>
              <td className="px-3 py-3 text-sm">{index + 1}.</td>
              {fieldsToShow.map((field) => (
                <td key={field} className="px-3 py-3 text-sm text-gray-700">
                  {field.startsWith("image") ? (
                    item[field] ? (
                      <img
                        src={
                          item[field].startsWith("http")
                            ? item[field]
                            : `https://ibblbpjrmcaimtbilpeh.supabase.co/storage/v1/object/public/images/${item[field]}`
                        }
                        alt="img"
                        className="h-10 w-10 rounded object-cover border"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/48";
                        }}
                      />
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )
                  ) : field === "price" ? (
                    formatCurrency(item[field])
                  ) : (
                    item[field]
                  )}
                </td>
              ))}
              <td className="px-3 py-3 text-sm text-nowrap">
                <button
                  onClick={() => handleEdit(item)}
                  className="mr-2 text-blue-500 hover:text-blue-700"
                >
                  <AiFillEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <AiFillDelete />
                </button>
              </td>
            </>
          )}
        />
      )}
    </div>
  );
}
