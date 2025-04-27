import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminNavBar from "../../components/admin/AdminNavBar";
import HomePage from "./HomePage";
import CreateElectionPage from "./CreateElectionPage";

const AdminHomePage = ({ setTheme }) => {
  return (
    <>
      <AdminNavBar setTheme={setTheme} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2 p-0 text-white min-vh-100">
            <AdminSideBar />
          </div>

          {/* <HomePage /> */}
          <CreateElectionPage />
        </div>
      </div>
    </>
  );
};

export default AdminHomePage;
