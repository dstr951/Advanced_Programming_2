import OpenChatContactRow from "./OpenChatContactRow"
import OpenChatMessages from "./OpenChatMessages"

import {useState} from "react"
import {sendMessage} from "../../apiTemp"

export default function OpenChat({user, chatId, myId}) {
  const [messageContent, setMessageContent] = useState("")

  function inputChange(e) {
    setMessageContent(e.target.value)
  }

  function sendMessageHandler(e) {
    e.preventDefault()
    sendMessage(messageContent, myId, chatId)
    setMessageContent("")
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
