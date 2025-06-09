export default function GenericTable({ columns, data, renderRow }) {
    return (
        <div className="overflow-x-auto rounded-2xl shadow-lg">
            <table className="min-w-full text-sm text-left text-gray-800">
                <thead className="text-xs text-white uppercase bg-blue-600">
                    <tr>
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className="px-6 py-4 font-semibold tracking-wider whitespace-nowrap"
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr
                                key={index}
                                className="hover:bg-blue-50 transition-colors duration-150"
                            >
                                {renderRow(item, index)}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="text-center py-8 text-gray-400 italic"
                            >
                                Tidak ada data tersedia
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
