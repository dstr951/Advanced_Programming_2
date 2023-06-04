import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import "./chats.css";
import UserChatRow from "./components/chat/UserChatRow.js";
import ChatRow from "./components/chat/ChatRow.js";
import OpenChat from "./components/chat/OpenChat.js";
import { socket } from "./socket";
import { getAllChats, HttpCodes } from "./api";

export const chatContext = createContext({
    messages: [],
    username: ""
});

export default function ChatsPage() {
    //const [myId, setMyId] = useState(0);
    const location = useLocation();
    const [myUsername] = useState(location.state?.myUsername)
    const [token, setToken] = useState(location.state?.token)
    useEffect(() => {
        setToken(location.state?.token)
    }, [location])
    //console.log("now logged in userId:"+userId)
    const navigate = useNavigate();
    const logoutHandler = (e) => {
        e.preventDefault()
        navigate('/')
    }

    const [chats, setChats] = useState([]);
    //control the content displayed on screen
    const [openChatId, setOpenChatId] = useState(0);
    const [openUser, setOpenUser] = useState({});
    const [openMessages, setOpenMessages] = useState([]);
    //update messages and last message after sending a message

    const updateChats = async () => {
        const response = await getAllChats(token);
        switch(response.status){
            case HttpCodes.SUCCESS:
                let data = await response.json()
				if(data.length > 0)
                data = data.sort((c1, c2) => {
					return new Date(c2.lastMessage?.created) - new Date(c1.lastMessage?.created)
				  })
				  setChats(data)
                break;
            case HttpCodes.UNAUTHERIZED:
                navigate('/')
                break;
            default:
                console.log("unexpected HTTP code on response from getAllChats:", response.status)
        }      
    }

    //get all chats after first render
	useEffect(() => {
        updateChats()
	}, []);
	//setup sockets
	useEffect(() => {
		socket.connect();

		socket.on("connect", () => {
			console.log("sent username", myUsername)
			socket.emit("username", {
				username: myUsername
			})
		})
		socket.on("newMessage", updateChats)
	  
		return () => {
		  socket.off("newMEssage", updateChats)
		  socket.disconnect();
		};
	  }, []);

    const context = {
        messages: openMessages,
        myUsername: myUsername,
    }
    return (
        <chatContext.Provider value={context}>
            <div className="background-jumbo"></div>
            <div className="row justify-content-end mt-2 mb-4 me-0">
                <div className="col-1">
                    <button className="btn btn-danger" onClick={logoutHandler}>Logout</button>
                </div>
            </div>
            <div id="chat_window" className="row">
                <div id="chat_card" className="col-12">
                    <div id="panels_row" className="row m-0">
                        <div id="conversations_panel" className=" col-5 chat-panel">
                            <UserChatRow myUsername={myUsername} token={token} updateChats={updateChats} />
                            <div id="conversations">
                                {chats.map((chat, index) => (
                                    <ChatRow
                                        user={chat.user}
                                        chatId={chat.id}
                                        lastMessage={chat.lastMessage}
                                        token={token}
                                        changeOpenMessages={setOpenMessages}
                                        changeOpenChatId={setOpenChatId}
                                        changeOpenUser={setOpenUser}
                                        active={openUser.username === chat.user.username}
                                        key={index}
                                    />
                                ))}
                            </div>
                        </div>
                        <div id="messages_panel" className=" col-7 chat-panel">
                            <OpenChat user={openUser} chatId={openChatId} token={token} updateChats={updateChats} />
                        </div>
                    </div>
                </div>
            </div>
        </chatContext.Provider>
    );
}

