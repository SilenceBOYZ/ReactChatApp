import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import instance from "../config/axios";


function useSignup() {
  const [isLoading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
    const isSuccess = handleInputErrors({ fullName, username, password, confirmPassword, gender })
    setLoading(true);
    if (!isSuccess) return;
    try {
      const res = await instance.post('/api/auth/signup', { fullName, username, password, confirmPassword, gender });
      setLoading(true);
      const data = await res;
      if (data.errCode === 2) throw new Error(data.errMessage)
      if (data.errCode === 1) throw new Error(data.errMessage)
      if (data.errCode === 0) {
        let userToken = localStorage.setItem("chat-user", JSON.stringify(data.data))
        setAuthUser(userToken);
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return { signup, isLoading }
}

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.trim().length < 0) {
    toast.error("Passwords must be at least 6 characters");
    return false;
  }
  return true
}

export default useSignup
