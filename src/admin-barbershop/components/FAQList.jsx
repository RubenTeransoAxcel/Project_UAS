const FAQList = ({ faqs, onEdit, onDelete }) => (
    <div className="mt-4 space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="p-4 border rounded-lg shadow">
          <h3 className="font-semibold">{faq.question}</h3>
          <p>{faq.answer}</p>
          <p className="text-sm text-gray-500">Prioritas: {faq.priority}</p>
          <div className="mt-2 space-x-2">
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              onClick={() => onEdit(index)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => onDelete(index)}
            >
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );

export default FAQList;