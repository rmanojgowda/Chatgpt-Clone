import './App.css'; 
import { useEffect, useState, useRef } from 'react';  // ✅ added useRef
import gptLogo from './assets/ChatGPTlogo.png';
import addBtn from './assets/add.png';
import msgIcon from './assets/programming.png';
import home from './assets/home.png';
import saved from './assets/bookmark.png';
import rocket from './assets/rocket.jpg';
import analysis from './assets/analysis.png';
import send from './assets/send.png';
import useri from './assets/User.jpg';
import gptImpLogo from './assets/ChatGPTlogo.png';
import { sendMsgToOpenAI } from './openai';

function App() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");

  // Messages must be an ARRAY
  const [messages, setMessages] = useState([
    {
      text: "Hi, I'm ChatGPT",
      isBot: true,
    }
  ]);

  // ✅ Track which page is active
  const [currentPage, setCurrentPage] = useState("chat");

  // ✅ Scroll to bottom when messages update
  useEffect(() => { 
    msgEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return; // prevent empty input

    const userMessage = { text: input, isBot: false };

    // Add user message immediately
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput(""); // clear input after sending

    try {
      // Get response from OpenAI
      const res = await sendMsgToOpenAI(input);

      // Add bot response
      setMessages([
        ...newMessages,
        { text: res, isBot: true }
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <div className="App">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="Logo" className="logo" />
            <span className="brand">ChatGPT</span>
            <div className="divider"></div>

            {/* ✅ New Chat resets messages and goes to chat page */}
            <button className="midBtn" onClick={() => {
              setMessages([{ text: "Hi, I'm ChatGPT", isBot: true }]); 
              setCurrentPage("chat");
            }}>
              <img src={addBtn} alt="New Chat" className="addBtn" />
              New Chat
            </button>

            <div className="divider"></div>

            <div className="upperSideBottom">
              <button className="query" onClick={() => setCurrentPage("programming")}>
                <img src={msgIcon} alt="Query" />
                What is programming
              </button>
              <button className="query" onClick={() => setCurrentPage("api")}>
                <img src={analysis} alt="Query" />
                How to use an API
              </button>
            </div>
          </div>
        </div>

        <div className="lowerSide">
          <div className="listItems" onClick={() => setCurrentPage("home")}>
            <img src={home} alt="Home" className="listitemsimg" />
            Home
          </div>
          <div className="listItems" onClick={() => setCurrentPage("saved")}>
            <img src={saved} alt="Saved" className="listitemsimg" />
            Saved
          </div>
          <div className="listItems" onClick={() => setCurrentPage("upgrade")}>
            <img src={rocket} alt="Upgrade to Pro" className="listitemsimg" />
            Upgrade to Pro
          </div>
        </div>
      </div>

      {/* ✅ Main Section changes with currentPage */}
      <div className="main">
        {currentPage === "chat" && (
          <>
            <div className="chats">
              {messages.map((message, i) => (
                <div key={i} className={message.isBot ? "chat bot" : "chat"}>
                  <img
                    className="Chatimg"
                    src={message.isBot ? gptImpLogo : useri}
                    alt={message.isBot ? "GPT" : "User"}
                  />
                  <p className="txt">{message.text}</p>
                </div>
              ))}
              {/* ✅ Correct ref placement */}
              <div ref={msgEnd}></div>
            </div>

            {/* Chat Footer */}
            <div className="chatFooter">
              <div className="inp">
                <input
                  type="text"
                  placeholder="Send a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button className="send" onClick={handleSend}>
                  <img src={send} alt="Send" />
                </button>
              </div>
              <p>ChatGPT may produce incorrect results. Please read conditions.</p>
            </div>
          </>
        )}

        {currentPage === "programming" && (
          <div className="pageContent">
            <h2>💻 What is Programming?</h2>
            <p>Programming is the process of giving instructions to a computer to perform specific tasks...</p>
            <pre>
              {`// Example: Hello World in JavaScript
console.log("Hello, World!");`}
            </pre>
          </div>
        )}

        {currentPage === "api" && (
          <div className="pageContent">
            <h2>🔌 How to use an API</h2>
            <ol>
              <li>Find an API provider (e.g. OpenAI, Weather API).</li>
              <li>Get an API key from their dashboard.</li>
              <li>Make requests using <code>fetch</code> or Axios.</li>
            </ol>
            <pre>
              {`// Example: Fetch from API
fetch("https://api.example.com/data?apikey=YOUR_KEY")
  .then(res => res.json())
  .then(data => console.log(data));`}
            </pre>
          </div>
        )}

        {currentPage === "home" && (
          <div className="pageContent">
            <h2>🏠 Welcome to ChatGPT Clone</h2>
            <p>Please log in to continue.</p>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
          </div>
        )}

        {currentPage === "saved" && (
          <div className="pageContent">
            <h2>📑 Saved Chats</h2>
            <p>No chats saved yet.</p>
          </div>
        )}

        {currentPage === "upgrade" && (
          <div className="pageContent">
            <h2>🚀 Upgrade to Pro</h2>
            <p>Unlock more features:</p>
            <ul>
              <li>⚡ Faster responses</li>
              <li>📚 Unlimited chat history</li>
              <li>🧠 Smarter AI models</li>
            </ul>
            <button>Choose Plan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
