import './App.css';
import LoginPage from "./LoginPage";
import {Routes, Route, Link} from "react-router-dom"
import RegisterPage from "./RegisterPage";
import ChatsPage from "./ChatsPage";

function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<LoginPage/>}></Route>
          <Route path="/Register" element={<RegisterPage/>}></Route>
          <Route path="/Chats" element={<ChatsPage/>}></Route>
        </Routes>
      </>
  );
}

export default App;
