import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AdminHomePage from "./pages/admin/AdminLayout";
import BallotPaper from "./pages/officer/BallotPaper";
import AuthPage from "./pages/AuthPage";

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
      
      
    </Routes>
  );
}

export default App;










// import React, { useState, useEffect } from 'react';
// import { AuthClient } from '@dfinity/auth-client';
// // import { createActor } from 'declarations/backend';
// import { createActor } from 'declarations/Election_backend';

// import { canisterId } from 'declarations/Election_backend/index.js';

// const network = process.env.DFX_NETWORK;
// const identityProvider =
//   network === 'ic'
//     ? 'https://identity.ic0.app' // Mainnet
//     : 'http://br5f7-7uaaa-aaaaa-qaaca-cai.localhost:4943/'; // Local

// const App = () => {
//   const [state, setState] = useState({
//     actor: undefined,
//     authClient: undefined,
//     isAuthenticated: false,
//     principal: 'Click "Whoami" to see your principal ID'
//   });

//   useEffect(() => {
//     updateActor();
//   }, []);

//   const updateActor = async () => {
//     const authClient = await AuthClient.create();
//     const identity = authClient.getIdentity();
//     const actor = createActor(canisterId, {
//       agentOptions: { identity }
//     });
//     const isAuthenticated = await authClient.isAuthenticated();

//     setState((prev) => ({
//       ...prev,
//       actor,
//       authClient,
//       isAuthenticated
//     }));
//   };

//   const login = async () => {
//     await state.authClient.login({
//       identityProvider,
//       onSuccess: updateActor
//     });
//   };

//   const logout = async () => {
//     await state.authClient.logout();
//     updateActor();
//   };

//   const whoami = async () => {
//     setState((prev) => ({
//       ...prev,
//       principal: 'Loading...'
//     }));

//     const result = await state.actor.whoami();
//     const principal = result.toString();
//     setState((prev) => ({
//       ...prev,
//       principal
//     }));
//   };

//   return (
//     <div>
//       <h1>Who Am I?</h1>
//       {!state.isAuthenticated ? (
//         <button onClick={login}>Login with Internet Identity</button>
//       ) : (
//         <button onClick={logout}>Logout</button>
//       )}
//       <button onClick={whoami}>Whoami</button>
//       {state.principal && (
//         <div>
//           <h2>Your principal ID is:</h2>
//           <h4>{state.principal}</h4>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
