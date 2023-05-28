import {useEffect, useState} from "react"
import {getLastChatMessage, getUser} from "../../apiTemp"

export default function ChatRow({
  user,
  chatId,
  lastMessage,
  forceUpadteMessages,
  changeOpenChatId,
  changeOpenUser,
  active,
}) {
  const [messages, setMessages] = useState([])
  const navigate = useNavigate();
  async function updateMessages(){
    const response = await getChat(token, chatId)
    switch(response.status){
      case HttpCodes.SUCCESS:
          const data = await response.json()
          setMessages(data)
          break;
      case HttpCodes.UNAUTHERIZED:
          navigate('/')
          break;
      default:
          console.log("unexpected HTTP code on response from getChat:", response.status)
    }
  }
  useEffect(() => {
    updateMessages()
  }, [])
  function displayLastMessage() {
    return (
      <>
        <div className="col-5">
          <div className="date">{lastMessage?.created?.toString()}</div>
        </div>
        <div className="col-12 last_msg fw-lighter fst-italic">
          {lastMessage?.content}
        </div>
      </>
    )
  }

  function click() {
    changeOpenChatId(chatId)
    changeOpenUser(user)
  }

  // const [lastMessage, setLastMessage] = useState({});
  // //hook to get the lastMessage from the server
  // useEffect(() => {
  //   const response = getLastChatMessage(chatId);
  //   if (response.code === 200) {
  //     setLastMessage(response.body.lastMessage);
  //   }
  // }, [chatId, forceUpadteMessages]);

  const activeClass = active ? " active_chat" : ""
  return (
    <div className={"row chat-row" + activeClass} onClick={click}>
      <div className="col-2 profile-container">
        <img alt="img" src={user.profilePic} />
      </div>
      <div className="col-10 d-flex">
        <div className="row name-time-last-message-container">
          <div className="col-7 contact_name fw-bold">{user.displayName}</div>
          {displayLastMessage()}
        </div>
      </div>
    </div>
  )
}
