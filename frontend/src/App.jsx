import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import api from "./api/axios";
import Dashboard from "./components/Dashboard";
import Explorer from "./components/Explorer";
import TransactionForm from "./components/TransactionForm";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [transactions, setTransactions] = useState([]);

  // Handle logout - this function will be passed to Dashboard
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // Shared function to fetch transactions - used by all components
  const fetchTransactions = async () => {
    try {
      const res = await api.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  // Fetch transactions on mount when token exists
  useEffect(() => {
    if (token) {
      fetchTransactions();
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/login" />}
        />

        <Route
          path="/"
          element={
            token ? (
              <div>
                <h1>Expense Tracker</h1>
                <TransactionForm refresh={fetchTransactions} />
                <Dashboard
                  onLogout={handleLogout}
                  transactions={transactions}
                  fetchTransactions={fetchTransactions}
                />
                <Explorer
                  transactions={transactions}
                  fetchTransactions={fetchTransactions}
                />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
