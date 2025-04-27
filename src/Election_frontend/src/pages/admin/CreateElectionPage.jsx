const CreateElectionPage = () => {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-body text-body">
      <h2 className="mb-4 fw-bold text-body  mt-4">Create Election</h2>
      <form className="col g-3 bg-body text-body">
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label mt-2">
            Election Type
          </label>
          <select id="inputState" className="form-select">
            <option disabled selected>Choose...</option>
            <option>Presidential</option>
            <option disabled>Parliamentary</option>
            <option disabled>Provincial</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label mt-2">
            Election Date
          </label>
          <input type="date" className="form-control" id="inputPassword4" />
        </div>

        {/* Create Button */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary mt-4">
            Create Election
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateElectionPage;