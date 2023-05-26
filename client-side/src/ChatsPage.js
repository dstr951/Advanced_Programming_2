import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./chats.css";
import UserChatRow from "./components/chat/UserChatRow.js";
import ChatRow from "./components/chat/ChatRow.js";
import OpenChat from "./components/chat/OpenChat.js";
import { getAllChats, HttpCodes } from "./api";

export default function ChatsPage() {
    //const [myId, setMyId] = useState(0);
    const location = useLocation();
    const myId = location.state?.myParam;
    //console.log("now logged in userId:"+userId)
    const navigate = useNavigate();
    const logoutHandler = (e) => {
        e.preventDefault()
        navigate('/')
    }

    const [token, setToken] = useState('')
    useEffect(() => {
        setToken(location.state?.token)
    }, [location])

    const [chats, setChats] = useState([]);
    //control the content displayed on screen
    const [openChatId, setOpenChatId] = useState(0);
    const [openUser, setOpenUser] = useState({});
    //update messages and last message after sending a message
    const [forceUpdateMessages, setForceUpdateMessages] = useState(false)


    const updateChats = async () => {
        const response = await getAllChats(token);
        switch(response.status){
            case HttpCodes.SUCCESS:
                const data = await response.json()
                setChats(data)
                break;
            case HttpCodes.UNAUTHERIZED:
                navigate('/')
                break;
            default:
                console.log("unexpected HTTP code on response from getAllChats:", response.status)
        }      
    }

	useEffect(() => {        
        if(token == "") {
            console.log("no token render")
            return
        }
        updateChats()
	}, [token]);
    return (
        <>
            <div className="background-jumbo"></div>
            <div className="row justify-content-end mt-2 mb-4">
                <div className="col-1">
                    <button className="btn btn-danger" onClick={logoutHandler}>Logout</button>
                </div>
            </div>
            <div id="chat_window" className="row">
                <div id="chat_card" className="col-12">
                    <div id="panels_row" className="row m-0">
                        <div id="conversations_panel" className=" col-5 chat-panel">
                            <UserChatRow myId={myId} setForceUpdateMessages={setForceUpdateMessages}/>
                            <div id="conversations">
                                {chats.map((chat, index) => (
                                    <ChatRow
                                        user={chat.user}
                                        chatId={chat.id}
                                        lastMessage={chat.lastMessage}
                                        forceUpadteMessages={forceUpdateMessages}
                                        changeOpenChatId={setOpenChatId}
                                        changeOpenUser={setOpenUser}
                                        active={openUser.username === chat.user.username}
                                        key={index}
                                    />
                                ))}
                            </div>
                        </div>
                        <div id="messages_panel" className=" col-7 chat-panel">
                            <OpenChat user={openUser} chatId={openChatId} myId={myId} forceUpadteMessages={forceUpdateMessages} setForceUpdateMessages={setForceUpdateMessages} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

