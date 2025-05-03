import { useForm } from "react-hook-form";

const CreateCandidatePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Candidate Submitted:", data);
    // TODO: API call here
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-body text-body">
      <h2 className="mb-4 fw-bold text-body mt-4">Create Candidate</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="row g-4 p-4 bg-body text-body rounded shadow-sm"
      >
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
            <div className="invalid-feedback">{errors.candidateName.message}</div>
          )}
        </div>

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
            <div className="invalid-feedback">{errors.candidateParty.message}</div>
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