// components/Button.jsx
export function Button({ children, onClick, type = "button", className = "" }) {
    return (
      <button
        onClick={onClick}
        type={type}
        className={`px-4 py-2 w-full rounded-lg text-white bg-green-500 hover:bg-green-600 font-semibold transition duration-300 ${className}`}
      >
        {children}
      </button>
    );
  }
  