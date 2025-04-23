import ThemeButton from "../../components/admin/themeButton";

const AdminHomePage = ({ setTheme }) => {
  return (
    <>
      <nav className="navbar bg-body-tertiary px-4">
        <span className="navbar-brand">Theme Toggle Example</span>
        <ThemeButton setTheme={setTheme} />
      </nav>
      <main className="container py-5">
        <h1>Hello, world!</h1>
        <p>This is a demo of Bootstrap theme toggling in React.</p>
      </main>
    </>
  );
};

export default AdminHomePage;