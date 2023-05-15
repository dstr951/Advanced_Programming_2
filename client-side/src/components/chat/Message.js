export default function Message({message, myId}){
	const {content, timeSent, senderId} = message
	const messageClass = senderId === myId ? "message-out" : "message-in"
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