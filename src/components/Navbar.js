import React from "react";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>Siva Admin Panel</h2>
      <div style={styles.navLinks}>
        <span>Welcome, Siva</span>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    height: "60px",
    backgroundColor: "#1e293b",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
  },
  logo: { margin: 0, fontSize: "20px" },
  navLinks: { fontSize: "14px", fontWeight: "bold" },
};

export default Navbar;
