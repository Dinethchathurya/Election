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
    try {
      console.log("Form Data:", data);

      // ✅ Use stored election ID or fallback
      const storedElectionId =
        localStorage.getItem("electionId") || "a4tbr-q4aaa-aaaaa-qaafq-cai";
      const electionId = Principal.fromText(storedElectionId);

      const officerId = Principal.fromText(data.officerId);
      const officerName = data.officerName;

      const response = await Election_backend.createElectionOfficer(
        electionId,
        officerId,
        officerName,
        data.pollingStation,
        data.pollingDivision,
        data.district
      );

      console.log("Officer Created:", response);
      alert("✅ Election Officer Created Successfully!");
    } catch (err) {
      console.error("❌ Failed to create officer:", err);
      alert("Error: " + err.message);
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
