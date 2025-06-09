import { useState, useEffect } from "react"
import { AiFillDelete, AiFillEdit } from "react-icons/ai"
import { teamAPI } from "../services/teamAPI"
import AlertBox from "../components/AlertBox"
import LoadingSpinner from "../components/LoadingSpinner"
import EmptyState from "../components/EmptyState"
import GenericTable from "../components/GenericTable"

export default function Team() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [teams, setTeams] = useState([])

    const [formData, setFormData] = useState({
        name: "", role: "", email: "", joined_at: new Date().toISOString()
    })

    const [editingTeamId, setEditingTeamId] = useState(null)

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.name || !formData.role || !formData.email) {
            setError("Harap lengkapi semua field!")
            return
        }

        try {
            setLoading(true)
            setError("")
            setSuccess("")

            if (editingTeamId) {
                await teamAPI.updateTeam(editingTeamId, formData)
                setSuccess("Data tim berhasil diperbarui!")
            } else {
                await teamAPI.createTeam(formData)
                setSuccess("Data tim berhasil ditambahkan!")
            }

            setFormData({ name: "", role: "", email: "", joined_at: new Date().toISOString() })
            setEditingTeamId(null)
            loadTeams()

        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        const konfirmasi = confirm("Yakin ingin menghapus data tim ini?")
        if (!konfirmasi) return

        try {
            setLoading(true)
            setError("")
            setSuccess("")

            await teamAPI.deleteTeam(id)
            setSuccess("Data tim berhasil dihapus!")
            loadTeams()
        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (team) => {
        setFormData({
            name: team.name,
            role: team.role,
            email: team.email,
            joined_at: team.joined_at || new Date().toISOString()
        })
        setEditingTeamId(team.id)
    }

        const loadTeams = async () => {
            try {
                setLoading(true)
                setError("")
                const data = await teamAPI.fetchTeam()
                setTeams(data)
            } catch (err) {
                setError("Gagal memuat artikel")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

    useEffect(() => {
        loadTeams()
    }, [])

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Manajemen Tim</h2>
            </div>

            {error && <AlertBox type="error">{error}</AlertBox>}
            {success && <AlertBox type="success">{success}</AlertBox>}

            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {editingTeamId ? "Edit Data Tim" : "Tambah Anggota Tim"}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Nama Lengkap"
                        disabled={loading}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
                    />

                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        placeholder="Role"
                        disabled={loading}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
                    />

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Email"
                        disabled={loading}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
                    />

                    <input
                        type="datetime-local"
                        name="joined_at"
                        value={formData.joined_at?.slice(0, 16)}
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
                        {loading ? "Mohon Tunggu..." : editingTeamId ? "Perbarui Data" : "Tambah Tim"}
                    </button>
                </form>
            </div>

            {loading && <LoadingSpinner text="Memuat data tim..." />}
            {!loading && teams.length === 0 && !error && <EmptyState text="Belum ada anggota tim." />}
            {!loading && teams.length === 0 && error && <EmptyState text="Terjadi kesalahan. Coba lagi nanti." />}

            {!loading && teams.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg overflow-x-auto mt-10">
                    <div className="px-6 py-4">
                        <h3 className="text-lg font-semibold">Daftar Tim ({teams.length})</h3>
                    </div>

                    <GenericTable
                        columns={["#", "Nama", "Role", "Email", "Bergabung", "Aksi"]}
                        data={teams}
                        renderRow={(item, index) => (
                            <>
                                <td className="px-6 py-4">{index + 1}.</td>
                                <td className="px-6 py-4 font-semibold text-blue-600">{item.name}</td>
                                <td className="px-6 py-4">{item.role}</td>
                                <td className="px-6 py-4">{item.email}</td>
                                <td className="px-6 py-4">
                                    {new Date(item.joined_at).toLocaleString("id-ID", {
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
