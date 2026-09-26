import React, { useEffect, useState } from "react";
import EmployeeService from "../services/employeeService";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await EmployeeService.getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      department: "",
      salary: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const employeeData = {
      name: formData.name,
      email: formData.email,
      department: formData.department,
      salary: Number(formData.salary),
    };

    try {
      if (editingId !== null) {
        await EmployeeService.updateEmployee(editingId, employeeData);
      } else {
        await EmployeeService.createEmployee(employeeData);
      }

      resetForm();
      fetchEmployees();
    } catch (error) {
      console.error("Error saving employee:", error);

      const message =
        error.response?.data?.message || "Unable to save employee.";

      alert(message);
    }
  };

  const handleEdit = (employee) => {
    setEditingId(employee.id);

    setFormData({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      salary: employee.salary,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await EmployeeService.deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Unable to delete employee.");
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const search = searchTerm.toLowerCase();

    return (
      employee.name?.toLowerCase().includes(search) ||
      employee.email?.toLowerCase().includes(search) ||
      employee.department?.toLowerCase().includes(search)
    );
  });

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Employee Management</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          min="1"
          required
          style={styles.input}
        />

        <button type="submit" style={styles.saveButton}>
          {editingId !== null ? "Update Employee" : "Add Employee"}
        </button>

        {editingId !== null && (
          <button type="button" onClick={resetForm} style={styles.cancelButton}>
            Cancel
          </button>
        )}
      </form>

      <div style={styles.header}>
        <h3 style={styles.subtitle}>Employee Directory</h3>

        <input
          type="text"
          placeholder="Search by name, email or department..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          style={styles.searchInput}
        />
      </div>

      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Department</th>
                <th style={styles.th}>Salary</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id} style={styles.tr}>
                    <td style={styles.td}>{employee.id}</td>

                    <td style={styles.td}>
                      <strong>{employee.name}</strong>
                    </td>

                    <td style={styles.td}>{employee.email}</td>

                    <td style={styles.td}>
                      <span style={styles.departmentBadge}>
                        {employee.department}
                      </span>
                    </td>

                    <td style={styles.td}>
                      ₹{Number(employee.salary).toLocaleString("en-IN")}
                    </td>

                    <td style={styles.td}>
                      <button
                        type="button"
                        onClick={() => handleEdit(employee)}
                        style={styles.editButton}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(employee.id)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={styles.emptyMessage}>
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
  page: {
    marginTop: "80px",
    marginLeft: "260px",
    padding: "30px",
  },

  title: {
    color: "#1e293b",
    marginBottom: "20px",
  },

  subtitle: {
    color: "#1e293b",
    margin: 0,
  },

  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    padding: "20px",
    marginBottom: "30px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },

  input: {
    padding: "10px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "14px",
  },

  saveButton: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#2563eb",
    color: "white",
  },

  cancelButton: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#64748b",
    color: "white",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    gap: "20px",
  },

  searchInput: {
    padding: "10px 15px",
    width: "320px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    outline: "none",
  },

  tableContainer: {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },

  thead: {
    backgroundColor: "#f8fafc",
    borderBottom: "2px solid #e2e8f0",
  },

  th: {
    padding: "15px",
    color: "#64748b",
    fontSize: "13px",
    textTransform: "uppercase",
  },

  tr: {
    borderBottom: "1px solid #f1f5f9",
  },

  td: {
    padding: "15px",
    color: "#1e293b",
    fontSize: "14px",
  },

  departmentBadge: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  editButton: {
    backgroundColor: "#f59e0b",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "8px",
  },

  deleteButton: {
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  emptyMessage: {
    textAlign: "center",
    padding: "25px",
    color: "#64748b",
  },
};

export default Employees;
