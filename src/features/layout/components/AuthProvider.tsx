import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.authKey);

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthProvider;
