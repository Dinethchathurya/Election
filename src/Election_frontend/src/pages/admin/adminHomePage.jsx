const AdminHomePage = ({ setTheme }) => {
  return (
    <>
      <nav className="navbar bg-body-tertiary px-4">
        <span className="navbar-brand">Theme Toggle Example</span>
        <div className="dropdown">
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Theme
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button
                className="dropdown-item"
                onClick={() => setTheme("light")}
              >
                Light
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setTheme("dark")}
              >
                Dark
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <main className="container py-5">
        <h1>Hello, world!</h1>
        <p>This is a demo of Bootstrap theme toggling in React.</p>
      </main>
    </>
  );
};

export default AdminHomePage;