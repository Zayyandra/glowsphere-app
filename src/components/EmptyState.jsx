import { BsDatabaseExclamation } from "react-icons/bs";
export default function EmptyState({ text = "Belum ada data tersedia untuk saat ini" }) {
    return (
        <div className="p-8 text-center text-gray-400">
            <div className="text-5xl mb-2 text-amber-500">
                <BsDatabaseExclamation />
            </div>
            <p>{text}</p>
        </div>
    )
}