// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Election_backend } from "declarations/Election_backend";
// import { Principal } from "@dfinity/principal";
// import { AuthClient } from "@dfinity/auth-client";

// const CreateAdminPage = () => {
//   const [authClient, setAuthClient] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const {
//     register,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const loginWithIdentity = async () => {
//     const client = await AuthClient.create();
//     await client.login({
//       identityProvider: "https://identity.ic0.app",
//       onSuccess: async () => {
//         const identity = client.getIdentity();
//         const principal = identity.getPrincipal().toText();
//         sessionStorage.setItem("principal", principal);
//         setOfficerId(principal);
//         setAuthClient(client);
//         setIsAuthenticated(true);
//       },
//     });
//   };

//   const logoutAfterSubmit = async () => {
//     if (authClient) {
//       await authClient.logout();
//       sessionStorage.removeItem("principal");
//       setOfficerId(null);
//       setIsAuthenticated(false);
//     }
//   };


//   const onSubmit = async (data) => {
//     try {
//       const principal = Principal.fromText(data.internetId);

//       const response = await Election_backend.createElectionAdmin(
//         principal,
//         `${data.firstName} ${data.lastName}`
//       );

//       console.log("✅ Admin Created:", response);
//       alert("✅ Admin Created Successfully!");

//       await logoutAfterSubmit(); // ✅ Logout after successful registration
//     } catch (err) {
//       console.error("❌ Failed to create admin:", err);
//       alert("Error: " + (err.message || "Unexpected error"));
//     }
//   };

//   return (
//     <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-body text-body">
//       <h2 className="mb-4 fw-bold text-body mt-4">Create Admin</h2>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="row g-4 p-4 bg-body text-body rounded shadow-sm"
//       >
//         {/* First Name */}
//         <div className="col-md-6">
//           <label className="form-label">First Name</label>
//           <input
//             className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
//             {...register("firstName", { required: "First name is required" })}
//             placeholder="First Name"
//           />
//           {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
//         </div>

//         {/* Last Name */}
//         <div className="col-md-6">
//           <label className="form-label">Last Name</label>
//           <input
//             className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
//             {...register("lastName", { required: "Last name is required" })}
//             placeholder="Last Name"
//           />
//           {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
//         </div>

//         {/* Email */}
//         <div className="col-12">
//           <label className="form-label">Email</label>
//           <input
//             className={`form-control ${errors.email ? "is-invalid" : ""}`}
//             {...register("email", {
//               required: "Email is required",
//               pattern: { value: /^\S+@\S+$/, message: "Invalid email format" },
//             })}
//             placeholder="example@email.com"
//           />
//           {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
//         </div>

//         {/* Address */}
//         <div className="col-12">
//           <label className="form-label">Address</label>
//           <input
//             className={`form-control ${errors.address ? "is-invalid" : ""}`}
//             {...register("address", { required: "Address is required" })}
//             placeholder="Street, Building, etc."
//           />
//           {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
//         </div>

//         {/* Internet Identity Field */}
//         <div className="col-md-9">
//           <label className="form-label">Internet Identity</label>
//           <input
//             className={`form-control ${errors.internetId ? "is-invalid" : ""}`}
//             {...register("internetId", { required: "Internet Identity is required" })}
//             placeholder="Principal will be auto-filled after login"
//             readOnly
//           />
//           {errors.internetId && <div className="invalid-feedback">{errors.internetId.message}</div>}
//         </div>

//         {/* Login Button */}
//                 {/* Login Section */}
//         <div className="col-12">
//           {!isAuthenticated ? (
//             <button
//               type="button"
//               onClick={loginWithIdentity}
//               className="btn btn-outline-primary"
//             >
//               🔐 Login with Internet Identity
//             </button>
//           ) : (
//             <div className="alert alert-success">
//               Logged in as: <code>{officerId}</code>
//             </div>
//           )}
//         </div>

//         {/* Submit */}
//         <div className="col-12">
//           <button type="submit" className="btn btn-primary">
//             Create Admin
//           </button>
//         </div>
//       </form>
//     </main>
//   );
// };

// export default CreateAdminPage;



import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Election_backend } from "declarations/Election_backend";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";

const CreateAdminPage = () => {
  const [authClient, setAuthClient] = useState(null);
  const [adminPrincipal, setAdminPrincipal] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginWithIdentity = async () => {
    const client = await AuthClient.create();
    await client.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: async () => {
        const identity = client.getIdentity();
        const principal = identity.getPrincipal().toText();
        sessionStorage.setItem("principal", principal);
        setValue("internetId", principal); // ✅ Autofill input
        setAdminPrincipal(principal);      // ✅ Set state
        setAuthClient(client);
        setIsAuthenticated(true);
      },
    });
  };

  const logoutAfterSubmit = async () => {
    if (authClient) {
      await authClient.logout();
      sessionStorage.removeItem("principal");
      setAdminPrincipal(null);
      setIsAuthenticated(false);
      setValue("internetId", "");
    }
  };

  const onSubmit = async (data) => {
    try {
      const principal = Principal.fromText(data.internetId);

      const response = await Election_backend.createElectionAdmin(
        principal,
        `${data.firstName} ${data.lastName}`
      );

      console.log("✅ Admin Created:", response);
      alert("✅ Admin Created Successfully!");

      await logoutAfterSubmit(); // ✅ Logout after registration
    } catch (err) {
      console.error("❌ Failed to create admin:", err);
      alert("Error: " + (err.message || "Unexpected error"));
    }
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-body text-body">
      <h2 className="mb-4 fw-bold text-body mt-4">Create Admin</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="row g-4 p-4 bg-body text-body rounded shadow-sm"
      >
        {/* First Name */}
        <div className="col-md-6">
          <label className="form-label">First Name</label>
          <input
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            {...register("firstName", { required: "First name is required" })}
            placeholder="First Name"
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
        </div>

        {/* Last Name */}
        <div className="col-md-6">
          <label className="form-label">Last Name</label>
          <input
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            {...register("lastName", { required: "Last name is required" })}
            placeholder="Last Name"
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
        </div>

        {/* Email */}
        <div className="col-12">
          <label className="form-label">Email</label>
          <input
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/, message: "Invalid email format" },
            })}
            placeholder="example@email.com"
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>

        {/* Address */}
        <div className="col-12">
          <label className="form-label">Address</label>
          <input
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            {...register("address", { required: "Address is required" })}
            placeholder="Street, Building, etc."
          />
          {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
        </div>

        {/* Internet Identity Field */}
        <div className="col-md-9">
          <label className="form-label">Internet Identity</label>
          <input
            className={`form-control ${errors.internetId ? "is-invalid" : ""}`}
            {...register("internetId", { required: "Internet Identity is required" })}
            placeholder="Principal will be auto-filled after login"
            readOnly
          />
          {errors.internetId && <div className="invalid-feedback">{errors.internetId.message}</div>}
        </div>

        {/* Login Section */}
        <div className="col-md-3 d-flex align-items-end">
          {!isAuthenticated ? (
            <button
              type="button"
              onClick={loginWithIdentity}
              className="btn btn-outline-primary w-100"
            >
              🔐 Login with Internet Identity
            </button>
          ) : (
            <div className="alert alert-success w-100 mb-0">
              Logged in as: <code>{adminPrincipal}</code>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Create Admin
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateAdminPage;