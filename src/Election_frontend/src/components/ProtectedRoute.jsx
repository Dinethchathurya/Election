import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authClient = await AuthClient.create();
      const isAuthenticated = await authClient.isAuthenticated();
      setAuthenticated(isAuthenticated);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) return <div className="text-center mt-5">🔐 Checking authentication...</div>;

  return authenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;