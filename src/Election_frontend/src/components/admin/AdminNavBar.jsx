import ThemeButton from "./themeButton";

const AdminNavBar = ({ setTheme }) => {
  return (
    <>
      <nav className="navbar bg-body-tertiary px-4 sticky-top">
        <span className="navbar-brand">Election commission of Sri Lanka</span>
        <ThemeButton setTheme={setTheme} />
      </nav>
    </>
  );
};
export default AdminNavBar;
