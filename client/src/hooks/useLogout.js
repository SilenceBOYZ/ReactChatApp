import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import instance from "../config/axios";

function useLogout() {
  const [loading, setLoading] = useState();
  const { setAuthUser } = useAuthContext()

  const logout = async () => {
    setLoading(true);
    try {
      const res = await instance.post("/api/auth/logout")
      const data = await res;
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
