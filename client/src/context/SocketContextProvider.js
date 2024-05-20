import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (context === undefined) throw new Error("Use context out side the app")
  return context
}

function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:8080", {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);

      // socket.on() dùng để lắng nghe sự kiện
      socket.on("getOnlineUsers", (user) => {
        setOnlineUsers(user);
      })

      return () => socket.close()
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser])

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContextProvider
