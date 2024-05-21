import Conversation from "./Conversation"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { fetchUserInConversation } from "../../store/slices/conversationSlice";
import { getRandomEmoji } from "../../utils/emojis";

function Conversations() {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(state => state.conversation);

  useEffect(() => {
    dispatch(fetchUserInConversation())
  }, [dispatch]);

  return (
    <>
      {isLoading ?
        <span className="loading loading-spinner mx-auto"></span> :
        <div className="py-2 flex flex-col overflow-auto space-y-2">
          {data?.length < 0 ? <div>NoConversation</div> : data?.map((conversation, idx) =>
            <Conversation
              key={conversation._id}
              infor={conversation}
              emoji={getRandomEmoji()}
              lastIdx={idx === data?.length - 1}
            />)}
        </div>
      }
    </>
  )
}

export default Conversations
