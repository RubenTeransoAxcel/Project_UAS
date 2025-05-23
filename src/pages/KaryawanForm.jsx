import { useState } from "react";

const KaryawanForm = () => {
  const [form, setForm] = useState({
    "Karyawan ID": "",
    "Name": "",
    "Email": "",
    "Phone": "",
    "Alamat": "",
    "Jabatan": "",
    "Tanggal Masuk": "",
    "Foto": "",
  });

  const handleSubmit = () => {
    console.log("Data karyawan baru:", form);
    alert("Data karyawan berhasil disimpan!");
    // Tambahkan logic kirim data ke backend atau reset form kalau diperlukan
  };

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-lg shadow">
      {Object.keys(form).map((key) => (
        <div key={key} className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">{key}</label>
          <input
            type={key === "Tanggal Masuk" ? "date" : "text"}
            className="border p-2 rounded w-full text-sm"
            placeholder={key}
            value={form[key]}
            readOnly={key === "Karyawan ID"}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="col-span-full bg-hijau text-white py-2 rounded-lg hover:bg-green-700 transition"
      >
        Simpan Data
      </button>
    </div>
  );
};

export default KaryawanForm;
