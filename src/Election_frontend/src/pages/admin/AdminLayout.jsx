import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminNavBar from "../../components/admin/AdminNavBar";
import HomePage from "./HomePage";
import CreateElectionPage from "./CreateElectionPage";
import { Routes, Route } from "react-router-dom";
import CreateAdmin from "./CreateAdmin";
import CreateCandidatePage from "./CreateCandidate";
import CreateOfficer from "./CreateOfficer";

const AdminHomePage = ({ setTheme }) => {
  return (
    <>
      <AdminNavBar setTheme={setTheme} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2 p-0 text-white min-vh-100">
            <AdminSideBar />
          </div>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create-election" element={<CreateElectionPage />} />
              <Route path="/create-admin" element={<CreateAdmin />} />
              <Route path="/create-candidate" element={<CreateCandidatePage />} />
              <Route path="/create-officer" element={<CreateOfficer />} />
              {/* Add more routes here if needed */}
            </Routes>
        </div>
      </div>
    </>
  );
};

export default AdminHomePage;
