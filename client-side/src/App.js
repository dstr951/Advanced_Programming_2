import "./chats.css";
import UserChatRow from "./components/chat/UserChatRow.js"
import ChatRow from "./components/chat/ChatRow.js"
import OpenChat from "./components/chat/OpenChat.js"

function App() {
  return (
    <>
      <div class="background-jumbo"></div>
      <div class="row justify-content-end mt-2 mb-4">
        <div class="col-1">
          <button class="btn btn-danger">Logout</button>
        </div>
      </div>
      <div id="chat_window" class="row">
        <div id="chat_card" class="col-12">
          <div id="panels_row" class="row m-0">
            <div id="conversations_panel" class=" col-5 chat-panel">
              <UserChatRow />
              <div id="conversations">
                <ChatRow />
              </div>
            </div>
            <div id="messages_panel" class=" col-7 chat-panel">
              <OpenChat />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
