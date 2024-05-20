import { createContext, useContext, useState } from "react"

const AuthProvider = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthProvider);
  if (context === undefined) throw new Error("Use context out side the app")
  return context
}

function AuthContext({ children }) {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null)
  return (
    <AuthProvider.Provider value={{ authUser, setAuthUser }}>{children}</AuthProvider.Provider>
  )
}

export default AuthContext
