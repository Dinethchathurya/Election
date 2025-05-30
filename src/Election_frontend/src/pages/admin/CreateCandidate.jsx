import { useForm } from "react-hook-form";
import { Election_backend } from "declarations/Election_backend";
import { Principal } from "@dfinity/principal";

const CreateCandidatePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const onSubmit = async (data) => {
  try {
    // Attempt to get the election ID from localStorage
    const storedElectionId = localStorage.getItem("electionId");
    let electionId;

    try {
      electionId = Principal.fromText(
        storedElectionId && storedElectionId.includes("-")
          ? storedElectionId
          : "a4tbr-q4aaa-aaaaa-qaafq-cai"
      );
    } catch (idError) {
      console.warn("⚠️ Invalid electionId in localStorage. Using fallback.");
      electionId = Principal.fromText("a4tbr-q4aaa-aaaaa-qaafq-cai");
    }

    // Call the backend to create the candidate
    const response = await Election_backend.createCandidate(
      electionId,
      data.candidateNameEn,
      data.candidateNameSi,
      data.candidateNameTa,
      data.candidateParty,
      data.candidateSymbol
    );

    console.log("✅ Candidate Created:", response);
    alert("✅ Candidate Created Successfully!");
  } catch (err) {
    console.error("❌ Failed to create candidate:", err);
    alert("Error: " + (err.message || "Unexpected error occurred."));
  }
};
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-body text-body">
      <h2 className="mb-4 fw-bold text-body mt-4">Create Candidate</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="row g-4 p-4 bg-body text-body rounded shadow-sm"
      >
        {/* Candidate Name - English */}
        <div className="col-md-6">
          <label htmlFor="candidateNameEn" className="form-label">
            Candidate Name (English)
          </label>
          <input
            id="candidateNameEn"
            className={`form-control ${errors.candidateNameEn ? "is-invalid" : ""}`}
            placeholder="e.g., Dineth"
            {...register("candidateNameEn", { required: "English name is required" })}
          />
          {errors.candidateNameEn && (
            <div className="invalid-feedback">{errors.candidateNameEn.message}</div>
          )}
        </div>

        {/* Candidate Name - Sinhala */}
        <div className="col-md-6">
          <label htmlFor="candidateNameSi" className="form-label">
            Candidate Name (Sinhala)
          </label>
          <input
            id="candidateNameSi"
            className={`form-control ${errors.candidateNameSi ? "is-invalid" : ""}`}
            placeholder="e.g., දිනේත්"
            {...register("candidateNameSi", { required: "Sinhala name is required" })}
          />
          {errors.candidateNameSi && (
            <div className="invalid-feedback">{errors.candidateNameSi.message}</div>
          )}
        </div>

        {/* Candidate Name - Tamil */}
        <div className="col-md-6">
          <label htmlFor="candidateNameTa" className="form-label">
            Candidate Name (Tamil)
          </label>
          <input
            id="candidateNameTa"
            className={`form-control ${errors.candidateNameTa ? "is-invalid" : ""}`}
            placeholder="e.g., தினேத்"
            {...register("candidateNameTa", { required: "Tamil name is required" })}
          />
          {errors.candidateNameTa && (
            <div className="invalid-feedback">{errors.candidateNameTa.message}</div>
          )}
        </div>

        {/* NIC Number */}
        <div className="col-md-6">
          <label htmlFor="nic" className="form-label">
            NIC Number
          </label>
          <input
            id="nic"
            className={`form-control ${errors.nic ? "is-invalid" : ""}`}
            placeholder="Enter NIC Number"
            {...register("nic", { required: "NIC number is required" })}
          />
          {errors.nic && (
            <div className="invalid-feedback">{errors.nic.message}</div>
          )}
        </div>

        {/* Political Party */}
        <div className="col-md-6">
          <label htmlFor="candidateParty" className="form-label">
            Political Party
          </label>
          <input
            id="candidateParty"
            className={`form-control ${errors.candidateParty ? "is-invalid" : ""}`}
            placeholder="e.g., Future Vision Party"
            {...register("candidateParty", { required: "Party name is required" })}
          />
          {errors.candidateParty && (
            <div className="invalid-feedback">{errors.candidateParty.message}</div>
          )}
        </div>

        {/* Political Symbol */}
        <div className="col-md-6">
          <label htmlFor="candidateSymbol" className="form-label">
            Political Symbol
          </label>
          <input
            id="candidateSymbol"
            className={`form-control ${errors.candidateSymbol ? "is-invalid" : ""}`}
            placeholder="e.g., ⚡, 🐘"
            {...register("candidateSymbol", { required: "Symbol is required" })}
          />
          {errors.candidateSymbol && (
            <div className="invalid-feedback">{errors.candidateSymbol.message}</div>
          )}
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Create Candidate
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateCandidatePage;