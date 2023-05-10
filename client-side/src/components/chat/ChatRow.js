export default function ChatRow() {
  return (
    <div className="row chat-row active_chat">
      <div className="col-2 profile-container">
        <img alt="img" src="pictures/face2.jpg" />
      </div>
      <div className="col-10 d-flex">
        <div className="row name-time-last-message-container">
          <div className="col-7 contact_name fw-bold">
            name another name and one more and even one more
          </div>
          <div className="col-5">
            <div className="date">31/01/2023,10:56:34 PM</div>
          </div>
          <div className="col-12 last_msg fw-lighter fst-italic">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed enim
            nisi, euismod eget elit et, rutrum placerat nunc. Vestibulum non
            ligula ex. Donec congue iaculis consequat. Etiam dui risus, semper
            vel feugiat eu, porttitor in tortor. Pellentesque vulputate mi
            velit, eu mollis libero pharetra vel. Duis vitae massa nec sapien
            fringilla ornare. Integer sed massa nec nunc condimentum lacinia.
            Aenean malesuada nisi nec sem fringilla tincidunt. Aenean volutpat
            elementum ante, facilisis ultrices tortor semper sed. Integer sit
            amet purus vel dui luctus suscipit. In rhoncus finibus luctus. Nulla
            nec eros eget tellus blandit sollicitudin quis at nulla.
          </div>
        </div>
      </div>
    </div>
  );
}
