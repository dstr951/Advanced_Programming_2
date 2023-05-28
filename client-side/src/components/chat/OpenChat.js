import OpenChatContactRow from "./OpenChatContactRow"
import OpenChatMessages from "./OpenChatMessages"
import { useNavigate } from "react-router-dom";
import {useState} from "react"
import {HttpCodes, sendMessage} from "../../api"

export default function OpenChat({user, chatId, token, updateChats}) {
  const [messageContent, setMessageContent] = useState("")
  const navigate = useNavigate();

  function inputChange(e) {
    setMessageContent(e.target.value)
  }

  async function sendMessageHandler(e) {
    e.preventDefault()
    setMessageContent("")
    const response = await sendMessage(token, chatId, messageContent)
    switch(response.status){
      case HttpCodes.SUCCESS:
        updateChats()
        break;
      case HttpCodes.UNAUTHERIZED:
        navigate('/')
        break;
      default:
        console.log("unexpected HTTP code on response from sendMessage:", response.status)
    }
  }

  return (
    <>
      <OpenChatContactRow user={user} />
      <OpenChatMessages />
      <div id="chat_input" className="chat_row row ms-0 me-0">
        <input
          id="input_message"
          className="col-10"
          value={messageContent}
          onChange={inputChange}
        />
        <button
          className="col-2"
          onClick={sendMessageHandler}
          disabled={messageContent === ""}
        >
          send
        </button>
      </div>
    </>
  )
}
