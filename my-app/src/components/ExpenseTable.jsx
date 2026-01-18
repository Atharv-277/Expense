export default function ExpenseTable() {
  const dummy = [
    { id: 1, title: "Food", amount: 300, date: "2025-01-05" },
    { id: 2, title: "Travel", amount: 120, date: "2025-01-06" },
  ];

  return (
    <table className="w-full bg-white shadow rounded-lg overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-3 text-left">Title</th>
          <th className="p-3 text-left">Amount</th>
          <th className="p-3 text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        {dummy.map((item) => (
          <tr key={item.id} className="border-t">
            <td className="p-3">{item.title}</td>
            <td className="p-3 text-green-600 font-medium">₹{item.amount}</td>
            <td className="p-3">{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
