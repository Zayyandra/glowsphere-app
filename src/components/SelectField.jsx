export default function SelectField({ label, name, value, onChange, error, options }) {
    return (
        <div className="mb-4">
            <label className="block font-medium">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border p-2 rounded"
            >
                <option value="">Pilih {label}...</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}
