import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Explorer.css";

export default function Explorer({ transactions, fetchTransactions }) {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  // Use transactions from props when available, otherwise fetch internally
  useEffect(() => {
    if (transactions && transactions.length > 0) {
      setList(transactions);
    } else {
      fetchTransactions();
    }
  }, [transactions]);

  // Search functionality - filters from the transactions list
  const handleSearch = async () => {
    if (search.trim()) {
      try {
        const res = await api.get(`/transactions?search=${search}`);
        setList(res.data);
      } catch (err) {
        console.error("Search failed:", err);
      }
    } else {
      // If search is empty, use all transactions from props
      if (transactions) {
        setList(transactions);
      } else {
        fetchTransactions();
      }
    }
  };

  return (
    <div className="explorer-container">
      <h3>Transaction Explorer</h3>

      <div className="search-controls">
        <input
          className="explorer-input"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="explorer-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {list.length === 0 && <p className="no-results">No results</p>}

      <div className="explorer-list">
        {list.map((t) => (
          <div key={t._id} className="explorer-item">
            <div className="item-title">
              {t.title} — <span className="item-amount">₹{t.amount}</span>
            </div>
            <div className="item-meta">
              Tag: {t.category} | Date:{" "}
              {t.date ? new Date(t.date).toLocaleDateString("en-IN") : "N/A"}
            </div>
            {t.notes && <p className="item-note">Note: {t.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
