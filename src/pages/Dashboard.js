import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import employeeService from "../services/employeeService";

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0 });

  // Chart kosam dummy data (Interview lo highlight avvadaniki)
  const data = [
    { name: "Jan", employees: 400 },
    { name: "Feb", employees: 300 },
    { name: "Mar", employees: 500 },
    { name: "Apr", employees: stats.total * 100 }, // Scaling real data for chart
  ];

  useEffect(() => {
    employeeService
      .getEmployees()
      .then((res) => {
        setStats({ total: res.data.length });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ marginTop: "80px", marginLeft: "260px", padding: "20px" }}>
      <h2 style={{ color: "#1e293b" }}>📊 Admin Dashboard</h2>

      {/* Stats Cards */}
      <div style={styles.cardContainer}>
        <div style={{ ...styles.card, borderLeft: "5px solid #3b82f6" }}>
          <h3 style={styles.cardLabel}>Total Employees</h3>
          <p style={styles.cardValue}>{stats.total}</p>
        </div>
        <div style={{ ...styles.card, borderLeft: "5px solid #10b981" }}>
          <h3 style={styles.cardLabel}>Active Projects</h3>
          <p style={styles.cardValue}>12</p>
        </div>
        <div style={{ ...styles.card, borderLeft: "5px solid #f59e0b" }}>
          <h3 style={styles.cardLabel}>Departments</h3>
          <p style={styles.cardValue}>4</p>
        </div>
      </div>

      {/* Charts Section */}
      <div style={styles.chartSection}>
        <div style={styles.chartBox}>
          <h4>Employee Growth (Monthly)</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="employees" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartBox}>
          <h4>Company Performance</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="employees" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const styles = {
  cardContainer: { display: "flex", gap: "20px", marginBottom: "30px" },
  card: {
    flex: 1,
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  cardLabel: { margin: 0, fontSize: "14px", color: "#64748b" },
  cardValue: {
    margin: "10px 0 0 0",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1e293b",
  },
  chartSection: { display: "flex", gap: "20px" },
  chartBox: {
    flex: 1,
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
};

export default Dashboard;
