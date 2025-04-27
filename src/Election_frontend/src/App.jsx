

import { useEffect } from "react";
import AdminHomePage from "./pages/admin/AdminLayout";


function App() {
  useEffect(() => {
    // Apply stored theme on load
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

  return <AdminHomePage setTheme={setTheme} />;
}

export default App;