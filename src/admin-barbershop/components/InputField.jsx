import React from "react";

const InputField = ({ label, value, onChange, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-lg font-semibold mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;