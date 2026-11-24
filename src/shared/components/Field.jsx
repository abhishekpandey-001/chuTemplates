export default function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea = false,
}) {
  const base =
    "w-full rounded-xl border-2 border-pink-100 bg-pink-50/50 px-4 py-3 text-pink-700 placeholder-pink-300 outline-none focus:border-pink-400";

  return (
    <label className="mb-4 block">
      <span className="mb-1 block text-sm font-semibold text-pink-600">
        {label}
      </span>
      {textarea ? (
        <textarea
          rows={4}
          className={base}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={base}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}