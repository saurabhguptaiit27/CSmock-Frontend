import React, { useState, useRef, useEffect, useContext } from "react";
import io from "socket.io-client";
import { CurrentUserContext } from "../components/Context/CurrentUserProvider";
const socket = io("https://chatsupport-socket-io-expressjs.onrender.com");
import { FcCustomerSupport } from "react-icons/fc";

const ChatSupportUI = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { currentUser } = useContext(CurrentUserContext);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Join user room
    socket.emit("joinRoom", {
      type: currentUser.username === "admin" ? "admin" : "expert2",
      username: currentUser.username,
    });

    // Listen for incoming messages
    socket.on("message", (message) => {
      setMessages([...messages, message]);
      console.log(message);
    });
    scrollToBottom();
    return () => {
      socket.off("message");
    };
  }, [messages]);

  const sendMessage = () => {
    const messageData = {
      from: currentUser.username,
      to: currentUser.username === "admin" ? "expert2" : "admin",
      text: newMessage,
      avatar: currentUser.avatar,
    };

    socket.emit("message", messageData);
    setMessages([...messages, messageData]);
    setNewMessage("");
  };

  return (
    <div className="bg-gray-600/90 fixed bottom-32 right-10 z-20 sm- rounded-xl border">
      <div className="bg-gray-100/70 rounded-lg shadow-md p-4">
        <div className="flex items-center mb-2">
          <div className="ml-3">
            <p className="text-xl font-medium">Welcome To CSmock</p>
            <p className="text-gray-500">Online</p>
          </div>
        </div>
        <hr className="border-green-700" />
        <div className="space-y-4 min-h-56 max-h-60 overflow-y-auto ">
          {!messages.length && (
            <img className="h-56 w-full" src="/chat-support.jpg" />
          )}

          {messages.map((message, index) => (
            <div key={index}>
              {message.from === "admin" ? (
                // Render outgoing message
                <div className="flex items-start my-2">
                  <FcCustomerSupport className="text-2xl mt-2" />
                  <div className="ml-3 bg-gray-100 p-2 rounded-lg">
                    <p className="text-sm text-gray-800">{message.text}</p>
                  </div>
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                // Render incoming message
                <div className="flex flex-col items-end justify-end my-2">
                  <div className="p-2 rounded-lg flex flex-row">
                    <p className="text-sm text-white bg-blue-500 px-4 py-1 rounded-lg mr-2">
                      {message.text}
                    </p>

                    <img
                      className="h-[2rem] w-[2rem] rounded-full"
                      src={message.avatar}
                      alt="client image"
                    />
                  </div>
                  <h6 className="text-green-700 text-xs italic -mt-2 mr-3">
                    sender - {message.from}
                  </h6>
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          ))}
        </div>
        <hr className="border-green-700 " />
        <div className="mt-4 flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 py-2 px-3 rounded-full bg-gray-100 focus:outline-none"
          />
          <button
            onClick={() => sendMessage()}
            className="bg-blue-500 text-white px-4 py-2 rounded-full ml-3 hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSupportUI;
