
import { useState } from "react";

function AddExpense() {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    type: "Expense",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedExpenses =
      JSON.parse(localStorage.getItem("expenses")) || [];

    const newTransaction = {
      id: Date.now(),
      title: expense.title,
      amount: Number(expense.amount),
      type: expense.type,
      category:
        expense.type === "Income"
          ? "Other"
          : expense.category,
      date: expense.date,
    };

    savedExpenses.push(newTransaction);

    localStorage.setItem(
      "expenses",
      JSON.stringify(savedExpenses)
    );

    // Dashboard ko update karna
    window.dispatchEvent(
      new Event("transactionsUpdated")
    );

    alert(`${expense.type} Added Successfully!`);

    setExpense({
      title: "",
      amount: "",
      type: "Expense",
      category: "",
      date: "",
    });
  };

  return (
    <div className="expense-form-container">
      <h2>Add New Transaction</h2>

      <form
        onSubmit={handleSubmit}
        className="expense-form"
      >
        {/* Transaction Type */}
        <div className="input-group">
          <label>Transaction Type</label>

          <select
            name="type"
            value={expense.type}
            onChange={handleChange}
            required
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
        </div>

        {/* Title */}
        <div className="input-group">
          <label>
            {expense.type === "Income"
              ? "Income Title"
              : "Expense Title"}
          </label>

          <input
            type="text"
            name="title"
            placeholder={
              expense.type === "Income"
                ? "e.g. Salary, Freelancing"
                : "e.g. Rent, Groceries, Swiggy"
            }
            value={expense.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Amount */}
        <div className="input-group">
          <label>Amount (₹)</label>

          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={expense.amount}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
        </div>

        {/* Category: Expense only */}
        {expense.type === "Expense" && (
          <div className="input-group">
            <label>Category</label>

            <select
              name="category"
              value={expense.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Food">Food & Dining</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills & Utilities</option>
              <option value="Travel">Travel / Fuel</option>
              <option value="Entertainment">
                Entertainment
              </option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}

        {/* Date */}
        <div className="input-group">
          <label>Date</label>

          <input
            type="date"
            name="date"
            value={expense.date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add {expense.type}
        </button>
      </form>
    </div>
  );
}

export default AddExpense;
