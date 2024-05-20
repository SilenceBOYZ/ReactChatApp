import Conversation from "./Conversation"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { fetchConversation } from "../../store/slices/conversationSlice";

function Conversations() {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(state => state.conversation);

  useEffect(() => {
    dispatch(fetchConversation())
  }, [dispatch])
  return (
    <>
      {isLoading ? <div>Loading</div> :
        <div className="py-2 flex flex-col overflow-auto space-y-2">
          {data.map(conversation => <Conversation key={conversation._id} infor={conversation}/>)}
        </div>
      }
    </>
  )
}

export default Conversations
