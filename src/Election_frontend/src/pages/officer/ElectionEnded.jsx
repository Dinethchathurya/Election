
const ElectionEnded = () => {
  const handleVerify = () => {
    alert("🕵️ Verifying results... (connect to backend)");
    // TODO: call backend to verify
  };

  const handleCalculate = () => {
    alert("🧮 Calculating results... (connect to backend)");
    // TODO: call backend to calculate results
  };

  const handleConfirm = () => {
    alert("✅ Results confirmed! (connect to backend)");
    // TODO: call backend to confirm results
  };

  return (
    <main className="container py-5 d-flex flex-column align-items-center text-center">
      <img src="/assets/govlogo.png" alt="gov-logo" height={80} className="mb-3" />

      <h1 className="text-danger fw-bold mb-4">Election Time Exceeded</h1>
      <p className="mb-5 fs-5">
        The voting period for this election has ended.
        You may now proceed to process and verify the results.
      </p>

      <div className="d-flex flex-column gap-3 w-100" style={{ maxWidth: "400px" }}>
        <button className="btn btn-outline-primary" onClick={handleVerify}>
          🕵️ Verify Results
        </button>
        <button className="btn btn-outline-warning" onClick={handleCalculate}>
          🧮 Calculate Results
        </button>
        <button className="btn btn-success" onClick={handleConfirm}>
          ✅ Confirm Results
        </button>
      </div>
    </main>
  );
};

export default ElectionEnded;