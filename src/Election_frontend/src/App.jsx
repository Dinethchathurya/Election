
// import { useEffect } from 'react';
// import { Election_backend } from 'declarations/Election_backend';
// import AdminHomePage from '../src/pages/admin/AdminHomePage';

// function App() {
//   async function createElectionFunction() {
//     try {
//       let electionType = "parliment";
//       let year = "2000";
//       let newid = await Election_backend.createElection(electionType, year);
//       console.log(newid.toText());
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   // Optional: Load Chart.js or Bootstrap JS if you need dynamic behaviors
//   useEffect(() => {
//     // Example: chart init or Bootstrap dropdown, etc.
//   }, []);

//   return (
//       <AdminHomePage />
//   );
// }

// export default App;






import { useEffect } from "react";
import AdminHomePage from "./pages/admin/adminHomePage";


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