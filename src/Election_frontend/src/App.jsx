import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import AdminHomePage from "./pages/admin/AdminLayout";
import HomePage from "./pages/admin/HomePage";
import CreateElectionPage from "./pages/admin/CreateElectionPage";

function App() {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "auto";
    setTheme(storedTheme);
  }, []);

  const setTheme = (theme) => {
    if (theme === "auto") {
      document.documentElement.removeAttribute("data-bs-theme");
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
    localStorage.setItem("theme", theme);
  };

  return (
    <Routes>
      {/* Admin dashboard layout */}
      <Route path="/*" element={<AdminHomePage setTheme={setTheme} />}>
        {/* Nested routes inside Admin Layout */}
      </Route>
    </Routes>
  );
}

export default App;
