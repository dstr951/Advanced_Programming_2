import "./chats.css";
import UserChatRow from "./components/chat/UserChatRow.js"
import ChatRow from "./components/chat/ChatRow.js"

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
              <div id="conversation_info_row" class="row chat-row">
                <div class="col-2 profile-container">
                  <img alt="img" src="pictures/face2.jpg" />
                </div>
                <div class="col-10 d-flex">
                  <div class="row name-time-last-message-container">
                    <div class="col-12 contact_name fw-bold">
                      name another name and one more and even one more
                    </div>

                    <div class="col-12 last_msg fw-lighter fst-italic">
                      online
                    </div>
                  </div>
                </div>
              </div>

              <div id="message_box" class="row">
                <div class="messages-buffer"></div>
                <div class="messages">
                  <div class="row m-0">
                    <div class="message col-12">
                      <div class="message-in">
                        <span class="message-text">בדיקה של הודעה</span>
                        <span class="message-time">4:20</span>
                      </div>
                    </div>
                  </div>
                  <div class="row m-0">
                    <div class="message col-12">
                      <div class="message-in">
                        <span class="message-text">בדיקה של הודעה</span>
                        <span class="message-time">4:20</span>
                      </div>
                    </div>
                  </div>
                  <div class="row m-0">
                    <div class="message col-12">
                      <div class="message-in">
                        <span class="message-text">בדיקה של הודעה</span>
                        <span class="message-time">4:20</span>
                      </div>
                    </div>
                  </div>
                  <div class="row m-0">
                    <div class="message col-12">
                      <div class="message-in">
                        <span class="message-text">בדיקה של הודעה</span>
                        <span class="message-time">4:20</span>
                      </div>
                    </div>
                  </div>
                  <div class="row m-0">
                    <div class="message col-12">
                      <div class="message-in">
                        <span class="message-text">בדיקה של הודעה</span>
                        <span class="message-time">4:20</span>
                      </div>
                    </div>
                  </div>
                  <div class="row m-0">
                    <div class="message col-12">
                      <div class="message-in">
                        <span class="message-text">בדיקה של הודעה</span>
                        <span class="message-time">4:20</span>
                      </div>
                    </div>
                  </div>
                  <div class="row m-0">
                    <div class="message col-12">
                      <div class="message-in">
                        <span class="message-text">בדיקה של הודעה</span>
                        <span class="message-time">4:20</span>
                      </div>
                    </div>
                  </div>
                  <div class="row m-0">
                    <div class="message col-12">
                      <div class="message-out">
                        <span class="message-text">בדיקה של הודעה</span>
                        <span class="message-time">4:20</span>
                      </div>
                    </div>
                    <div class="row m-0">
                      <div class="message col-12">
                        <div class="message-out">
                          <span class="message-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed enim nisi, euismod eget elit et, rutrum
                            placerat nunc. Vestibulum non ligula ex. Donec
                            congue iaculis consequat. Etiam dui risus, semper
                            vel feugiat eu, porttitor in tortor. Pellentesque
                            vulputate mi velit, eu mollis libero pharetra vel.
                            Duis vitae massa nec sapien fringilla ornare.
                            Integer sed massa nec nunc condimentum lacinia.
                            Aenean malesuada nisi nec sem fringilla tincidunt.
                            Aenean volutpat elementum ante, facilisis ultrices
                            tortor semper sed. Integer sit amet purus vel dui
                            luctus suscipit. In rhoncus finibus luctus. Nulla
                            nec eros eget tellus blandit sollicitudin quis at
                            nulla.
                          </span>
                          <span class="message-time">22:56</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="chat_input" class="chat_row row ms-0 me-0">
                <input id="input_message" class="col-10" />
                <button class="col-2">send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
