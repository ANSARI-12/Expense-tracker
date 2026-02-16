import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [data, setData] = useState({});

  const login = async () => {
    const res = await api.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    window.location.href = "/";
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <button onClick={login}>Login</button>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
