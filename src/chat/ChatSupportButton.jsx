import React, { useContext } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { ToggleUIContext } from "../components/Context/ToggleUiProvider";

const ChatSupportButton = () => {
  const { toggleChat, handleToggleChat } = useContext(ToggleUIContext);

  return (
    <div class=" relative">
      <button
        onClick={() => handleToggleChat()}
        class="z-30 text-white flex flex-col shrink-0 grow-0 justify-around 
                  fixed bottom-0 right-0  rounded-lg
                  mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10"
      >
        <div
          class={
            !toggleChat
              ? "p-3 rounded-full border-4 border-gray-300/90 bg-green-600/90 hover:bg-green-700"
              : "p-3 rounded-full border-4 border-green-500/80 bg-red-500/80"
          }
        >
          {!toggleChat ? (
            <IoChatbubbleEllipsesOutline className="text-3xl" />
          ) : (
            <IoMdCloseCircleOutline className="text-3xl" />
          )}

          {/* <svg
            class="w-6 h-6 lg:w-8 lg:h-8 xl:w-12 xl:h-12"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clip-rule="evenodd"
            ></path>
          </svg> */}
        </div>
      </button>
    </div>
  );
};

export default ChatSupportButton;
