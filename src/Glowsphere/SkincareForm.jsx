import { useState } from "react";

export default function SkincareForm() {
    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        jenisKulit: "",
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        let newErrors = {};

        // Validasi Nama (harus huruf semua, tidak boleh kosong)
        if (!formData.nama.trim()) {
            newErrors.nama = "Nama wajib diisi.";
        } else if (!/^[A-Za-z\s]+$/.test(formData.nama)) {
            newErrors.nama = "Nama hanya boleh berisi huruf dan spasi.";
        }

        // Validasi Email (harus diisi dan diakhiri @gmail.com)
        if (!formData.email.trim()) {
            newErrors.email = "Email wajib diisi.";
        } else if (!/^[\w-.]+@gmail\.com$/.test(formData.email)) {
            newErrors.email = "Email harus berakhir dengan @gmail.com.";
        }

        // Validasi Jenis Kulit (wajib dipilih)
        if (!formData.jenisKulit) {
            newErrors.jenisKulit = "Jenis kulit wajib dipilih.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            alert("Informasi yang diisi error atau tidak sesuai ketentuan!");
        }

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setSubmitted(true);
            alert("Formulir berhasil dikirim!");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Formulir Glowsphere Skincare</h2>

            {/* Conditional Rendering untuk menampilkan pesan sukses */}
            {submitted ? (
                <div className="text-green-600 text-center font-semibold">
                    ✅ Formulir berhasil dikirim! Terima kasih telah mengisi.
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {/* Nama */}
                    <div className="mb-4">
                        <label className="block font-medium">Nama</label>
                        <input
                            type="text"
                            name="nama"
                            value={formData.nama}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                        {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {/* Jenis Kulit */}
                    <div className="mb-4">
                        <label className="block font-medium">Jenis Kulit</label>
                        <select
                            name="jenisKulit"
                            value={formData.jenisKulit}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">Pilih Jenis Kulit...</option>
                            <option value="Kering">Kering</option>
                            <option value="Berminyak">Berminyak</option>
                            <option value="Sensitif">Sensitif</option>
                        </select>
                        {errors.jenisKulit && <p className="text-red-500 text-sm">{errors.jenisKulit}</p>}
                    </div>

                    {/* Tombol Submit hanya muncul jika semua input valid */}
                    {Object.keys(errors).length === 0 &&
                        formData.nama &&
                        formData.email &&
                        formData.jenisKulit && (
                            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">
                                Submit
                            </button>
                        )}
                </form>
            )}
        </div>
    );
}