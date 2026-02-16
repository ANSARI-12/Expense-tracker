import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Explorer from "./components/Explorer";
import TransactionForm from "./components/TransactionForm";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Handle logout - this function will be passed to Dashboard
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/" />}
        />

        <Route
          path="/"
          element={
            token ? (
              <div>
                <h1>Expense Tracker</h1>
                <TransactionForm refresh={() => {}} />
                <Dashboard onLogout={handleLogout} />
                <Explorer />
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
