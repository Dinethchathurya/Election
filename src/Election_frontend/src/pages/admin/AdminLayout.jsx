import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminNavBar from "../../components/admin/AdminNavBar";
import HomePage from "./HomePage";
import CreateElectionPage from "./CreateElectionPage";
import { Routes, Route } from "react-router-dom";
import CreateAdminPage from "../AuthPage";
import CreateCandidatePage from "./CreateCandidate";
import CreateOfficer from "./CreateOfficer";
import NavBar from "../../components/admin/NavBar";



const AdminHomePage = ({ setTheme }) => {
  return (
    <>
      {/* <AdminNavBar setTheme={setTheme} /> */}
      <NavBar setTheme={setTheme} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2 p-0 text-white min-vh-100">
            <AdminSideBar />
          </div>
          <Routes>
            <Route index element={<HomePage />} />{" "}
            {/* ✅ This replaces path="/" */}
            <Route path="create-election" element={<CreateElectionPage />} />
            <Route path="create-admin" element={<CreateAdminPage />} />
            <Route path="create-candidate" element={<CreateCandidatePage />} />
            <Route path="create-officer" element={<CreateOfficer />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AdminHomePage;
