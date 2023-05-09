export default function OpenChatContactRow() {
  return (
    <div id="conversation_info_row" class="row chat-row">
      <div class="col-2 profile-container">
        <img alt="img" src="pictures/face2.jpg" />
      </div>
      <div class="col-10 d-flex">
        <div class="row name-time-last-message-container">
          <div class="col-12 contact_name fw-bold">
            name another name and one more and even one more
          </div>
          <div class="col-12 last_msg fw-lighter fst-italic">online</div>
        </div>
      </div>
    </div>
  );
}
