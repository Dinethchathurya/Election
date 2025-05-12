import React, { useState } from "react";
import "../../../public/css/ballotPaper.css"; // or move to src if needed

const BallotPaper = () => {
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const candidates = [
    { name: "මොනාෂා", symbol: "●", lang: ["Monasha", "ோனாஷா"] },
    { name: "Candidate 2", symbol: "▲" },
    { name: "Candidate 3", symbol: "■" },
    { name: "Candidate 4", symbol: "▣" },
    { name: "Candidate 5", symbol: "⬬" },
    { name: "Candidate 2", symbol: "▲" },
    { name: "Candidate 3", symbol: "■" },
    { name: "Candidate 4", symbol: "▣" },
    { name: "Candidate 3", symbol: "■" },
    { name: "Candidate 4", symbol: "▣" },
    { name: "Candidate 5", symbol: "⬬" },
    { name: "Candidate 2", symbol: "▲" },
    { name: "Candidate 3", symbol: "■" },
  ];

  const handleSelection = (index) => {
    if (selectedIndexes.includes(index)) {
      // Remove if already selected
      setSelectedIndexes(selectedIndexes.filter(i => i !== index));
    } else if (selectedIndexes.length < 3) {
      // Add if under 3 selections
      setSelectedIndexes([...selectedIndexes, index]);
    } else {
      alert("Maximum 3 selections allowed.");
    }
  };

  const confirmVote = () => {
    if (selectedIndexes.length === 0) {
      alert("Please select at least one candidate before confirming.");
    } else {
      const selectedNames = selectedIndexes.map(i => candidates[i].name);
      alert("You voted for:\n" + selectedNames.join(", "));
      console.log("Selected candidates:", selectedNames);
    }
  };

  const clearVotes = () => {
    setSelectedIndexes([]);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-body text-body">
      <header className="navbar bg-light shadow-sm p-3 d-flex align-items-center">
        <div className="container d-flex justify-content-between align-items-center">
          <a
            href="/"
            className="d-flex align-items-center text-decoration-none"
          >
            <img
              src="/assets/govlogo.png"
              alt="ballotPaper"
              height="60"
              className="me-3"
            />
            <p className="fs-4 m-0">Sri Lanka Election Portal</p>
          </a>
          <p className="fs-4 m-0">National Election Commission</p>
        </div>
      </header>

      <main className="container-sm flex-fill d-flex flex-column justify-content-between py-4">
        <div>
          <h2 className="fw-bold mb-3">Ballot Paper</h2>
          <div className="ballot-container mb-4 overflow-auto">
            <table className="table table-bordered text-center align-middle mb-0 table-hover">
              <tbody>
                {candidates.map((c, index) => {
                  const selectedPos = selectedIndexes.indexOf(index);
                  return (
                    <tr key={index} onClick={() => handleSelection(index)}>
                      <td>{c.name}</td>
                      {c.lang?.map((label, i) => (
                        <td key={i}>{label}</td>
                      ))}
                      <td className="symbol">{c.symbol}</td>
                      <td className="vote-col">
                        {selectedPos >= 0 && (
                          <span className="vote-mark">{selectedPos + 1}</span>
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
          <button
            className="confirm-btn btn btn-primary px-4"
            onClick={confirmVote}
          >
            තහවුරු කරන්න | உறுதிப்படுத்துக | Confirm
          </button>

          <button
            className="btn btn-outline-secondary px-4"
            onClick={clearVotes}
          >
            මකාදමන්න | அழிக்கவும் | Clear
          </button>
        </div>
      </main>
    </div>
  );
};

export default BallotPaper;