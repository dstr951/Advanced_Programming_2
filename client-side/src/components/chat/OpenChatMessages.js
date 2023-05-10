import Message from "./Message"

export default function OpenChatMessages({messages, myId}) {
  return (
    <div id="message_box" className="row">
      <div className="messages-buffer"></div>
      <div className="messages">
        {messages.map((m, index) => (
          <Message message={m} myId={myId} key={index} />
        ))}
      </div>
    </div>
  );
}
