import ThemeButton from "./themeButton";
import React from "react";

const AdminNavBar = ({ setTheme }) => {
  return (
    <>
      <nav
        className="navbar sticky-top px-4"
        style={{ backgroundColor: "#faaa4c" }}
      >
        <span className="navbar-brand fw-bold">
          Election Commission of Sri Lanka
        </span>
        <ThemeButton setTheme={setTheme} />
      </nav>
    </>
  );
};
export default AdminNavBar;
