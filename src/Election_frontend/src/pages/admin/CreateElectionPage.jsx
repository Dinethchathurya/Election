const CreateElectionPage = () => {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-body text-body">
      <h2 className="mb-4 fw-bold text-body  mt-4">Create Election</h2>
      <form className="col g-3 bg-body text-body" method="POST">
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label mt-2">
            Election Date
          </label>
          <input type="date" className="form-control" id="inputPassword4" />
        </div>
      
        <label htmlFor="inputPassword4" className="form-label mt-4">
          Election Type
        </label>
        <div className="dropdown col-md-6 ">
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Choose Election Type
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Presidential
              </a>
            </li>
            <li>
              <a className="dropdown-item disabled" href="#">
                Parliamentary
              </a>
            </li>
            <li>
              <a className="dropdown-item disabled" href="#">
                Provincial
              </a>
            </li>
          </ul>
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
