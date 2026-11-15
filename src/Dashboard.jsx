
import { useEffect, useState } from 'react';

function Dashboard() {
  const currentUser = localStorage.getItem('currentUser');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = () => {
      const data = JSON.parse(
        localStorage.getItem(`expenses_${currentUser}`) || '[]'
      );
      setTransactions(data);
    };

    loadTransactions();

    window.addEventListener('transactionsUpdated', loadTransactions);

    return () => {
      window.removeEventListener('transactionsUpdated', loadTransactions);
    };
  }, [currentUser]);

  const income = transactions
    .filter(item => item.type === 'Income')
    .reduce((total, item) => total + Number(item.amount), 0);

  const expense = transactions
    .filter(item => item.type === 'Expense')
    .reduce((total, item) => total + Number(item.amount), 0);

  const balance = income - expense;

  const formatMoney = value =>
    `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

  // Category-wise expense calculation
  const categoryTotals = {};

  transactions
    .filter(item => item.type === 'Expense')
    .forEach(item => {
      categoryTotals[item.category] =
        (categoryTotals[item.category] || 0) + Number(item.amount);
    });

  const colors = [
    '#22c55e',
    '#3b82f6',
    '#f59e0b',
    '#ef4444',
    '#a855f7',
    '#06b6d4',
    '#ec4899'
  ];

  const categories = Object.entries(categoryTotals);
  let currentAngle = 0;

  const gradientParts = categories.map(([category, amount], index) => {
    const percentage = expense > 0 ? (amount / expense) * 100 : 0;
    const start = currentAngle;
    currentAngle += percentage * 3.6;

    return `${colors[index % colors.length]} ${start}deg ${currentAngle}deg`;
  });

  const chartGradient = expense > 0
    ? `conic-gradient(${gradientParts.join(', ')})`
    : '#334155';

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="page-subtitle">Welcome, {currentUser}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Income</p>
          <h2 className="income-text">{formatMoney(income)}</h2>
        </div>

        <div className="stat-card">
          <p>Total Expenses</p>
          <h2 className="expense-text">{formatMoney(expense)}</h2>
        </div>

        <div className="stat-card">
          <p>Available Balance</p>
          <h2>{formatMoney(balance)}</h2>
        </div>
      </div>

      {/* Circular Expense Graph */}
      <div className="chart-card">
        <h2>Expense Breakdown</h2>
        <p className="chart-subtitle">Category-wise expenses</p>

        <div className="chart-content">
          <div
            className="pie-chart"
            style={{ background: chartGradient }}
          >
            <div className="pie-chart-center">
              <span>Total Expense</span>
              <strong>{formatMoney(expense)}</strong>
            </div>
          </div>

          <div className="chart-legend">
            {categories.length === 0 ? (
              <p>No expense data available yet.</p>
            ) : (
              categories.map(([category, amount], index) => (
                <div className="legend-item" key={category}>
                  <span
                    className="legend-color"
                    style={{
                      background: colors[index % colors.length]
                    }}
                  ></span>

                  <span>{category}</span>

                  <strong>{formatMoney(amount)}</strong>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="transactions-card">
        <h2>Recent Transactions</h2>

        {transactions.length === 0 ? (
          <p className="empty-message">
            No transactions yet. Add your first transaction!
          </p>
        ) : (
          <div className="transaction-list">
            {[...transactions].reverse().map(item => (
              <div className="transaction-row" key={item.id}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.category} • {item.date}</p>
                </div>

                <strong className={
                  item.type === 'Income' ? 'income-text' : 'expense-text'
                }>
                  {item.type === 'Income' ? '+' : '-'}
                  {formatMoney(Number(item.amount))}
                </strong>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
