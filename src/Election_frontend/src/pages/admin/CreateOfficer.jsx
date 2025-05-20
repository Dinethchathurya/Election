import { useForm } from "react-hook-form";
import { Election_backend } from "declarations/Election_backend";
import { Principal } from "@dfinity/principal";

const CreateOfficer = () => {
const storedElectionId = localStorage.getItem("electionId") || "a4tbr-q4aaa-aaaaa-qaafq-cai"; // default fallback
const electionId = Principal.fromText(storedElectionId);


  const districts = [
    "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
    "Galle", "Matara", "Hambantota", "Jaffna", "Wanni", "Batticaloa",
    "Digamadulla", "Trincomalee", "Kurunegala", "Puttalam", "Anuradhapura",
    "Polonnaruwa", "Badulla", "Monaragala", "Ratnapura", "Kegalle",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const storedElectionId = localStorage.getItem("electionId");
      if (!storedElectionId) {
        alert("❌ No election ID found in local storage.");
        return;
      }

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

      console.log("✅ Officer Created:", response);
      alert("✅ Election Officer Created Successfully!");
    } catch (err) {
      console.error("❌ Failed to create officer:", err);
      alert("Error: " + err.message);
    }
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-body text-body">
      <h2 className="mb-4 fw-bold text-body mt-4">Create Officer</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="row g-4 p-4 bg-body text-body rounded shadow-sm"
      >
        {/* Officer ID */}
        {/* <div className="col-md-6">
          <label htmlFor="officerId" className="form-label">Election Officer ID</label>
          <input
            id="officerId"
            className={`form-control ${errors.officerId ? "is-invalid" : ""}`}
            placeholder="Enter Officer ID"
            {...register("officerId", { required: "Officer ID is required" })}
          />
          {errors.officerId && (
            <div className="invalid-feedback">{errors.officerId.message}</div>
          )}
        </div> */}

        {/* Officer Name */}
        <div className="col-12">
          <label htmlFor="officerName" className="form-label">Election Officer Name</label>
          <input
            id="officerName"
            className={`form-control ${errors.officerName ? "is-invalid" : ""}`}
            placeholder="Full Name"
            {...register("officerName", {
              required: "Officer name is required",
            })}
          />
          {errors.officerName && (
            <div className="invalid-feedback">{errors.officerName.message}</div>
          )}
        </div>

        {/* Polling Station */}
        <div className="col-md-6">
          <label htmlFor="pollingStation" className="form-label">Polling Station</label>
          <input
            id="pollingStation"
            className={`form-control ${errors.pollingStation ? "is-invalid" : ""}`}
            placeholder="Station Name"
            {...register("pollingStation", {
              required: "Polling station is required",
            })}
          />
          {errors.pollingStation && (
            <div className="invalid-feedback">{errors.pollingStation.message}</div>
          )}
        </div>

        {/* Polling Division */}
        <div className="col-md-6">
          <label htmlFor="pollingDivision" className="form-label">Polling Division</label>
          <input
            id="pollingDivision"
            className={`form-control ${errors.pollingDivision ? "is-invalid" : ""}`}
            placeholder="Division Name"
            {...register("pollingDivision", {
              required: "Polling division is required",
            })}
          />
          {errors.pollingDivision && (
            <div className="invalid-feedback">{errors.pollingDivision.message}</div>
          )}
        </div>

        {/* District */}
        <div className="col-md-6">
          <label htmlFor="district" className="form-label">District</label>
          <select
            id="district"
            className={`form-select ${errors.district ? "is-invalid" : ""}`}
            {...register("district", { required: "District is required" })}
          >
            <option value="">Choose District</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>{district}</option>
            ))}
          </select>
          {errors.district && (
            <div className="invalid-feedback">{errors.district.message}</div>
          )}
        </div>

        {/* Submit */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Create Officer
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateOfficer;