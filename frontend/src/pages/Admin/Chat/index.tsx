import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import socket from "../../../configs/socket";

function Chat() {
  useEffect(() => {
    socket.emit("owner:join");

    // socket.on("private_chat:new_messages", {});
  }, []);

  return (
    <div className="w-full flex h-[calc(100vh-10rem)] border border-gray-200 shadow-md rounded-xl">
      <div className="w-[30rem] h-full border-r border-r-gray-300">
        <div className="p-6 border-b border-b-gray-200">
          <h2 className="text-[1.8rem] font-bold">Messages</h2>
          <span>conversation</span>
        </div>
        <div className="w-full h-full">
          <div className="w-full h-full text-gray-400 mt-[15rem] flex flex-col items-center">
            <FontAwesomeIcon icon={faCommentDots} className="text-[2rem] " />
            No request
          </div>
        </div>
      </div>
      <div className="flex-1 w-full h-full">
        <div className="w-full h-full text-gray-400 flex flex-col gap-2.5 items-center justify-center">
          <FontAwesomeIcon icon={faCommentDots} className="text-[6rem] " />
          No conversation
        </div>
      </div>
    </div>
  );
}

export default Chat;
