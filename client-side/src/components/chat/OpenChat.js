import OpenChatContactRow from "./OpenChatContactRow";
import OpenChatMessages from "./OpenChatMessages";

export default function OpenChat({ user, chatId, myId }) {
  return (
    <>
      <OpenChatContactRow user={user} />
      <OpenChatMessages chatId={chatId} myId={myId} />
      <div id="chat_input" className="chat_row row ms-0 me-0">
        <input id="input_message" className="col-10" />
        <button className="col-2">send</button>
      </div>
    </>
  );
}
