// import React, { useState } from "react";
// import "../../../public/css/ballotPaper.css";
// import { Election_backend } from 'declarations/Election_backend';
// import { Principal } from "@dfinity/principal";
// import NavBar from "../../components/admin/NavBar";


// const BallotPaper = ({ setTheme }) => {
//   const [selectedIndexes, setSelectedIndexes] = useState([]);

// const candidates = [
//   { name: "Monasha", symbol: "●", lang: ["මොනාෂා", "மோனாஷா"] },
//   { name: "Ashini", symbol: "▲", lang: ["අෂිනි", "அஷினி"] },
//   { name: "Dineth", symbol: "■", lang: ["දිනෙත්", "தினேத்"] },
//   { name: "Janaka", symbol: "◆", lang: ["ජනක", "ஜனகா"] },
//   { name: "Saman", symbol: "♠", lang: ["සමන්", "சமன்"] },
//   { name: "Kamal", symbol: "♦", lang: ["කමල්", "கமல்"] },
//   { name: "Nimali", symbol: "♥", lang: ["නීමාලි", "நிமாலி"] },
//   { name: "Roshan", symbol: "★", lang: ["රොෂාන්", "ரோஷன்"] },
//   { name: "Tharindu", symbol: "☀", lang: ["තරින්දු", "தரிந்து"] },
//   { name: "Lakmini", symbol: "☘", lang: ["ලක්මිණි", "லக்மினி"] },
//   { name: "Kavindu", symbol: "✿", lang: ["කවිඳු", "கவிந்து"] },
//   { name: "Harini", symbol: "☁", lang: ["හරිනි", "ஹரிணி"] }
// ];

//   const handleSelection = (index) => {
//     if (selectedIndexes.includes(index)) {
//       setSelectedIndexes(selectedIndexes.filter(i => i !== index));
//     } else if (selectedIndexes.length < 3) {
//       setSelectedIndexes([...selectedIndexes, index]);
//     } else {
//       alert("Maximum 3 selections allowed.");
//     }
//   };

//   const submitVote = async () => {
//     if (selectedIndexes.length === 0) {
//       alert("Please select at least one candidate before submitting.");
//       return;
//     }

//     const ordered = selectedIndexes.map(i => candidates[i].name);
//     const first = ordered[0];
//     const second = ordered[1] ? [ordered[1]] : [];
//     const third = ordered[2] ? [ordered[2]] : [];

//     try {

//         localStorage.get("newElectionId", electionId);
//       const canisterid = Principal.fromText(localStorage.getItem("electionId"));
      
//       const response = await Election_backend.addVote(canisterid, first, second, third);
//       console.log("✅ Vote submitted:", response);
//       alert("✅ Vote submitted successfully!");
//       setSelectedIndexes([]);
//     } catch (err) {
//       console.error("❌ Failed to submit vote:", err);
//       alert("❌ Error submitting vote. Please try again.");
//     }
//   };

//   const clearVotes = () => setSelectedIndexes([]);

//   return (
//     <div className="d-flex flex-column min-vh-100 bg-body text-body">

//       <NavBar setTheme={setTheme }/>

//       <main className="container-sm flex-fill d-flex flex-column justify-content-between py-4 text-body bg-body">
//         <div>
//           <h2 className="fw-bold mb-3">Ballot Paper</h2>
//           <div className="ballot-container mb-4 overflow-auto">
//             <table className="table table-bordered text-center align-middle mb-0 table-hover">
//               <thead className="table-light">
//                 <tr>
//                   <th>Candidate</th>
//                   <th>Symbol</th>
//                   <th>Vote</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {candidates.map((c, index) => {
//                   const selectedPos = selectedIndexes.indexOf(index);
//                   return (
//                     <tr key={index} onClick={() => handleSelection(index)}>
//                       <td className="text-start">
//                         <div className="d-flex flex-column">
//                           <span>{c.name}</span>
//                           {c.lang?.[0] && <span>{c.lang[0]}</span>}
//                           {c.lang?.[1] && <span>{c.lang[1]}</span>}
//                         </div>
//                       </td>
//                       <td className="symbol">{c.symbol}</td>
//                       <td className="vote-col text-center">
//                         {selectedPos >= 0 && (
//                           <span className="vote-mark fw-bold">{selectedPos + 1}</span>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="text-center mt-4 d-flex justify-content-center gap-3">
//           <button className="confirm-btn btn btn-primary px-4" onClick={submitVote}>
//             තහවුරු කරන්න | உறுதிப்படுத்துக | Submit
//           </button>
//           <button className="btn btn-outline-secondary px-4" onClick={clearVotes}>
//             මකාදමන්න | அழிக்கவும் | Clear
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default BallotPaper;











