import ThemeButton from "./ThemeButton";

const NavBar = ({ setTheme }) => {
  return (
    <>
      <header className="navbar bg-body text-body shadow-sm p-3 d-flex align-items-center">
        <div className="container d-flex justify-content-between align-items-center">
          <a
            href="/"
            className="d-flex align-items-center text-decoration-none"
          >
            <img
              src="/assets/govlogo.png"
              alt="ballotPaper"
              height="60"
              className="me-3"
            />
            <p className="fs-4 m-0 text-primary">Sri Lanka Election Portal</p>
          </a>
          <ThemeButton setTheme={setTheme} />
        </div>
        
      </header>
    </>
  );
};
export default NavBar;
