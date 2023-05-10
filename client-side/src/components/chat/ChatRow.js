import { useEffect, useState } from "react";
import { getLastChatMessage, getUser } from "../../apiTemp";
export default function ChatRow({
  userId,
  chatId,
  changeOpenChatId,
  changeOpenUser,
  active,
}) {
  function click() {
    changeOpenChatId(chatId);
    changeOpenUser(user);
  }

  const [user, setUser] = useState({});
  //hook to get the user's data from the server
  useEffect(() => {
    const response = getUser(userId);
    if (response.code === 200) {
      setUser(response.body);
    }
  }, [userId]);

  const [lastMessage, setLastMessage] = useState({});
  //hook to get the lastMessage from the server
  useEffect(() => {
    const response = getLastChatMessage(chatId);
    if (response.code === 200) {
      setLastMessage(response.body.lastMessage);
    }
  }, [chatId]);

  const activeClass = active ? " active_chat" : "";
  return (
    <div className={"row chat-row" + activeClass} onClick={click}>
      <div className="col-2 profile-container">
        <img alt="img" src={user.picture} />
      </div>
      <div className="col-10 d-flex">
        <div className="row name-time-last-message-container">
          <div className="col-7 contact_name fw-bold">{user.displayName}</div>
          <div className="col-5">
            <div className="date">{lastMessage?.timeSent?.toString()}</div>
          </div>
          <div className="col-12 last_msg fw-lighter fst-italic">
            {lastMessage.content}
          </div>
        </div>
      </div>
    </div>
  );
}
