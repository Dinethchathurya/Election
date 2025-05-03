const CreateCandidatePage = () => {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-body text-body">
      <h2 className="mb-4 fw-bold text-body mt-4">Create Candidate</h2>

      <form className="row g-4 p-4 bg-body text-body rounded">
        <div className="col-md-8">
          <label htmlFor="candidateName" className="form-label">
            Candidate Name
          </label>
          <input
            type="text"
            className="form-control"
            id="candidateName"
            placeholder="Enter full name"
            required
          />
        </div>

        <div className="col-md-8">
          <label htmlFor="candidateParty" className="form-label">
            Political Party
          </label>
          <input
            type="text"
            className="form-control"
            id="candidateParty"
            placeholder="Enter party name"
            required
          />
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