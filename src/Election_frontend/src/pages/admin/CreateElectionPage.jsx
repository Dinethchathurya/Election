import { useForm } from "react-hook-form";
import { Election_backend } from 'declarations/Election_backend';
import {Actor, HttpAgent} from "@dfinity/agent";
import { idlFactory, Election_Actor_Class } from 'declarations/Election_Actor_Class';
import { Principal } from "@dfinity/principal";


const CreateElectionPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Election Created:", data.electionDate);
    console.log("Election Type:", data.electionType);
    try {
      let electionType = data.electionType;
      let year = data.electionDate.split("-")[0]; // Extracting the year from the date
      console.log("Election Created:", year);
      console.log("Election Type:", electionType);
      let newid = await Election_backend.createElection(electionType, year);
      console.log(newid.toText());

    } catch (e) {
      console.log(e);
    }

  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-body text-body">
      <h2 className="mb-4 fw-bold text-body mt-4">Create Election</h2>
     
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="row g-4 p-4 bg-body text-body rounded shadow-sm"
      >
        {/* Election Date */}
        <div className="col-md-6">
          <label htmlFor="electionDate" className="form-label">
            Election Date
          </label>
          <input
            type="date"
            id="electionDate"
            className={`form-control ${errors.electionDate ? "is-invalid" : ""}`}
            {...register("electionDate", {
              required: "Election date is required",
            })}
          />
          {errors.electionDate && (
            <div className="invalid-feedback">
              {errors.electionDate.message}
            </div>
          )}
        </div>

        {/* Election Type */}
        <div className="col-md-6">
          <label htmlFor="electionType" className="form-label">
            Election Type
          </label>
          <select
            id="electionType"
            className={`form-select ${errors.electionType ? "is-invalid" : ""}`}
            {...register("electionType", {
              required: "Please select an election type",
            })}
          >
            <option value="">Choose...</option>
            <option value="presidential">Presidential</option>
            <option value="parliamentary" disabled>
              Parliamentary (Coming Soon)
            </option>
            <option value="provincial" disabled>
              Provincial (Coming Soon)
            </option>
          </select>
          {errors.electionType && (
            <div className="invalid-feedback">
              {errors.electionType.message}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary mt-2">
            Create Election
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateElectionPage;
