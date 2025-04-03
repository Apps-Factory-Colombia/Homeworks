import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
  const { user } = useAuth();

  return user ? <Navigate to="/profile" /> : <Outlet />;
};

export default PublicRoute;

// Explanation basicamente:
// In this file, we import the Navigate and Outlet components from react-router-dom, as well as the useAuth hook from the AuthContext file. We then create a functional component called PublicRoute that checks if the user is authenticated by accessing the user object from the AuthContext. If the user is authenticated, the component redirects the user to the /profile route using the Navigate component. If the user is not authenticated, the component renders the Outlet component, which is used to render the child routes of the current route.
