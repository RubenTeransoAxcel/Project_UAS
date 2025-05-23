import { useState, useEffect } from "react";

const FAQForm = ({ onSubmit, initialData }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [priority, setPriority] = useState("Penting, Mendesak");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question || "");
      setAnswer(initialData.answer || "");
      setPriority(initialData.priority || "Penting, Mendesak");
    }
  }, [initialData]);

  const validate = () => {
    if (!question.trim() || !answer.trim()) {
      setError("Pertanyaan dan jawaban wajib diisi");
      return false;
    }
    if (question.length < 5) {
      setError("Pertanyaan harus memiliki minimal 5 karakter");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ question, answer, priority });
      setQuestion("");
      setAnswer("");
      setPriority("Penting, Mendesak");
    }
  };

  return (
    <div className="bg-gradient-to-b from-amber-100 to-white rounded-lg">
    <form className="p-4 border rounded-lg shadow-md hover:shadow-amber-900" onSubmit={handleSubmit}>
      <div>
        <label className="block font-semibold">Pertanyaan:</label>
        <input
          type="text"
          className="w-full p-2 border rounded shadow-lg hover:shadow-amber-900"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <label className="block font-semibold">Jawaban:</label>
        <textarea
          className="w-full p-2 border rounded shadow-lg hover:shadow-amber-900"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>
      </div>
      <div className="mt-2">
        <label className="block font-semibold">Prioritas:</label>
        <select
          className="w-full p-2 border rounded shadow-lg hover:shadow-amber-900"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Penting, Mendesak</option>
          <option>Penting, Tidak Mendesak</option>
          <option>Tidak Penting, Mendesak</option>
          <option>Tidak Penting, Tidak Mendesak</option>
        </select>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:shadow-gray-500"
      >
        Simpan
      </button>
    </form>
    </div>
  );
};

export default FAQForm;