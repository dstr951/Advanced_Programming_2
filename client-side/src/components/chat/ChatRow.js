import {useEffect, useRef, useState} from "react"
import {useNavigate} from "react-router-dom";
import {HttpCodes, getChat} from "../../api"

export default function ChatRow({
  user,
  chatId,
  lastMessage,
  token,
  changeOpenMessages,
  changeOpenChatId,
  changeOpenUser,
  active,
}) {
  const messages = useRef([])
  const [prevLastMessageId, setPrevLastMessageId] = useState(-1)
  const navigate = useNavigate();
  async function updateMessages(){
    if(!lastMessage || lastMessage.id === prevLastMessageId) {
      return
    }
    setPrevLastMessageId(lastMessage.id)
    const response = await getChat(token, chatId)
    switch(response.status){
      case HttpCodes.SUCCESS:
          const data = await response.json()
          messages.current = data
          if(active){
            changeOpenMessages(messages.current)
          }
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
  }, [lastMessage])  

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

  function updateOpenMessages(newMessagesArray) {
    changeOpenMessages(newMessagesArray)
  }

  function click() {
    changeOpenMessages(messages.current)
    changeOpenChatId(chatId)
    changeOpenUser(user)
  }

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
