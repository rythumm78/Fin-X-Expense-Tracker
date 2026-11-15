
import { useState } from 'react';

function AddExpense() {
  const currentUser = localStorage.getItem('currentUser');

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Expense');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const storageKey = `expenses_${currentUser}`;

    const transactions = JSON.parse(
      localStorage.getItem(storageKey) || '[]'
    );

    const newTransaction = {
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      date
    };

    transactions.push(newTransaction);

    localStorage.setItem(storageKey, JSON.stringify(transactions));

    window.dispatchEvent(new Event('transactionsUpdated'));

    setTitle('');
    setAmount('');
    setType('Expense');
    setCategory('Food');
    setDate(new Date().toISOString().split('T')[0]);
    setMessage('Transaction added successfully!');
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h1>Add Transaction</h1>
        <p className="page-subtitle">Record your income and expenses</p>

        <form onSubmit={handleSubmit}>
          <label>Transaction Title</label>
          <input
            type="text"
            placeholder="e.g. Grocery Shopping"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Amount (₹)</label>
          <input
            type="number"
            placeholder="Enter amount"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <label>Transaction Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>

          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {type === 'Expense' ? (
              <>
                <option>Food</option>
                <option>Travel</option>
                <option>Shopping</option>
                <option>Bills</option>
                <option>Education</option>
                <option>Entertainment</option>
                <option>Other</option>
              </>
            ) : (
              <>
                <option>Salary</option>
                <option>Business</option>
                <option>Freelance</option>
                <option>Investment</option>
                <option>Other</option>
              </>
            )}
          </select>

          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          {message && <p className="success-message">{message}</p>}

          <button className="primary-btn" type="submit">
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddExpense;
