import { useEffect, useState } from "react";
import "./chats.css";
import UserChatRow from "./components/chat/UserChatRow.js";
import ChatRow from "./components/chat/ChatRow.js";
import OpenChat from "./components/chat/OpenChat.js";
import { getAllChats } from "./apiTemp";
import ChatsPage from "./ChatsPage";

function App() {
  return(
      <ChatsPage/>
  )


}

export default App;
