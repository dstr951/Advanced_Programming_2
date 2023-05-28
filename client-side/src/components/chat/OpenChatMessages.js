import {useContext} from "react"
import Message from "./Message"
import { messagesContext } from "../../ChatsPage"

export default function OpenChatMessages({myId}) {
  const messages = useContext(messagesContext)
  return (
    <div id="message_box" className="row">
      <div className="messages-buffer"></div>
      <div className="messages">
        {messages && messages.map((m, index) => (
          <Message message={m} myId={myId} key={index} />
        ))}
      </div>
    </div>
  )
}
