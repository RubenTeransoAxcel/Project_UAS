export default function GenericTable({ columns, data, renderRow }) {
  return (
    <table className="min-w-full table-fixed divide-y divide-gray-200 overflow-hidden rounded-2xl shadow-lg">
      <thead className="text-white bg-hijau">
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} className="px-6 py-3 text-left text-sm font-medium tracking-wider">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-800">
        {data.map((item, index) => renderRow(item, index))}
      </tbody>
    </table>
  );
}
