import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import employeeService from "../services/employeeService";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await employeeService.getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalEmployees = employees.length;

  const departments = [
    ...new Set(
      employees
        .map((employee) => employee.department)
        .filter((department) => department),
    ),
  ];

  const totalDepartments = departments.length;

  const totalSalary = employees.reduce(
    (total, employee) => total + Number(employee.salary || 0),
    0,
  );

  const averageSalary =
    totalEmployees > 0 ? Math.round(totalSalary / totalEmployees) : 0;

  const departmentData = departments.map((department) => ({
    department,
    employees: employees.filter(
      (employee) => employee.department === department,
    ).length,
  }));

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>📊 Admin Dashboard</h2>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          <div style={styles.cardContainer}>
            <div style={styles.card}>
              <h3 style={styles.cardLabel}>Total Employees</h3>
              <p style={styles.cardValue}>{totalEmployees}</p>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardLabel}>Departments</h3>
              <p style={styles.cardValue}>{totalDepartments}</p>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardLabel}>Average Salary</h3>
              <p style={styles.cardValue}>
                ₹{averageSalary.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div style={styles.chartBox}>
            <h4 style={styles.chartTitle}>Employees by Department</h4>

            {departmentData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="employees" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p style={styles.emptyMessage}>No employee data available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  page: {
    marginTop: "80px",
    marginLeft: "260px",
    padding: "20px",
  },

  title: {
    color: "#1e293b",
    marginBottom: "25px",
  },

  cardContainer: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    flex: 1,
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  cardLabel: {
    margin: 0,
    fontSize: "14px",
    color: "#64748b",
  },

  cardValue: {
    margin: "10px 0 0 0",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1e293b",
  },

  chartBox: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  chartTitle: {
    color: "#1e293b",
    marginTop: 0,
    marginBottom: "20px",
  },

  emptyMessage: {
    color: "#64748b",
    textAlign: "center",
    padding: "40px",
  },
};

export default Dashboard;
