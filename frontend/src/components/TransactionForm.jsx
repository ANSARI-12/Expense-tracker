// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const [data, setData] = useState([]);
//   const [formData, setFormData] = useState({
//     title: "",
//     amount: "",
//     category: "",
//     date: "",
//     notes: "",
//   });
//   const navigate = useNavigate();

//   const fetchData = () => {
//     api.get("/transactions").then((res) => setData(res.data));
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/transactions", formData);
//       setFormData({ title: "", amount: "", category: "", date: "", notes: "" });
//       fetchData();
//     } catch (err) {
//       console.error("Error adding transaction:", err);
//     }
//   };

//   const total = data.reduce((a, b) => a + Number(b.amount), 0);

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
//       <form
//         onSubmit={handleSubmit}
//         style={{
//           marginBottom: "30px",
//           padding: "15px",
//           background: "#f4f4f4",
//           borderRadius: "8px",
//         }}
//       >
//         <h3>Add New Transaction</h3>
//         <input
//           name="title"
//           placeholder="Title (e.g. Netflix)"
//           value={formData.title}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />
//         <input
//           name="amount"
//           type="number"
//           placeholder="Amount"
//           value={formData.amount}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />
//         <input
//           name="category"
//           placeholder="Category (Tag)"
//           value={formData.category}
//           onChange={handleChange}
//           style={inputStyle}
//         />
//         <input
//           name="date"
//           type="date"
//           value={formData.date}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />
//         <textarea
//           name="notes"
//           placeholder="Notes (Optional)"
//           value={formData.notes}
//           onChange={handleChange}
//           style={inputStyle}
//         />
//         <button
//           type="submit"
//           style={{
//             width: "100%",
//             padding: "10px",
//             backgroundColor: "#28a745",
//             color: "#fff",
//             border: "none",
//             borderRadius: "4px",
//           }}
//         >
//           Save Transaction
//         </button>
//       </form>

//       <h3>Recent History</h3>
//       {data.map((t) => (
//         <div
//           key={t._id}
//           style={{ borderBottom: "1px solid #ddd", padding: "10px" }}
//         >
//           <strong>
//             {t.title} — ₹{t.amount}
//           </strong>
//           <div style={{ fontSize: "0.85em", color: "#666" }}>
//             Tag: {t.category} | Date:{" "}
//             {new Date(t.date).toLocaleDateString("en-IN")}
//           </div>
//           {t.notes && (
//             <p style={{ margin: "5px 0", fontSize: "0.85em" }}>
//               Note: {t.notes}
//             </p>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// const inputStyle = {
//   width: "100%",
//   marginBottom: "10px",
//   padding: "8px",
//   boxSizing: "border-box",
// };

import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Ensure this matches your filename

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    notes: "",
  });
  const navigate = useNavigate();

  const fetchData = () => {
    api.get("/transactions").then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/transactions", formData);
      setFormData({ title: "", amount: "", category: "", date: "", notes: "" });
      fetchData();
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  const total = data.reduce((a, b) => a + Number(b.amount), 0);

  return (
    <div className="dashboard-container">
      <form onSubmit={handleSubmit} className="transaction-form">
        <h3>Add New Transaction</h3>
        <input
          name="title"
          className="form-input"
          placeholder="Title (e.g. Netflix)"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          name="amount"
          className="form-input"
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          className="form-input"
          placeholder="Category (Tag)"
          value={formData.category}
          onChange={handleChange}
        />
        <input
          name="date"
          className="form-input"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <textarea
          name="notes"
          className="form-input"
          placeholder="Notes (Optional)"
          value={formData.notes}
          onChange={handleChange}
        />
        <button type="submit" className="save-btn">
          Save Transaction
        </button>
      </form>

      <h3>Recent History</h3>
      <div className="history-list">
        {data.map((t) => (
          <div key={t._id} className="history-item">
            <strong>
              {t.title} — ₹{t.amount}
            </strong>
            <div className="history-meta">
              Tag: {t.category} | Date:{" "}
              {new Date(t.date).toLocaleDateString("en-IN")}
            </div>
            {t.notes && <p className="history-note">Note: {t.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
