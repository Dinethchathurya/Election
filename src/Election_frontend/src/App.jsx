import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AdminHomePage from "./pages/admin/AdminLayout";
import BallotPaper from "./pages/officer/BallotPaper";
import AuthPage from "./pages/AuthPage";
import ElectionEnded from "./pages/officer/ElectionEnded";

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
      <Route path="/ballotPaper" element={<BallotPaper setTheme={setTheme} />}>
        {/* Nested routes inside Admin Layout */}
      </Route>
      <Route path="/auth" element={<AuthPage setTheme={setTheme} />}></Route>
      <Route path="/end" element={<ElectionEnded setTheme={setTheme} />}></Route>
    </Routes>

  );
}

export default App;