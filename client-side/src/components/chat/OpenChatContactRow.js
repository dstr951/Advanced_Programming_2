import { useEffect, useState } from 'react'
import { getUserStatus } from "../../apiTemp";

export default function OpenChatContactRow({ user }) {
  const { userId, userName, displayName, profilePic } = user
  const [status, setStatus] = useState("waiting...")
  //hook to get the user's status from the server
  useEffect(()=> {
	setStatus(getUserStatus(userId).body.status)
  }, [userId])

  return (
    <div id="conversation_info_row" className="row chat-row">
      <div className="col-2 profile-container">
        <img alt="img" src={profilePic} />
      </div>
      <div className="col-10 d-flex">
        <div className="row name-time-last-message-container">
          <div className="col-12 contact_name fw-bold">{displayName}</div>
          <div className="col-12 last_msg fw-lighter fst-italic">
            {status}
          </div>
        </div>
      </div>
    </div>
  );
}
