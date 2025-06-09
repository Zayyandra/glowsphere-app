import { useState, useEffect } from "react"
import { AiFillDelete, AiFillEdit } from "react-icons/ai"
import { jobAPI } from "../services/jobAPI"
import AlertBox from "../components/AlertBox"
import LoadingSpinner from "../components/LoadingSpinner"
import EmptyState from "../components/EmptyState"
import GenericTable from "../components/GenericTable"

export default function JobList() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [jobs, setJobs] = useState([])

    const [formData, setFormData] = useState({
        title: "", location: "", type: "", posted_at: new Date().toISOString()
    })

    const [editingJobId, setEditingJobId] = useState(null)

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setFormData({ ...formData, [name]: value })
    }

const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.location || !formData.type) {
        setError("Harap lengkapi semua field!")
        return
    }

    try {
        setLoading(true)
        setError("")
        setSuccess("")

        const submitData = {
            ...formData,
            posted_at: new Date(formData.posted_at).toISOString()
        }

        if (editingJobId) {
            await jobAPI.updateJob(editingJobId, submitData)
            setSuccess("Data pekerjaan berhasil diperbarui!")
        } else {
            await jobAPI.createJob(submitData)
            setSuccess("Data pekerjaan berhasil ditambahkan!")
            console.log("Submit data:", submitData)
        }

        setFormData({ title: "", location: "", type: "", posted_at: new Date().toISOString() })
        setEditingJobId(null)
        loadJobs()

    } catch (err) {
        console.error(err)
        setError(`Terjadi kesalahan: ${err.message}`)
    } finally {
        setLoading(false)
    }
}


    const handleDelete = async (id) => {
        const konfirmasi = confirm("Yakin ingin menghapus data pekerjaan ini?")
        if (!konfirmasi) return

        try {
            setLoading(true)
            setError("")
            setSuccess("")

            await jobAPI.deleteJob(id)
            setSuccess("Data pekerjaan berhasil dihapus!")
            loadJobs()
        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (job) => {
        setFormData({
            title: job.title,
            location: job.location,
            type: job.type,
            posted_at: job.posted_at || new Date().toISOString()
        })
        setEditingJobId(job.id)
    }

          const loadJobs = async () => {
              try {
                  setLoading(true)
                  setError("")
                  const data = await jobAPI.fetchJob()
                  setJobs(data)
              } catch (err) {
                  setError("Gagal memuat artikel")
                  console.error(err)
              } finally {
                  setLoading(false)
              }
          }

    useEffect(() => {
        loadJobs()
    }, [])

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Manajemen Pekerjaan</h2>
            </div>

            {error && <AlertBox type="error">{error}</AlertBox>}
            {success && <AlertBox type="success">{success}</AlertBox>}

            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {editingJobId ? "Edit Data Pekerjaan" : "Tambah Pekerjaan Baru"}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        placeholder="Judul Pekerjaan"
                        disabled={loading}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
                    />

                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        placeholder="Lokasi"
                        disabled={loading}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
                    />

                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        placeholder="Tipe (Full-time, Part-time, dll)"
                        disabled={loading}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
                    />

                    <input
                        type="datetime-local"
                        name="posted_at"
                        value={formData.posted_at?.slice(0, 16)}
                        disabled={loading}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all"
                    >
                        {loading ? "Mohon Tunggu..." : editingJobId ? "Perbarui Data" : "Tambah Pekerjaan"}
                    </button>
                </form>
            </div>

            {loading && <LoadingSpinner text="Memuat data pekerjaan..." />}
            {!loading && jobs.length === 0 && !error && <EmptyState text="Belum ada pekerjaan." />}
            {!loading && jobs.length === 0 && error && <EmptyState text="Terjadi kesalahan. Coba lagi nanti." />}

            {!loading && jobs.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg overflow-x-auto mt-10">
                    <div className="px-6 py-4">
                        <h3 className="text-lg font-semibold">Daftar Pekerjaan ({jobs.length})</h3>
                    </div>

                    <GenericTable
                        columns={["#", "Judul", "Lokasi", "Tipe", "Tanggal Posting", "Aksi"]}
                        data={jobs}
                        renderRow={(item, index) => (
                            <>
                                <td className="px-6 py-4">{index + 1}.</td>
                                <td className="px-6 py-4 font-semibold text-blue-600">{item.title}</td>
                                <td className="px-6 py-4">{item.location}</td>
                                <td className="px-6 py-4">{item.type}</td>
                                <td className="px-6 py-4">
                                    {new Date(item.posted_at).toLocaleString("id-ID", {
                                        day: "numeric", month: "long", year: "numeric",
                                        hour: "2-digit", minute: "2-digit"
                                    })} WIB
                                </td>
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
    )
}
