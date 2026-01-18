import React from "react";

/*
  data format:
  [{ date: "YYYY-MM-DD" or ISO string, total, count }]
*/

// 🔥 FIX: normalize date to LOCAL calendar day
function toLocalDateOnly(dateStr) {
  const d = new Date(dateStr);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

const getColor = (amount) => {
  if (amount === 0) return "bg-gray-200";
  if (amount < 300) return "bg-green-300";
  if (amount < 800) return "bg-green-500";
  return "bg-green-700";
};

function groupByMonth(data) {
  const map = {};

  data.forEach((d) => {
    const date = toLocalDateOnly(d.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`;

    if (!map[key]) {
      map[key] = {
        label: date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        }),
        days: [],
      };
    }

    map[key].days.push(d);
  });

  // keep only last 2 months
  return Object.values(map).slice(-2);
}

const ExpenseHeatmap = ({ data = [] }) => {
  const months = groupByMonth(data);

  const handleClick = (day) => {
    const date = toLocalDateOnly(day.date);
    alert(
      `Date: ${date.toDateString()}
Spent: ₹${day.total}
Transactions: ${day.count}`
    );
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">
        Daily Spending Heatmap (Last 2 Months)
      </h3>

      {/* MONTHS SIDE BY SIDE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {months.map((month) => (
          <div key={month.label}>
            {/* Month Title */}
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              {month.label}
            </h4>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-[6px]">
              {month.days.map((day) => {
                const date = toLocalDateOnly(day.date);

                return (
                  <div
                    key={day.date}
                    onClick={() => handleClick(day)}
                    title={`${date.toDateString()}
₹${day.total} • ${day.count} expenses`}
                    className={`w-5 h-5 rounded cursor-pointer transition
                      ${getColor(day.total)}
                      hover:ring-1 hover:ring-black`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-6 text-sm text-gray-600">
        <span>Less</span>
        <div className="flex gap-1">
          <span className="w-3 h-3 bg-gray-200 rounded" />
          <span className="w-3 h-3 bg-green-300 rounded" />
          <span className="w-3 h-3 bg-green-500 rounded" />
          <span className="w-3 h-3 bg-green-700 rounded" />
        </div>
        <span>More</span>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Click a day to see details
      </p>
    </div>
  );
};

export default ExpenseHeatmap;
