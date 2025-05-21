import { Election_backend } from "declarations/Election_backend";
import { Principal } from "@dfinity/principal";
import NavBar from "../../components/admin/NavBar";

const DEFAULT_ELECTION_ID = "a4tbr-q4aaa-aaaaa-qaafq-cai";

const getElectionId = () => {
  const stored = localStorage.getItem("electionId");
  try {
    const id = Principal.fromText(stored && stored.includes("-") ? stored : DEFAULT_ELECTION_ID);
    return id;
  } catch {
    console.warn("⚠️ Invalid or missing electionId. Falling back to default.");
    localStorage.setItem("electionId", DEFAULT_ELECTION_ID);
    return Principal.fromText(DEFAULT_ELECTION_ID);
  }
};

const ElectionEnded = ({ setTheme }) => {

  const handleVerify = async () => {
    try {
      const electionId = getElectionId();
      console.log("🔍 Verifying vote chain:", electionId.toText());

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
      console.log("🧮 Calculating results:", electionId.toText());

      await Election_backend.calculateResultsForOfficer(electionId);
      alert("✅ Vote results calculated successfully!");
    } catch (e) {
      console.error("❌ Error calculating results:", e);
      alert("Failed to calculate results: " + e.message);
    }
  };

  const handleConfirm = async () => {
    try {
      const electionId = getElectionId();
      console.log("🔐 Confirming results:", electionId.toText());

      const result = await Election_backend.confirmResultsForOfficer(electionId);
      alert("✅ Results confirmed: " + result);
    } catch (e) {
      console.error("❌ Error confirming results:", e);
      alert("Failed to confirm results: " + e.message);
    }
  };

  const getResultsForOfficerFunction = async () => {
    try {
      const electionId = getElectionId();
      console.log("📦 Fetching officer results:", electionId.toText());

      const result = await Election_backend.getResultsForOfficer(electionId);
      console.log("✅ Results retrieved:", result);
      alert("✅ Officer results loaded!");
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
          <button className="btn btn-success" onClick={handleConfirm}>
            ✅ Confirm Results
          </button>
          <button className="btn btn-danger" onClick={getResultsForOfficerFunction}>
            🚫 Reject Results
          </button>
        </div>
      </main>
    </>
  );
};

export default ElectionEnded;