export default function userChatRow() {
  return (
    <div id="user_info" className="row chat-row text-start">
      <div className="col-2 profile-container">
        <img alt="img" src="pictures/face_user.png" />
      </div>
      <div className="col-6 text-start pt-2 fw-bold ">Alice Foo</div>
      <div className="col-4">
        <div className="text-right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-plus"
            viewBox="0 0 16 16"
            data-toggle="modal"
            data-target="#addContact"
          >
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            <path
              fill-rule="evenodd"
              d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
            />
          </svg>
        </div>
        {/*MODAL*/}
        <div id="addContact" className="modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal title</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contact's identifier"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
