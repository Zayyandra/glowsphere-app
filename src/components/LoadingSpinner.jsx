export default function LoadingSpinner({ text = "Memuat..." }) {
    return (
        <div className="p-8 text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            {text}
        </div>
    )
}
