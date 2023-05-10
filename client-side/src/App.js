import "./chats.css";
import UserChatRow from "./components/chat/UserChatRow.js"
import ChatRow from "./components/chat/ChatRow.js"
import OpenChat from "./components/chat/OpenChat.js"

function App() {
  return (
    <>
      <div className="background-jumbo"></div>
      <div className="row justify-content-end mt-2 mb-4">
        <div className="col-1">
          <button className="btn btn-danger">Logout</button>
        </div>
      </div>
      <div id="chat_window" className="row">
        <div id="chat_card" className="col-12">
          <div id="panels_row" className="row m-0">
            <div id="conversations_panel" className=" col-5 chat-panel">
              <UserChatRow />
              <div id="conversations">
                <ChatRow />
              </div>
            </div>
            <div id="messages_panel" className=" col-7 chat-panel">
              <OpenChat />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
