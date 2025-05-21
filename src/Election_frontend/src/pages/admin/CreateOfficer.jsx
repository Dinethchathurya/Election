import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Election_backend } from "declarations/Election_backend";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";

const CreateOfficer = () => {
  const [officerId, setOfficerId] = useState(null);
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const districts = [
    "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
    "Galle", "Matara", "Hambantota", "Jaffna", "Wanni", "Batticaloa",
    "Digamadulla", "Trincomalee", "Kurunegala", "Puttalam", "Anuradhapura",
    "Polonnaruwa", "Badulla", "Monaragala", "Ratnapura", "Kegalle",
  ];

  const loginWithIdentity = async () => {
    const client = await AuthClient.create();
    await client.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: async () => {
        const identity = client.getIdentity();
        const principal = identity.getPrincipal().toText();
        sessionStorage.setItem("principal", principal);
        setOfficerId(principal);
        setAuthClient(client);
        setIsAuthenticated(true);
      },
    });
  };

  const logoutAfterSubmit = async () => {
    if (authClient) {
      await authClient.logout();
      sessionStorage.removeItem("principal");
      setOfficerId(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const loadSession = async () => {
      const stored = sessionStorage.getItem("principal");
      if (stored) {
        setOfficerId(stored);
        setIsAuthenticated(true);
        const client = await AuthClient.create();
        setAuthClient(client);
      }
    };
    loadSession();
  }, []);

  const onSubmit = async (data) => {
    try {
      const storedElectionId =
        localStorage.getItem("electionId") || "a4tbr-q4aaa-aaaaa-qaafq-cai";
      const electionId = Principal.fromText(storedElectionId);

      if (!officerId) {
        alert("❌ Please log in with Internet Identity first.");
        return;
      }

      const officerPrincipal = Principal.fromText(officerId);

      const response = await Election_backend.createElectionOfficer(
        electionId,
        officerPrincipal,
        data.officerName,
        data.pollingStation,
        data.pollingDivision,
        data.district
      );

      console.log("✅ Officer Created:", response);
      alert("✅ Officer Created Successfully!");

      // ✅ Logout after success
      await logoutAfterSubmit();
    } catch (err) {
      console.error("❌ Failed to create officer:", err);
      alert("Error: " + (err.message || "Unexpected error occurred."));
    }
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-body text-body">
      <h2 className="mb-4 fw-bold text-body mt-4">Create Officer</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="row g-4 p-4 bg-body text-body rounded shadow-sm"
      >
        {/* Login Section */}
        <div className="col-12">
          {!isAuthenticated ? (
            <button
              type="button"
              onClick={loginWithIdentity}
              className="btn btn-outline-primary"
            >
              🔐 Login with Internet Identity
            </button>
          ) : (
            <div className="alert alert-success">
              Logged in as: <code>{officerId}</code>
            </div>
          )}
        </div>

        {/* Officer Name */}
        <div className="col-md-6">
          <label htmlFor="officerName" className="form-label">Officer Name</label>
          <input
            id="officerName"
            className={`form-control ${errors.officerName ? "is-invalid" : ""}`}
            placeholder="Full Name"
            {...register("officerName", { required: "Name is required" })}
          />
          {errors.officerName && (
            <div className="invalid-feedback">{errors.officerName.message}</div>
          )}
        </div>

        {/* Polling Station */}
        <div className="col-md-6">
          <label htmlFor="pollingStation" className="form-label">Polling Station</label>
          <input
            id="pollingStation"
            className={`form-control ${errors.pollingStation ? "is-invalid" : ""}`}
            placeholder="Station Name"
            {...register("pollingStation", { required: "Polling station is required" })}
          />
          {errors.pollingStation && (
            <div className="invalid-feedback">{errors.pollingStation.message}</div>
          )}
        </div>

        {/* Polling Division */}
        <div className="col-md-6">
          <label htmlFor="pollingDivision" className="form-label">Polling Division</label>
          <input
            id="pollingDivision"
            className={`form-control ${errors.pollingDivision ? "is-invalid" : ""}`}
            placeholder="Division Name"
            {...register("pollingDivision", { required: "Polling division is required" })}
          />
          {errors.pollingDivision && (
            <div className="invalid-feedback">{errors.pollingDivision.message}</div>
          )}
        </div>

        {/* District */}
        <div className="col-md-6">
          <label htmlFor="district" className="form-label">District</label>
          <select
            id="district"
            className={`form-select ${errors.district ? "is-invalid" : ""}`}
            {...register("district", { required: "District is required" })}
          >
            <option value="">Choose District</option>
            {districts.map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>
          {errors.district && (
            <div className="invalid-feedback">{errors.district.message}</div>
          )}
        </div>

        {/* Submit */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Create Officer
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateOfficer;