import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation";
import instance from "../config/axios";
import toast from "react-hot-toast";

function useGetMessages() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();


  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await instance.get(`/api/message/${selectedConversation._id}`);
        const data = res;
        if (data.error) throw new Error(data.error);
        setMessages(data)
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages])

  return { messages, loading }
}

export default useGetMessages
