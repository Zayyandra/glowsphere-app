export default function AlertBox({ type = "info", children }) {
    const baseClass = "px-4 py-3 rounded-2xl mb-6 shadow-md border text-sm font-medium"

    const styles = {
        success: "bg-blue-50 border-blue-300 text-blue-800",
        error: "bg-red-50 border-red-300 text-red-800",
        info: "bg-blue-50 border-blue-300 text-blue-800",
        warning: "bg-yellow-50 border-yellow-300 text-yellow-800"
    }

    return (
        <div className={`${baseClass} ${styles[type] || styles.info}`}>
            {children}
        </div>
    )
}
