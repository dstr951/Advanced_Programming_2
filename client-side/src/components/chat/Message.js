import {useContext} from "react"
import { chatContext } from "../../ChatsPage"

export default function Message({message}){
	const {content, created, sender} = message
  const timeSent = new Date(created)
  const {myUsername} = useContext(chatContext)
	const messageClass = sender.username === myUsername ? "message-out" : "message-in"
	return(
		<div className="row m-0">
          <div className="message col-12">
            <div className={messageClass}>
              <span className="message-text">{content}</span>
              <span className="message-time">{("00" + timeSent.getHours()).slice(-2)}:{("00" + timeSent.getMinutes()).slice(-2)}</span>
            </div>
          </div>
        </div>
	)
}