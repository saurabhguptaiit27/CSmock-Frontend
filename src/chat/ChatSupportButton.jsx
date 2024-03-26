import React, { useContext } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { ToggleUIContext } from "../components/Context/ToggleUiProvider";

const ChatSupportButton = () => {
  const { toggleChat, handleToggleChat } = useContext(ToggleUIContext);

  return (
    <div className=" relative">
      <button
        onClick={() => handleToggleChat()}
        className="z-30 text-white flex flex-col shrink-0 grow-0 justify-around 
                  fixed bottom-0 right-0  rounded-lg
                  mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10"
      >
        <div
          className={
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
        </div>
      </button>
    </div>
  );
};

export default ChatSupportButton;
