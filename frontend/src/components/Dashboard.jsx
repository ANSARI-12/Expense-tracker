import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard({
  onLogout,
  transactions,
  fetchTransactions,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    notes: "",
  });
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    notes: "",
  });
  const navigate = useNavigate();

  // Use transactions from props
  const data = transactions || [];

  const total = data.reduce((a, b) => a + Number(b.amount), 0);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/login");
  };

  // New transaction form handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/transactions", formData);
      setFormData({ title: "", amount: "", category: "", date: "", notes: "" });
      // Use the shared fetch function to refresh all components
      fetchTransactions();
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await api.delete(`/transactions/${id}`);
        // Use the shared fetch function to refresh all components
        fetchTransactions();
      } catch (err) {
        console.error("Error deleting transaction:", err);
        alert("Failed to delete transaction");
      }
    }
  };

  const handleEdit = (transaction) => {
    setEditingId(transaction._id);
    setEditForm({
      title: transaction.title || "",
      amount: transaction.amount || "",
      category: transaction.category || "",
      date: transaction.date ? transaction.date.split("T")[0] : "",
      notes: transaction.notes || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({
      title: "",
      amount: "",
      category: "",
      date: "",
      notes: "",
    });
  };

  const handleUpdate = async (id) => {
    try {
      await api.put(`/transactions/${id}`, editForm);
      setEditingId(null);
      // Use the shared fetch function to refresh all components
      fetchTransactions();
    } catch (err) {
      console.error("Error updating transaction:", err);
      alert("Failed to update transaction");
    }
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="dashboard-container">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <h2 className="total-expenses">
        Total Expenses: ₹{total.toLocaleString("en-IN")}
      </h2>

      <h3 className="recent-transactions">Recent Transactions</h3>

      <div className="transaction-list">
        {data.length > 0 ? (
          data.slice(0, 10).map((t) => (
            <div key={t._id} className="transaction-item">
              {editingId === t._id ? (
                <div className="edit-form">
                  <input
                    name="title"
                    placeholder="Title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    className="form-input"
                  />
                  <input
                    name="amount"
                    type="number"
                    placeholder="Amount"
                    value={editForm.amount}
                    onChange={handleEditChange}
                    className="form-input"
                  />
                  <input
                    name="category"
                    placeholder="Category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    className="form-input"
                  />
                  <input
                    name="date"
                    type="date"
                    value={editForm.date}
                    onChange={handleEditChange}
                    className="form-input"
                  />
                  <textarea
                    name="notes"
                    placeholder="Notes"
                    value={editForm.notes}
                    onChange={handleEditChange}
                    className="form-input"
                  />
                  <div className="form-buttons">
                    <button
                      className="save-btn"
                      onClick={() => handleUpdate(t._id)}
                    >
                      Save
                    </button>
                    <button className="cancel-btn" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="transaction-title">
                    {t.title || "Untitled"} — ₹
                    {(t.amount || 0).toLocaleString("en-IN")}
                  </div>

                  <div className="transaction-details">
                    Tag: {t.category || "General"} | Date:{" "}
                    {t.date
                      ? new Date(t.date).toLocaleDateString("en-IN") || "N/A"
                      : "N/A"}
                  </div>

                  {t.notes && (
                    <div className="transaction-notes">Note: {t.notes}</div>
                  )}

                  <div className="action-buttons">
                    <button className="edit-btn" onClick={() => handleEdit(t)}>
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(t._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-transactions">
            No transactions found. Start adding some!
          </p>
        )}
      </div>
    </div>
  );
}
