import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function useLogout() {
  const [loading, setLoading] = useState();
  const { setAuthUser } = useAuthContext()

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      })
      const data = await res.json();
      if (data.errCode === 0) {
        localStorage.removeItem("chat-user")
        setAuthUser(null)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return { loading, logout };
}

export default useLogout
