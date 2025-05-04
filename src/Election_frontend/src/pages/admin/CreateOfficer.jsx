import { useForm } from "react-hook-form";

const CreateOfficer = () => {
  const districts = [
    "Colombo",
    "Gampaha",
    "Kalutara",
    "Kandy",
    "Matale",
    "Nuwara Eliya",
    "Galle",
    "Matara",
    "Hambantota",
    "Jaffna",
    "Wanni",
    "Batticaloa",
    "Digamadulla",
    "Trincomalee",
    "Kurunegala",
    "Puttalam",
    "Anuradhapura",
    "Polonnaruwa",
    "Badulla",
    "Monaragala",
    "Ratnapura",
    "Kegalle",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Officer Created:", data);
    // You can send data to API here
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-body text-body">
      <h2 className="mb-4 fw-bold text-body mt-4">Create Officer</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="row g-4 p-4 bg-body text-body rounded shadow-sm"
      >
        {/* Election ID */}
        <div className="col-md-6">
          <label htmlFor="electionId" className="form-label">
            Election ID
          </label>
          <input
            id="electionId"
            className={`form-control ${errors.electionId ? "is-invalid" : ""}`}
            placeholder="Enter Election ID"
            {...register("electionId", { required: "Election ID is required" })}
          />
          {errors.electionId && (
            <div className="invalid-feedback">{errors.electionId.message}</div>
          )}
        </div>

        {/* Officer ID */}
        <div className="col-md-6">
          <label htmlFor="officerId" className="form-label">
            Election Officer ID
          </label>
          <input
            id="officerId"
            className={`form-control ${errors.officerId ? "is-invalid" : ""}`}
            placeholder="Enter Officer ID"
            {...register("officerId", { required: "Officer ID is required" })}
          />
          {errors.officerId && (
            <div className="invalid-feedback">{errors.officerId.message}</div>
          )}
        </div>

        {/* Officer Name */}
        <div className="col-12">
          <label htmlFor="officerName" className="form-label">
            Election Officer Name
          </label>
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
          <label htmlFor="pollingStation" className="form-label">
            Polling Station
          </label>
          <input
            id="pollingStation"
            className={`form-control ${errors.pollingStation ? "is-invalid" : ""}`}
            placeholder="Station Name"
            {...register("pollingStation", {
              required: "Polling station is required",
            })}
          />
          {errors.pollingStation && (
            <div className="invalid-feedback">
              {errors.pollingStation.message}
            </div>
          )}
        </div>

        {/* Polling Division */}
        <div className="col-md-6">
          <label htmlFor="pollingDivision" className="form-label">
            Polling Division
          </label>
          <input
            id="pollingDivision"
            className={`form-control ${errors.pollingDivision ? "is-invalid" : ""}`}
            placeholder="Division Name"
            {...register("pollingDivision", {
              required: "Polling division is required",
            })}
          />
          {errors.pollingDivision && (
            <div className="invalid-feedback">
              {errors.pollingDivision.message}
            </div>
          )}
        </div>

        {/* District */}
        <div className="col-md-6">
          <label htmlFor="district" className="form-label">
            District
          </label>
          <select
            id="district"
            className={`form-select ${errors.district ? "is-invalid" : ""}`}
            {...register("district", { required: "District is required" })}
          >
            <option value="">Choose District</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.district && (
            <div className="invalid-feedback">{errors.district.message}</div>
          )}
        </div>

        {/* Submit Button */}
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
