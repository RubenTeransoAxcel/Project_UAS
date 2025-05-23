import { useState } from "react";
import FAQForm from "./components/FAQForm";
import FAQList from "./components/FAQList";


export default function FAQManager() {

  const [faqs, setFaqs] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentData, setCurrentData] = useState(null);

  const handleSave = (faq) => {
    if (editingIndex !== null) {
      const updatedFaqs = [...faqs];
      updatedFaqs[editingIndex] = faq;
      setFaqs(updatedFaqs);
      setEditingIndex(null);
      setCurrentData(null);
    } else {
      setFaqs([...faqs, faq]);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setCurrentData(faqs[index]);
  };

  const handleDelete = (index) => {
    setFaqs(faqs.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setCurrentData(null);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-emerald-300 to-gray-900">
         <div className="w-[500px] p-6 bg-blue-200 rounded-lg shadow-md">
            <h1 className="text-2xl text-center font-bold mb-4">Manajemen FAQ</h1>
            <FAQForm onSubmit={handleSave} initialData={currentData} />
            <FAQList faqs={faqs} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    </div>
  );
}
