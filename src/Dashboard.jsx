 
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [profitView, setProfitView] = useState("monthly");

  useEffect(() => {
    const loadTransactions = () => {
      const saved =
        JSON.parse(localStorage.getItem("expenses")) || [];
      setTransactions(saved);
    };

    loadTransactions();
    window.addEventListener("transactionsUpdated", loadTransactions);

    return () => {
      window.removeEventListener("transactionsUpdated", loadTransactions);
    };
  }, []);

  const formatMoney = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  const isIncome = (item) =>
    String(item.type || "").toLowerCase() === "income";

  const isExpense = (item) =>
    String(item.type || "").toLowerCase() === "expense";

  const incomeTransactions = transactions.filter(isIncome);
  const expenseTransactions = transactions.filter(isExpense);

  const totalIncome = incomeTransactions.reduce(
    (sum, item) => sum + Number(item.amount || 0), 0
  );

  const totalExpense = expenseTransactions.reduce(
    (sum, item) => sum + Number(item.amount || 0), 0
  );

  const balance = totalIncome - totalExpense;

  const savingsRate = totalIncome > 0
    ? ((balance / totalIncome) * 100).toFixed(1)
    : "0.0";

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;

  const monthlyTotal = expenseTransactions
    .filter((item) => item.date?.slice(0, 7) === currentMonth)
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const colors = {
    Food: "#10B981",
    Shopping: "#F97316",
    Bills: "#3B82F6",
    Travel: "#EF4444",
    Entertainment: "#8B5CF6",
    Other: "#94A3B8",
  };

  const categoryTotals = expenseTransactions.reduce((totals, item) => {
    const category = item.category || "Other";
    totals[category] =
      (totals[category] || 0) + Number(item.amount || 0);
    return totals;
  }, {});

  const categories = Object.entries(categoryTotals);
  let percent = 0;

  const chartBackground = totalExpense > 0
    ? `conic-gradient(${categories.map(([category, amount]) => {
        const start = percent;
        percent += (amount / totalExpense) * 100;
        return `${colors[category] || colors.Other} ${start}% ${percent}%`;
      }).join(", ")})`
    : "#334155";

  // Chart ke labels aur date ranges
  const chartLabels = [];
  const chartKeys = [];
  const chartTitle =
    profitView === "weekly" ? "Weekly Net Balance Trend" :
    profitView === "yearly" ? "Yearly Net Balance Trend" :
    "Monthly Net Balance Trend";

  if (profitView === "weekly") {
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      chartLabels.push(
        d.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
      );
      chartKeys.push(
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
      );
    }
  } else if (profitView === "monthly") {
    for (let m = 0; m < 12; m++) {
      chartLabels.push(
        new Date(now.getFullYear(), m, 1).toLocaleDateString("en-IN", {
          month: "short",
        })
      );
      chartKeys.push(
        `${now.getFullYear()}-${String(m + 1).padStart(2, "0")}`
      );
    }
  } else {
    for (let y = now.getFullYear() - 4; y <= now.getFullYear(); y++) {
      chartLabels.push(String(y));
      chartKeys.push(String(y));
    }
  }

  const chartValues = chartKeys.map((key) => {
    const matching = transactions.filter((item) => {
      if (!item.date) return false;
      if (profitView === "weekly") return item.date === key;
      if (profitView === "monthly") return item.date.slice(0, 7) === key;
      return item.date.slice(0, 4) === key;
    });

    return matching.reduce((sum, item) => {
      const amount = Number(item.amount || 0);
      return sum + (isIncome(item) ? amount : isExpense(item) ? -amount : 0);
    }, 0);
  });

  const lineData = {
    labels: chartLabels,
    datasets: [{
      label: "Net balance (Income − Expenses)",
      data: chartValues,
      borderColor: "#38BDF8",
      backgroundColor: "rgba(56, 189, 248, 0.15)",
      fill: true,
      tension: 0.3,
      pointRadius: 4,
    }],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#CBD5E1" } },
      tooltip: {
        callbacks: {
          label: (context) => formatMoney(context.raw),
        },
      },
    },
    scales: {
      x: { ticks: { color: "#94A3B8" }, grid: { color: "#334155" } },
      y: {
        ticks: {
          color: "#94A3B8",
          callback: (value) => `₹${Number(value).toLocaleString("en-IN")}`,
        },
        grid: { color: "#334155" },
      },
    },
  };

  const recentTransactions = [...transactions].sort(
    (a, b) => Number(b.id || 0) - Number(a.id || 0)
  );

  return (
    <div className="container-fluid p-4 min-vh-100"
      style={{ backgroundColor: "#0b1120", color: "#fff" }}>

      <div className="mb-4">
        <h2 className="fw-bold">Financial Dashboard</h2>
        <p className="text-light opacity-75">
          Here's an overview of your financial status.
        </p>
      </div>

      {/* Summary cards */}
      <div className="row g-3 mb-4">
        {[
          ["Total Income", totalIncome, "#22C55E"],
          ["Total Expenses", totalExpense, "#F87171"],
          ["Balance", balance, "#22D3EE"],
          ["Savings Rate", `${savingsRate}%`, "#FBBF24"],
          ["This Month Spending", monthlyTotal, "#FFFFFF"],
        ].map(([label, value, color]) => (
          <div className="col-12 col-sm-6 col-xl" key={label}>
            <div className="card h-100 border-0 rounded-3 text-white"
              style={{ backgroundColor: "#1e293b" }}>
              <div className="card-body">
                <h6 className="text-light opacity-75">{label}</h6>
                <h3 className="fw-bold" style={{ color }}>
                  {typeof value === "number" ? formatMoney(value) : value}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4 mb-4">
        {/* Category chart */}
        <div className="col-12 col-lg-4">
          <div className="card h-100 border-0 rounded-3 p-3 text-white"
            style={{ backgroundColor: "#1e293b" }}>
            <h5 className="fw-bold">Spending by Category</h5>

            <div className="d-flex justify-content-center align-items-center my-4">
              <div style={{
                width: 190, height: 190, borderRadius: "50%",
                background: chartBackground, display: "flex",
                alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  width: 115, height: 115, borderRadius: "50%",
                  backgroundColor: "#1e293b", display: "flex",
                  flexDirection: "column", alignItems: "center",
                  justifyContent: "center",
                }}>
                  <small>Total</small>
                  <strong>{formatMoney(totalExpense)}</strong>
                </div>
              </div>
            </div>

            {categories.length === 0 ? (
              <p className="text-light opacity-50">No expenses added yet.</p>
            ) : categories.map(([category, amount]) => (
              <div key={category}
                className="d-flex justify-content-between mb-2">
                <span>
                  <span style={{ color: colors[category] || colors.Other }}>●</span>{" "}
                  {category}
                </span>
                <strong>
                  {totalExpense > 0
                    ? ((amount / totalExpense) * 100).toFixed(1)
                    : 0}%
                </strong>
              </div>
            ))}
          </div>
        </div>

        {/* Trends chart */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 rounded-3 p-3 text-white"
            style={{ backgroundColor: "#1e293b" }}>
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
              <h5 className="fw-bold mb-0">{chartTitle}</h5>
              <div className="btn-group">
                {["weekly", "monthly", "yearly"].map((view) => (
                  <button key={view}
                    className={`btn btn-sm ${profitView === view ? "btn-info" : "btn-outline-light"}`}
                    onClick={() => setProfitView(view)}>
                    {view[0].toUpperCase() + view.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ height: 320 }}>
              <Line data={lineData} options={lineOptions} />
            </div>
            <small className="text-light opacity-50 mt-2">
              Net balance = Income minus expenses for each period.
            </small>
          </div>
        </div>
      </div>

      {/* All transactions */}
      <div className="card border-0 rounded-3 p-3 p-md-4 text-white"
        style={{ backgroundColor: "#1e293b" }}>
        <h5 className="fw-bold mb-3">All Transactions</h5>

        {recentTransactions.length === 0 ? (
          <p className="text-light opacity-50">No transactions added yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th className="text-end">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((item, index) => (
                  <tr key={item.id ?? index}>
                    <td>{item.title || "Untitled"}</td>
                    <td>{item.category || "Other"}</td>
                    <td>{item.date || "—"}</td>
                    <td>
                      <span className={`badge ${
                        isIncome(item) ? "bg-success" :
                        isExpense(item) ? "bg-danger" : "bg-secondary"
                      }`}>
                        {item.type || "Unknown"}
                      </span>
                    </td>
                    <td className={`text-end fw-bold ${
                      isIncome(item) ? "text-success" :
                      isExpense(item) ? "text-danger" : ""
                    }`}>
                      {isIncome(item) ? "+" : isExpense(item) ? "−" : ""}
                      {formatMoney(item.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
