import Message from "./Message"
export default function OpenChatMessages() {
  return (
    <div id="message_box" class="row">
      <div class="messages-buffer"></div>
      <div class="messages">
        <Message />        
      </div>
    </div>
  );
}
