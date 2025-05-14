import React, { useState } from "react";
import "../../../public/css/ballotPaper.css";
import { Election_backend } from 'declarations/Election_backend';
import { Principal } from "@dfinity/principal";


const BallotPaper = () => {
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const candidates = [
    { name: "මොනාෂා", symbol: "●", lang: ["Monasha tironi wijerathna", "மோனாஷா"] },
    { name: "ජනක", symbol: "▲", lang: ["Janaka kjbhkjbkjb", "ஜனகா"] },
    { name: "සමන්", symbol: "■", lang: ["Saman mjbkbkb", "சமன்"] },
    { name: "නිමාල්", symbol: "▣", lang: ["Nimal bjbk,jnb jnbjn,kj", "நிமல்"] },
    { name: "කුමාර්", symbol: "⬬", lang: ["Kumar nj,n,jn n,kjn,jn", "குமார்"] },
    { name: "ජනක", symbol: "▲", lang: ["Janaka njn,jn ,jn,jn", "ஜனகா"] },
    { name: "සමන්", symbol: "■", lang: ["Saman n,n,n nnjknlk", "சமன்"] },
    { name: "නිමාල්", symbol: "▣", lang: ["Nimal nlkjnljknlknlknln", "நிமல்"] },
  ];

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
      const canisterid = Principal.fromText("aovwi-4maaa-aaaaa-qaagq-cai");
      
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
      <header className="navbar bg-light shadow-sm p-3 d-flex align-items-center">
        <div className="container d-flex justify-content-between align-items-center">
          <a href="/" className="d-flex align-items-center text-decoration-none">
            <img src="/assets/govlogo.png" alt="ballotPaper" height="60" className="me-3" />
            <p className="fs-4 m-0 text-primary">Sri Lanka Election Portal</p>
          </a>
          <p className="fs-4 m-0">National Election Commission</p>
        </div>
      </header>

      <main className="container-sm flex-fill d-flex flex-column justify-content-between py-4">
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
