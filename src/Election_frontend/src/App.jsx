// import { useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import AdminHomePage from "./pages/admin/AdminLayout";
// import BallotPaper from "./pages/officer/BallotPaper";
// import AuthPage from "./pages/AuthPage";
// import ElectionEnded from "./pages/officer/ElectionEnded";
// import UserHomePage from "./pages/user/UserHomePage";
// import { Result } from "postcss";
// import ResultPage from "./pages/user/ResultPage";

// function App() {
//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme") || "auto";
//     setTheme(storedTheme);
//   }, []);

//   const setTheme = (theme) => {
//     if (theme === "auto") {
//       document.documentElement.removeAttribute("data-bs-theme");
//     } else {
//       document.documentElement.setAttribute("data-bs-theme", theme);
//     }
//     localStorage.setItem("theme", theme);
//   };

//   return (
//     <Routes>
//       {/* Admin dashboard layout */}

//       <Route path="/home" element={<UserHomePage setTheme={setTheme} />}></Route>
//       <Route path="/ballotPaper" element={<BallotPaper setTheme={setTheme} />}></Route>
//       <Route path="/auth" element={<AuthPage setTheme={setTheme} />}></Route>
//       <Route path="/end" element={<ElectionEnded setTheme={setTheme} />}></Route>
//       <Route path="/resultPage" element={<ResultPage setTheme={setTheme} />}></Route>

//       {/* admin */}
//       <Route path="/*" element={<AdminHomePage setTheme={setTheme} />}>
//         {/* Nested routes inside Admin Layout */}
//       </Route>
//     </Routes>

//   );
// }

// export default App;



import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AdminHomePage from "./pages/admin/AdminLayout";
import BallotPaper from "./pages/officer/BallotPaper";
import AuthPage from "./pages/AuthPage";
import ElectionEnded from "./pages/officer/ElectionEnded";
import UserHomePage from "./pages/user/UserHomePage";
import ResultPage from "./pages/user/ResultPage";
import ProtectedRoute from "./components/ProtectedRoute"; // 👈 import the new file

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
      <Route path="/auth" element={<AuthPage setTheme={setTheme} />} />

      {/* 🔐 Protected Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <UserHomePage setTheme={setTheme} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ballotPaper"
        element={
          <ProtectedRoute>
            <BallotPaper setTheme={setTheme} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/end"
        element={
          <ProtectedRoute>
            <ElectionEnded setTheme={setTheme} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resultPage"
        element={
          <ProtectedRoute>
            <ResultPage setTheme={setTheme} />
          </ProtectedRoute>
        }
      />

      {/* admin dashboard also protected */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AdminHomePage setTheme={setTheme} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;