import { useSocketContext } from "../../context/SocketContextProvider";
import useConversation from "../../zustand/useConversation";

function Conversation({ infor, emoji, lastIdx }) {
  const { _id: userId, username, profilePic } = infor;

  let imageSrc = ""
  if (!profilePic.length) {
    imageSrc = "https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
  } else {
    imageSrc = profilePic
  }
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === userId;

  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(infor._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`}
        id={userId}
        onClick={() => setSelectedConversation(infor)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className='w-12 rounded-full'>
            <img
              src={imageSrc}
              alt='user avatar'
            />
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>{username}</p>
            <span className='text-xl'>{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className='divider my-0 py-0 h-1' />}

    </>
  )
}

export default Conversation
