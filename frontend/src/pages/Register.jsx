import { useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({});

  const register = async () => {
    await api.post("/auth/register", data);
    alert("Registered successfully! Please login.");
    window.location.href = "/login";
  };

  return (
    <>
      <div>
        <h2>Register</h2>
        <input
          placeholder="Name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <input
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button onClick={register}>Register</button>
      </div>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  );
}
