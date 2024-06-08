import {useContext} from "react"
import Message from "./Message"
import { chatContext } from "../../ChatsPage"

export default function OpenChatMessages() {
  const {messages} = useContext(chatContext)
  return (
    <div id="message_box" className="row">
      <div className="messages-buffer"></div>
      <div className="messages">
        {messages && messages.map((m, index) => (
          <Message message={m} key={index} />
        ))}
      </div>
    </div>
  )
}
