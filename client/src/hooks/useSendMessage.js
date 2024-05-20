import { useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast"
import instance from "../config/axios";

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await instance.post(`/api/message/send/${selectedConversation._id}`, {
        message
      })
      const data = await res;
      if (data.error) throw new Error(data.error)
      setMessages([...messages, data]);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { sendMessage, loading }

}

export default useSendMessage
