import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";

function ProtectRoute({ children, path = "/login" }) {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) navigate(`${path}`)
    else navigate("/")
  }, [navigate, authUser, path])

  return children
}

export default ProtectRoute
