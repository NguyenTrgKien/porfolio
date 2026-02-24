import type React from "react";
import { Navigate } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAdmin();
  console.log(user);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default PrivateRoute;
