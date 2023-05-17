import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./chats.css";
import UserChatRow from "./components/chat/UserChatRow.js";
import ChatRow from "./components/chat/ChatRow.js";
import OpenChat from "./components/chat/OpenChat.js";
import { getAllChats } from "./apiTemp";

export default function ChatsPage() {
    //const [myId, setMyId] = useState(0);
    const location = useLocation();
    const myId = location.state?.myParam;
    //console.log("now logged in userId:"+userId)


    /*TEMP*/

    //setTimeout(() => {
    //    setMyId(userId);
    //}, 100);
    /*TEMP*/
    const [chatUsers, setChatUsers] = useState([]);
    //control the content displayed on screen
    const [openChatId, setOpenChatId] = useState(0);
    const [openUser, setOpenUser] = useState({});
	const [forceUpdateMessages, setForceUpdateMessages] = useState(false)

	//hook to get the chats data from the server
	useEffect(() => {
		const response = getAllChats(myId);
		if (response.code === 200) {
			setChatUsers(response.body);
		}
	}, [myId, forceUpdateMessages]);
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
                            <UserChatRow myId={myId} />
                            <div id="conversations">
                                {chatUsers.map((cu, index) => (
                                    <ChatRow
                                        userId={cu.userId}
                                        chatId={cu.chatId}
                                        changeOpenChatId={setOpenChatId}
                                        changeOpenUser={setOpenUser}
                                        active={openUser.userId === cu.userId}
                                        key={index}
                                    />
                                ))}
                            </div>
                        </div>
                        <div id="messages_panel" className=" col-7 chat-panel">
                            <OpenChat user={openUser} chatId={openChatId} myId={myId} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

