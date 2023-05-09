export default function Message({message, myId}){
	const {content, timeSent, senderId} = message
	const messageClass = senderId === myId ? "message-out" : "message-in"
	return(
		<div class="row m-0">
          <div class="message col-12">
            <div class={messageClass}>
              <span class="message-text">{content}</span>
              <span class="message-time">{timeSent.getHours()}:{timeSent.getMinutes()}</span>
            </div>
          </div>
        </div>
	)
}