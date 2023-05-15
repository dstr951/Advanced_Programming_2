import { useEffect, useState } from "react";
import Message from "./Message";
import { getChatMessages } from "../../apiTemp";

export default function OpenChatMessages({ chatId, myId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const response = getChatMessages(chatId);
    if (response.code === 200) {
      setMessages(response.body.messages);
    }
  }, [chatId]);
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
