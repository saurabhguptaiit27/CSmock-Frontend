import React from "react";
import { FaRobot } from "react-icons/fa";

const ChatSupportUI = () => {
  return (
    <div class="bg-gray-600/90 fixed bottom-32 right-10 z-20 sm- rounded-xl border">
      <div class="bg-gray-100/70 rounded-lg shadow-md p-4">
        <div class="flex items-center mb-4">
          <div class="ml-3">
            <p class="text-xl font-medium">Welcome To CSmock</p>
            <p class="text-gray-500">Online</p>
          </div>
        </div>
        <hr className="border-green-700 mb-5" />
        <div class="space-y-4">
          <div class="flex items-start">
            <FaRobot className="text-2xl mt-2 text-green-700" />
            <div class="ml-3 bg-gray-100 p-3 rounded-lg">
              <p class="text-sm text-gray-800">
                Hello! How can I help you today?
              </p>
            </div>
          </div>

          <div class="flex items-end justify-end">
            <div class="bg-blue-500 p-3 rounded-lg">
              <p class="text-sm text-white">Sure, I have a question.</p>
            </div>
            <img
              src="https://pbs.twimg.com/profile_images/1707101905111990272/Z66vixO-_normal.jpg"
              alt="Other User Avatar"
              class="w-8 h-8 rounded-full ml-3"
            />
          </div>
        </div>
        <hr className="border-green-700 my-5" />
        <div class="mt-4 flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            class="flex-1 py-2 px-3 rounded-full bg-gray-100 focus:outline-none"
          />
          <button class="bg-blue-500 text-white px-4 py-2 rounded-full ml-3 hover:bg-blue-600 active:border-green-500 active:border-2">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSupportUI;
