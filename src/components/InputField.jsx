export default function InputField({ label, type, name, value, onChange, error }) {
    return (
        <div className="mb-4">
            <label className="block font-medium">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border p-2 rounded"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}
