const CreateOfficer = () => {
  const districts = [
    "Colombo", "Gampaha", "Kalutara",
    "Kandy", "Matale", "Nuwara Eliya",
    "Galle", "Matara", "Hambantota",
    "Jaffna", "Wanni",
    "Batticaloa", "Digamadulla", "Trincomalee",
    "Kurunegala", "Puttalam",
    "Anuradhapura", "Polonnaruwa",
    "Badulla", "Monaragala",
    "Ratnapura", "Kegalle"
  ];

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-body text-body">
      <h2 className="mb-4 fw-bold text-body mt-4">Create Officer</h2>

      <form className="row g-4 p-4 bg-body text-body rounded">
        <div className="col-md-6">
          <label htmlFor="electionId" className="form-label">
            Election ID
          </label>
          <input type="text" className="form-control" id="electionId" placeholder="Enter Election ID" />
        </div>

        <div className="col-md-6">
          <label htmlFor="officerId" className="form-label">
            Election Officer ID
          </label>
          <input type="text" className="form-control" id="officerId" placeholder="Enter Officer ID" />
        </div>

        <div className="col-12">
          <label htmlFor="officerName" className="form-label">
            Election Officer Name
          </label>
          <input type="text" className="form-control" id="officerName" placeholder="Full Name" />
        </div>

        <div className="col-md-6">
          <label htmlFor="pollingStation" className="form-label">
            Polling Station
          </label>
          <input type="text" className="form-control" id="pollingStation" placeholder="Station Name" />
        </div>

        <div className="col-md-6">
          <label htmlFor="pollingDivision" className="form-label">
            Polling Division
          </label>
          <input type="text" className="form-control" id="pollingDivision" placeholder="Division Name" />
        </div>

        <div className="col-md-6">
          <label htmlFor="district" className="form-label">
            District
          </label>
          <select id="district" className="form-select">
            <option disabled selected>Choose District</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

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