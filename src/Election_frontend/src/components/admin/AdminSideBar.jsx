import { NavLink } from "react-router-dom";
import AdminIcon from "./AdminIcon.";
import React from "react";

const AdminSideBar = () => {
  return (
    <div
      className="p-3 d-flex flex-column bg-body text-body"
      style={{ height: "100vh" }}
    >
      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "text-body"}`
            }
          >
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#home" />
            </svg>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/create-election"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "text-body"}`
            }
          >
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#speedometer2" />
            </svg>
            Create Election
          </NavLink>
        </li>
{/* 
        <li>
          <NavLink
            to="/create-admin"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "text-body"}`
            }
          >
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#table" />
            </svg>
            Create Admin
          </NavLink>
        </li> */}

        <li>
          <NavLink
            to="/create-officer"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "text-body"}`
            }
          >
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#grid" />
            </svg>
            Create Officer
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/create-candidate"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "text-body"}`
            }
          >
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#people-circle" />
            </svg>
            Create Candidate
          </NavLink>
        </li>
      </ul>

      {/* <AdminIcon /> */}
    </div>
  );
};

export default AdminSideBar;
