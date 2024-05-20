import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import instance from "../config/axios";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const success = handleInputErrors(username, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await instance.post("/api/auth/login", { username, password }); 
      const data = res;
      if (data.errCode === 0) {
        localStorage.setItem("chat-user", JSON.stringify(data.data));
        setAuthUser(data);
      }
      if (data.errCode === 1) throw new Error(data.errMessage);
      if (data.errCode === 2) throw new Error(data.errMessage);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}