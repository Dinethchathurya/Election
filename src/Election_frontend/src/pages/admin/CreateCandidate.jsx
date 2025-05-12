import { useForm } from "react-hook-form";
import { Election_backend } from "declarations/Election_backend";
import { Principal } from "@dfinity/principal";

const CreateCandidatePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


const onSubmit = async (data) => {
  console.log("Candidate Submitted:", data);

  try {
    // Validate and convert the electionId
    let electionId;
    try {
      electionId = Principal.fromText(data.electionId.trim());
      console.log("✅ Election ID is a valid Principal:", electionId.toText());
    } catch (convError) {
      console.error("❌ Invalid Election ID:", data.electionId);
      alert("Invalid Election Canister ID. Please check the format.");
      return;
    }

    const candidateName = data.candidateName.trim();
    const candidateParty = data.candidateParty.trim();

    console.log("Candidate Name:", candidateName);
    console.log("Candidate Party:", candidateParty);

    const result = await Election_backend.createCandidate(
      electionId,
      candidateName,
      candidateParty
    );

    console.log("Candidate creation result:", result);
    alert("✅ Candidate created successfully!");
    reset();
  } catch (e) {
    console.error("❌ Error creating candidate:", e);
    alert("Failed to create candidate: " + e.message);
  }
};

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-body text-body">
      <h2 className="mb-4 fw-bold text-body mt-4">Create Candidate</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="row g-4 p-4 bg-body text-body rounded shadow-sm"
      >
        {/* Candidate Name */}
        <div className="col-md-8">
          <label htmlFor="candidateName" className="form-label">
            Candidate Name
          </label>
          <input
            type="text"
            id="candidateName"
            className={`form-control ${errors.candidateName ? "is-invalid" : ""}`}
            placeholder="Enter full name"
            {...register("candidateName", {
              required: "Candidate name is required",
              minLength: {
                value: 2,
                message: "Must be at least 2 characters",
              },
            })}
          />
          {errors.candidateName && (
            <div className="invalid-feedback">
              {errors.candidateName.message}
            </div>
          )}
        </div>

        {/* Election ID */}
        <div className="col-md-8">
          <label htmlFor="electionId" className="form-label">
            Election ID
          </label>
          <input
            type="text"
            id="electionId"
            className={`form-control ${errors.electionId ? "is-invalid" : ""}`}
            placeholder="Enter canister ID"
            {...register("electionId", {
              required: "Election ID is required",
              minLength: {
                value: 2,
                message: "Must be at least 2 characters",
              },
            })}
          />
          {errors.electionId && (
            <div className="invalid-feedback">
              {errors.electionId.message}
            </div>
          )}
        </div>

        {/* Candidate Party */}
        <div className="col-md-8">
          <label htmlFor="candidateParty" className="form-label">
            Political Party
          </label>
          <input
            type="text"
            id="candidateParty"
            className={`form-control ${errors.candidateParty ? "is-invalid" : ""}`}
            placeholder="Enter party name"
            {...register("candidateParty", {
              required: "Political party is required",
              minLength: {
                value: 2,
                message: "Must be at least 2 characters",
              },
            })}
          />
          {errors.candidateParty && (
            <div className="invalid-feedback">
              {errors.candidateParty.message}
            </div>
          )}
        </div>

        {/* Submit Button */}
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