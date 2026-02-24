import {
  faCommentDots,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import avatar from "../assets/images/avatar2.png";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import socket from "../configs/socket";

interface Message {
  role: "owner" | "user";
  content: string;
}

function ContactAi() {
  const [showModal, setShowModal] = useState(false);
  const [inputMessage, setInputMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const hasJoined = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("connect", () => {
      if (!hasJoined.current) {
        hasJoined.current = true;
        socket.emit("private_chat:join");
      }
    });

    if (socket.connected && !hasJoined.current) {
      hasJoined.current = true;
      socket.emit("private_chat:join");
    }

    socket.on("private_chat:history", ({ messages }) => {
      setMessages(messages);
    });

    socket.on("private_chat:receive", ({ message }) => {
      setMessages((prev) => [...prev, { role: "owner", content: message }]);
      setIsLoading(false);
    });

    return () => {
      socket.off("private_chat:receive");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage) return;
    if (socket.connected && hasJoined.current) {
      socket.emit("private_chat:send", { message: inputMessage });
      setMessages((prev) => [...prev, { role: "user", content: inputMessage }]);
      setInputMessage("");
      setIsLoading(true);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  return (
    <div className="fixed md:right-[5rem] md:bottom-[5rem] right-[2rem] bottom-[5rem]">
      <div
        className="relative w-22 h-22 rounded-full bg-amber-500 flex items-center justify-center hover:bg-amber-600 transition-colors duration-300 group"
        onClick={() => setShowModal(!showModal)}
      >
        <FontAwesomeIcon
          icon={showModal ? faClose : faCommentDots}
          className="text-[1.8rem] md:text-[2rem] lg:text-[2.4rem] text-white"
        />
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: 0.1 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-[calc(100%+1rem)] right-0"
          >
            <div className="w-[32rem] sm:w-[40rem] h-auto rounded-xl shadow-xl z-[999] bg-red-500">
              <div className="w-full h-auto flex items-center gap-5 bg-amber-500 rounded-tr-xl rounded-tl-xl p-4">
                <span className="w-[4rem] sm:w-[5rem] h-[4rem] sm:h-[5rem] rounded-full border-2 border-yellow-200 bg-white flex items-center justify-center">
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </span>
                <div className="text-white">
                  <p className="text-[1.4rem] sm:text-[1.6rem] font-bold">
                    Trung Kiên
                  </p>
                  <p className="text-[1.2rem]">
                    We'll responed to you shortly.
                  </p>
                </div>
              </div>
              <div className="relative w-full h-[40rem] bg-white rounded-br-xl rounded-bl-xl">
                <div
                  className="flex-1 w-full h-[calc(100%-8rem)] overflow-y-auto p-6 space-y-10"
                  style={{ scrollbarWidth: "none" }}
                >
                  {messages.length > 0 &&
                    messages.map((message) => {
                      const isUser = message.role === "user";
                      return (
                        <div
                          className={`flex items-start gap-4 ${isUser ? "flex-row-reverse" : ""}`}
                        >
                          {!isUser && (
                            <img
                              src={avatar}
                              alt="avatar"
                              className="w-12 sm:w-16 h-12 sm:h-16 rounded-full object-cover border border-gray-200"
                            />
                          )}
                          <div
                            className={`text-[1.2rem] sm:text-[1.4rem] max-w-[25rem] border border-gray-100 rounded-xl  p-3.5 ${isUser ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-600"}`}
                          >
                            {message.content}
                          </div>
                        </div>
                      );
                    })}
                  <div className="" ref={messagesEndRef}></div>
                </div>
                <div className="absolute bottom-[2rem] px-[2rem] left-0 flex items-center w-full gap-2.5 text-[1.2rem] sm:text-[1.4rem]">
                  <input
                    type="text"
                    name="message"
                    className="flex-1 w-full h-[4.2rem] border border-gray-400 rounded-full outline-none focus:border-amber-500 placeholder:text-gray-400 pl-8 text-gray-800"
                    placeholder="Enter message..."
                    value={inputMessage ?? ""}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                  />
                  <button
                    className="flex items-center justify-center h-[4.2rem] w-[4.2rem] rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white"
                    type="button"
                    disabled={isLoading}
                    onClick={handleSendMessage}
                  >
                    {isLoading ? (
                      <div className="loadingBtn w-[2.4rem] h-[2.4rem] rounded-full border-3 border-white animate-spin"></div>
                    ) : (
                      <FontAwesomeIcon icon={faPaperPlane} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ContactAi;
