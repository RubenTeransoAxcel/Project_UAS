// components/input.jsx
export function Input({ type = "text", placeholder, value, onChange, id = "", className = "" }) {
    return (
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border border-gray-300 rounded-lg p-3 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 ${className}`}
      />
    );
  }
  