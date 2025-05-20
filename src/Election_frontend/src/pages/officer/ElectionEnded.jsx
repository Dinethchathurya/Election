import { Election_backend } from "declarations/Election_backend";
import { Principal } from "@dfinity/principal";
import NavBar from "../../components/admin/NavBar";

const ElectionEnded = ({ setTheme }) => {
  // ✅ Handler to verify the vote chain for a given officer
  const handleVerify = async () => {
    try {
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
      console.log(
        "🔍 Verifying vote chain for Officer ID:",
        electionId.toText()
      );

      const result = await Election_backend.verifyVoteChain(electionId);

      console.log("✅ Vote chain verification result:", result);
      alert(result ? "✅ Vote chain is valid!" : "❌ Vote chain is invalid.");

    } catch (e) {
      console.error("❌ Error verifying vote chain:", e);
      alert("Failed to verify vote chain: " + e.message);
    }
  };

  // ✅ Handler to calculate results based on current votes
  const handleCalculate = async () => {
    try {
      const electionId = Principal.fromText("a4tbr-q4aaa-aaaaa-qaafq-cai");
      console.log(
        "🧮 Calculating results for Officer ID:",
        electionId.toText()
      );

      const result =
        await Election_backend.calculateResultsForOfficer(electionId);

      console.log("✅ Results calculated successfully:", result);
      alert("✅ Vote results calculated successfully!");

    } catch (e) {
      console.error("❌ Error calculating results:", e);
      alert("Failed to calculate results: " + e.message);
    }
  };

  // ✅ Handler to confirm final results and update candidate data
  const handleConfirm = async () => {
    try {
      const electionId = Principal.fromText("a4tbr-q4aaa-aaaaa-qaafq-cai");
      console.log(
        "🔐 Confirming final results for Officer ID:",
        electionId.toText()
      );

      const result =
        await Election_backend.confirmResultsForOfficer(electionId);

      console.log("✅ Results confirmed:", result);
      alert("✅ Results confirmed and saved to candidates: " + result);

    } catch (e) {
      console.error("❌ Error confirming results:", e);
      alert("Failed to confirm results: " + e.message);
    }
  };

  

    const getResultsForOfficerFunction = async () => {
    try {
      const electionId = Principal.fromText("a4tbr-q4aaa-aaaaa-qaafq-cai");
      console.log(
        "🔐 Confirming final results for Officer ID:",
        electionId.toText()
      );

      const result =
        await Election_backend.getResultsForOfficer(electionId);

      console.log("✅ Results confirmed:", result);
      alert("✅ Results confirmed and saved to candidates: " + result);

    } catch (e) {
      console.error("❌ Error confirming results:", e);
      alert("Failed to confirm results: " + e.message);
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
            reject results
          </button>
        </div>
      </main>
    </>
  );

};

export default ElectionEnded;
