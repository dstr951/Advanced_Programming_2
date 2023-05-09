import logo from './logo.svg';
import { getUser, validateLogin, registerUser, getAllChats, getChatMessages, getLastChatMessage } from './api.js'
import './App.css';

function printMessage(message){
  return(
    <p>
      sender: {message.senderId}<br/>
      {message.content}<br/>
      {message.timeSent.toDateString()}
    </p>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
