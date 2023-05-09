import Message from "./Message"

export default function OpenChatMessages({messages, myId}) {
  return (
    <div id="message_box" class="row">
      <div class="messages-buffer"></div>
      <div class="messages">
		{messages.map((m, index) => <Message message={m} myId={myId} key={index} />)}      
      </div>
    </div>
  );
}
