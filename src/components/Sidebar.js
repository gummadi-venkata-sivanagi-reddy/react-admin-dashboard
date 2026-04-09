import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.link}>
            📊 Dashboard
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/employees" style={styles.link}>
            👥 Employees
          </Link>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "240px",
    height: "100vh",
    backgroundColor: "#0f172a",
    paddingTop: "80px",
    position: "fixed",
    left: 0,
    top: 0,
  },
  navList: { listStyle: "none", padding: 0 },
  navItem: { padding: "15px 25px", borderBottom: "1px solid #1e293b" },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    display: "block",
  },
};

export default Sidebar;
