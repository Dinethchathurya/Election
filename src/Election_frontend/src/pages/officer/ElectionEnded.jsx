import React, { useState } from "react";
import { Election_backend } from "declarations/Election_backend";
import { Principal } from "@dfinity/principal";
import NavBar from "../../components/admin/NavBar";

const DEFAULT_ELECTION_ID = "a4tbr-q4aaa-aaaaa-qaafq-cai";

const getElectionId = () => {
  const stored = localStorage.getItem("electionId");
  try {
    const id = Principal.fromText(
      stored && stored.includes("-") ? stored : DEFAULT_ELECTION_ID
    );
    return id;
  } catch {
    console.warn("⚠️ Invalid or missing electionId. Falling back to default.");
    localStorage.setItem("electionId", DEFAULT_ELECTION_ID);
    return Principal.fromText(DEFAULT_ELECTION_ID);
  }
};

const ElectionEnded = ({ setTheme }) => {
  const [results, setResults] = useState([]);

  const handleVerify = async () => {
    try {
      const electionId = getElectionId();
      const result = await Election_backend.verifyVoteChain(electionId);
      alert(result ? "✅ Vote chain is valid!" : "❌ Vote chain is invalid.");
    } catch (e) {
      console.error("❌ Error verifying vote chain:", e);
      alert("Failed to verify vote chain: " + e.message);
    }
  };

  const handleCalculate = async () => {
    try {
      const electionId = getElectionId();
      await Election_backend.calculateResultsForOfficer(electionId);
      const result = await Election_backend.getAllResults(electionId); // ✅ Updated
      setResults(result);
      alert("✅ Vote results calculated and displayed!");
    } catch (e) {
      console.error("❌ Error calculating results:", e);
      alert("Failed to calculate and display results: " + e.message);
    }
  };

  const handleConfirm = async () => {
    //await handleConfirm();
    try {
      const electionId = getElectionId();
      const result = await Election_backend.confirmResultsForOfficer(electionId);
      alert("✅ Results confirmed: " + result);
    } catch (e) {
      console.error("❌ Error confirming results:", e);
      alert("Failed to confirm results: " + e.message);
    }
  };

  const getResultsForOfficerFunction = async () => {
    await handleConfirm(); // ✅ Confirm before loading
    try {
      const electionId = getElectionId();
      const result = await Election_backend.getAllResults(electionId); // ✅ Updated
      setResults(result);
      alert("✅ Final officer results loaded!");
    } catch (e) {
      console.error("❌ Error fetching officer results:", e);
      alert("Failed to fetch officer results: " + e.message);
    }
  };

  return (
    <>
      <NavBar setTheme={setTheme} />
      <main className="container py-5 d-flex flex-column align-items-center text-center text-body bg-body">
        <img
          src="/assets/govlogo.png"
          alt="gov-logo"
          height={80}
          className="mb-3"
        />

        <h1 className="text-danger fw-bold mb-4">Election Time Exceeded</h1>
        <p className="mb-5 fs-5">
          The voting period for this election has ended. You may now proceed to
          process and verify the results.
        </p>

        <div
          className="d-flex flex-column gap-3 w-100"
          style={{ maxWidth: "400px" }}
        >
          <button className="btn btn-outline-primary" onClick={handleVerify}>
            🕵️ Verify Results
          </button>
          <button className="btn btn-outline-warning" onClick={handleCalculate}>
            🧮 Calculate Results
          </button>
          <button className="btn btn-danger" onClick={getResultsForOfficerFunction}>
            📢 Confirm and Publish Results
          </button>
        </div>

        {/* Results Table */}
        {results.length > 0 && (
          <div className="mt-5 w-100" style={{ maxWidth: "800px" }}>
            <h3 className="fw-bold mb-3">📊 Final Election Results</h3>
            <table className="table table-bordered table-hover table-striped text-center">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Candidate</th>
                  <th>Party</th>
                  <th>1st Choice</th>
                  <th>2nd Choice</th>
                  <th>3rd Choice</th>
                </tr>
              </thead>
              <tbody>
                {results.map((candidate, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{candidate.nameEn}</td>
                    <td>{candidate.hisParty}</td>
                    <td>{candidate.voteCountAsFirstChoice.toString()}</td>
                    <td>{candidate.voteCountAsSecondChoice.toString()}</td>
                    <td>{candidate.voteCountAsThirdChoice.toString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
};

export default ElectionEnded;