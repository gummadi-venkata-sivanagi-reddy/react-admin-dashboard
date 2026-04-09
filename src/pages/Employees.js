import React, { useEffect, useState } from "react";
import EmployeeService from "../services/employeeService";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    EmployeeService.getEmployees()
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error: ", error);
        setLoading(false);
      });
  };

  // 🔍 Search Logic: Filter employees by name
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div style={{ marginTop: "80px", marginLeft: "260px", padding: "30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ color: "#1e293b", margin: 0 }}>👥 Employee Directory</h2>

        {/* 🔍 Search Input */}
        <input
          type="text"
          placeholder="Search by name or role..."
          style={styles.searchInput}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id} style={styles.tr}>
                    <td style={styles.td}>{emp.id}</td>
                    <td style={styles.td}>
                      <strong>{emp.name}</strong>
                    </td>
                    <td style={styles.td}>{emp.email}</td>
                    <td style={styles.td}>
                      <span style={styles.roleBadge}>{emp.role}</span>
                    </td>
                    <td style={styles.td}>
                      <button style={styles.viewBtn}>View</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  searchInput: {
    padding: "10px 15px",
    width: "300px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    outline: "none",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  tableContainer: {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  table: { width: "100%", borderCollapse: "collapse", textAlign: "left" },
  thead: { backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0" },
  th: {
    padding: "15px",
    color: "#64748b",
    fontSize: "13px",
    textTransform: "uppercase",
  },
  tr: { borderBottom: "1px solid #f1f5f9", transition: "0.3s" },
  td: { padding: "15px", color: "#1e293b", fontSize: "14px" },
  roleBadge: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  viewBtn: {
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    padding: "5px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "12px",
  },
};

export default Employees;
