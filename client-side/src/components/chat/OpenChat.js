import OpenChatContactRow from "./OpenChatContactRow";
import OpenChatMessages from "./OpenChatMessages";

export default function OpenChat() {
  return (
    <>
      <OpenChatContactRow />
      <OpenChatMessages messages = {[{content: "aaa", timeSent: new Date(), senderId: 1}, {content: "aaa", timeSent: new Date(), senderId: 2}]} myId = {1}/>
      <div id="chat_input" className="chat_row row ms-0 me-0">
        <input id="input_message" className="col-10" />
        <button className="col-2">send</button>
      </div>
    </>
  );
}
