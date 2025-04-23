const ThemeButton = ({ setTheme })=>{
    return (
        <>
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
        </>
    );
};
export default ThemeButton;