import React, { useState, useEffect } from "react";
import "../../../public/css/ballotPaper.css";
import { Election_backend } from 'declarations/Election_backend';
import { Principal } from "@dfinity/principal";
import NavBar from "../../components/admin/NavBar";

const BallotPaper = ({ setTheme }) => {
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const storedElectionId = localStorage.getItem("electionId") || "a4tbr-q4aaa-aaaaa-qaafq-cai";
        const electionId = Principal.fromText(storedElectionId);
        const result = await Election_backend.getAllResults(electionId);

        const formatted = result.map((c, idx) => ({
          name: c.nameEn,
          symbol: c.hisSymbol,
          lang: [c.nameSi, c.nameTa],
        }));

        setCandidates(formatted);
      } catch (err) {
        console.error("❌ Failed to fetch candidates:", err);
      }
    };

    fetchCandidates();
  }, []);

  const handleSelection = (index) => {
    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(selectedIndexes.filter(i => i !== index));
    } else if (selectedIndexes.length < 3) {
      setSelectedIndexes([...selectedIndexes, index]);
    } else {
      alert("Maximum 3 selections allowed.");
    }
  };

  const submitVote = async () => {
    if (selectedIndexes.length === 0) {
      alert("Please select at least one candidate before submitting.");
      return;
    }

    const ordered = selectedIndexes.map(i => candidates[i].name);
    const first = ordered[0];
    const second = ordered[1] ? [ordered[1]] : [];
    const third = ordered[2] ? [ordered[2]] : [];

    try {
      const canisterid = Principal.fromText(localStorage.getItem("electionId"));
      const response = await Election_backend.addVote(canisterid, first, second, third);
      console.log("✅ Vote submitted:", response);
      alert("✅ Vote submitted successfully!");
      setSelectedIndexes([]);
    } catch (err) {
      console.error("❌ Failed to submit vote:", err);
      alert("❌ Error submitting vote. Please try again.");
    }
  };

  const clearVotes = () => setSelectedIndexes([]);

  return (
    <div className="d-flex flex-column min-vh-100 bg-body text-body">
      <NavBar setTheme={setTheme} />

      <main className="container-sm flex-fill d-flex flex-column justify-content-between py-4 text-body bg-body">
        <div>
          <h2 className="fw-bold mb-3">Ballot Paper</h2>
          <div className="ballot-container mb-4 overflow-auto">
            <table className="table table-bordered text-center align-middle mb-0 table-hover">
              <thead className="table-light">
                <tr>
                  <th>Candidate</th>
                  <th>Symbol</th>
                  <th>Vote</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c, index) => {
                  const selectedPos = selectedIndexes.indexOf(index);
                  return (
                    <tr key={index} onClick={() => handleSelection(index)}>
                      <td className="text-start">
                        <div className="d-flex flex-column">
                          <span>{c.name}</span>
                          {c.lang?.[0] && <span>{c.lang[0]}</span>}
                          {c.lang?.[1] && <span>{c.lang[1]}</span>}
                        </div>
                      </td>
                      <td className="symbol">{c.symbol}</td>
                      <td className="vote-col text-center">
                        {selectedPos >= 0 && (
                          <span className="vote-mark fw-bold">{selectedPos + 1}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-4 d-flex justify-content-center gap-3">
          <button className="confirm-btn btn btn-primary px-4" onClick={submitVote}>
            තහවුරු කරන්න | உறுதிப்படுத்துக | Submit
          </button>
          <button className="btn btn-outline-secondary px-4" onClick={clearVotes}>
            මකාදමන්න | அழிக்கவும் | Clear
          </button>
        </div>
      </main>
    </div>
  );
};

export default BallotPaper;
