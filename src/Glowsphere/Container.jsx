export default function Container({ children }) {
    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-300">
            <h1 className="text-2xl font-bold text-center text-[#AF1E2D]">Pemrograman Framework Lanjutan</h1>
            <div className="mt-4 mb-6">{children}</div>
            <footer className="text-center text-gray-600 text-sm">
                <p>2025 - Politeknik Caltex Riau</p>
            </footer>
        </div>
    );
}
