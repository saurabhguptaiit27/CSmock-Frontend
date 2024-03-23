import React, { useState, useRef, useEffect, useContext } from "react";
import io from "socket.io-client";
import { CurrentUserContext } from "../components/Context/CurrentUserProvider";
const socket = io("http://localhost:5000");
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
    };

    socket.emit("message", messageData);
    setMessages([...messages, messageData]);
    setNewMessage("");
  };

  return (
    <div class="bg-gray-600/90 fixed bottom-32 right-10 z-20 sm- rounded-xl border">
      <div class="bg-gray-100/70 rounded-lg shadow-md p-4">
        <div class="flex items-center mb-4">
          <div class="ml-3">
            <p class="text-xl font-medium">Welcome To CSmock</p>
            <p class="text-gray-500">Online</p>
          </div>
        </div>
        <hr className="border-green-700" />
        <div class="space-y-4 h-56 overflow-y-auto ">
          {/* <div class="flex items-start">
            <FcCustomerSupport className="text-2xl mt-2" />
            <div class="ml-3 bg-gray-100 p-2 rounded-lg">
              <p class="text-sm text-gray-800">
                Hello! How can I help you today?
              </p>
            </div>
          </div>  */}

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
                  <div className="bg-blue-500 p-2 rounded-lg mr-">
                    <p className="text-sm text-white ">{message.text}</p>
                  </div>
                  <h6 className="text-black font-serif">{message.from}</h6>
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          ))}

          {/* <div class="flex items-end justify-end">
            <div class="bg-blue-500 p-2 rounded-lg">
              <p class="text-sm text-white">Sure, I have a question.</p>
            </div>
            <img
              src="https://pbs.twimg.com/profile_images/1707101905111990272/Z66vixO-_normal.jpg"
              alt="Other User Avatar"
              class="w-6 h-6 rounded-full ml-3 mb-1"
            />
          </div>  */}
        </div>
        <hr className="border-green-700 " />
        <div class="mt-4 flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            class="flex-1 py-2 px-3 rounded-full bg-gray-100 focus:outline-none"
          />
          <button
            onClick={() => sendMessage()}
            class="bg-blue-500 text-white px-4 py-2 rounded-full ml-3 hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSupportUI;
