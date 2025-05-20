import "../../../public/css/userHomePage.css";

const UserHomePage = () => {
  return (
    <div className="container-fluid min-vh-100">
      <div className="row h-100">
        {/* Left flag side */}
        <div className="col-md-6 left-banner d-none d-md-block"></div>

        {/* Right content side */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center p-4">
          <img src="/assets/govlogo.png" alt="Emblem" className="emblem mb-3" />
          <h2 className="mb-4 fw-bold">Sri Lanka Election Portal</h2>
          <button className="lang-btn">සිංහල</button>
          <button className="lang-btn">தமிழ்</button>
          <button className="lang-btn">English</button>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;