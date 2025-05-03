const CreateAdminPage = () => {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-body text-body">
      <h2 className="mb-4 fw-bold text-body  mt-4">Create Admin</h2>
      <form className="row g-3 bg-body text-body">
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            First Name
          </label>
          <input type="name" className="form-control" id="inputEmail4" placeholder="First Name"/>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Last Name
          </label>
          <input type="text" className="form-control" id="inputPassword4"placeholder="Last Name" />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputAddress"
            placeholder="abc2@gmail.com"
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress2" className="form-label">
            Address 1
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Internet Identity
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="Internet Identity"
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </div>
      </form>
    </main>
  );
};
export default CreateAdminPage;
