
import React, { useEffect, useState } from "react";
import { Election_backend } from "declarations/Election_backend";
import { Principal } from "@dfinity/principal";
import ElectionCharts from "./charts/ ElectionCharts";

const HomePage = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


// Define a fallback electionId string (must be a valid Principal text)
const DEFAULT_ELECTION_ID = "a4tbr-q4aaa-aaaaa-qaafq-cai"; // replace with a real Principal if needed

const storedId = localStorage.getItem("electionId");

// Fallback to default if null or invalid
let electionId;

try {
  electionId = Principal.fromText(storedId ?? DEFAULT_ELECTION_ID);
} catch (e) {
  console.warn("Invalid or missing election ID. Using default.");
  electionId = Principal.fromText(DEFAULT_ELECTION_ID);
  localStorage.setItem("electionId", DEFAULT_ELECTION_ID); // Optional: store fallback
}

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const result = await Election_backend.getAllResults(electionId);
        console.log("✅ Candidate Results:", result);
        setCandidates(result);
        setError("");
      } catch (e) {
        console.error("❌ Error fetching candidates:", e);
        setError("Failed to load candidate results.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="my-4">
        <h1>📥 Election Summary</h1>
      </div>

      <ElectionCharts />

      <h2 className="mt-5 mb-3">📋 Final Result of Candidates</h2>

      {loading && <p>Loading candidate data...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped align-middle text-center shadow-sm rounded">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Candidate Name</th>
              <th>Party</th>
              <th>First Choice Votes</th>
              <th>Second Choice Votes</th>
              <th>Third Choice Votes</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {candidates.map((candidate, index) => (
              <tr key={`${candidate.name}-${index}`}>
                <td>{index + 1}</td>
                <td>{candidate.name}</td>
                <td>{candidate.hisParty}</td>
                <td>{candidate.voteCountAsFirstChoice.toString()}</td>
                <td>{candidate.voteCountAsSecondChoice.toString()}</td>
                <td>{candidate.voteCountAsThirdChoice.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default HomePage;
