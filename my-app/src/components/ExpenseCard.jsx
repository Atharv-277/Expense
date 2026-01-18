export default function ExpenseCard({ title, amount }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-green-600 mt-2">₹{amount}</p>
    </div>
  );
}
