import OpenChatContactRow from "./OpenChatContactRow";
import OpenChatMessages from "./OpenChatMessages";

export default function OpenChat() {
  return (
    <>
      <OpenChatContactRow />
      <OpenChatMessages />
      <div id="chat_input" class="chat_row row ms-0 me-0">
        <input id="input_message" class="col-10" />
        <button class="col-2">send</button>
      </div>
    </>
  );
}
