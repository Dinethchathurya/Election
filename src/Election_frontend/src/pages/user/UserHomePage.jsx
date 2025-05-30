import { useNavigate } from "react-router-dom";
import "../../../public/css/userHomePage.css";

const UserHomePage = () => {
  const navigate = useNavigate();

  const handleLanguageSelect = (lang) => {
    localStorage.setItem("language", lang);
    navigate("/auth"); // or wherever you want to redirect
  };

  return (
    <div className="container-fluid min-vh-100">
      <div className="row h-100">
        <div className="col-md-6 left-banner d-none d-md-block"></div>

        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center p-4">
          <img src="/assets/govlogo.png" alt="Emblem" className="emblem mb-3" />
          <h2 className="mb-4 fw-bold">Sri Lanka Election Portal</h2>
          <button className="lang-btn" onClick={() => handleLanguageSelect("si")}>සිංහල</button>
          <button className="lang-btn" onClick={() => handleLanguageSelect("ta")}>தமிழ்</button>
          <button className="lang-btn" onClick={() => handleLanguageSelect("en")}>English</button>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;