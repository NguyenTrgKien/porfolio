import {
  faCommentDots,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import socket from "../../../configs/socket";
import dayjs from "dayjs";
import { useDevice } from "../../../hooks/useDevice";
import {
  faAnglesDown,
  faArrowLeft,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

export interface ConversationType {
  createdAt: string;
  id: number;
  isReadByOwner: string;
  lastMessage: string;
  messages: MessagesType[];
  updatedAt: string;
  visitorId: string;
  visitor: VisitorType;
}

export interface VisitorType {
  createdAt: string;
  email: string;
  id: number;
  name: string;
  sessionId: string;
}

export interface MessagesType {
  content: string;
  conversationId: number;
  createdAt: string;
  role: "owner" | "user";
}

function Chat() {
  const { isMobile } = useDevice();
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [currentConversation, setCurrentConversation] =
    useState<ConversationType | null>(() => {
      const data = localStorage.getItem("conversation");
      return data ? JSON.parse(data) : null;
    });
  const [reply, setReply] = useState("");
  const [messages, setMessage] = useState<MessagesType[]>(() => {
    const data = localStorage.getItem("messages");
    return data ? JSON.parse(data) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);
  const [showConversationMobile, setShowConversationMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const shoudScrollRef = useRef(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  const setScrollRef = (el: HTMLDivElement | null) => {
    scrollContainerRef.current = el;
  };

  useEffect(() => {
    socket.emit("owner:join");

    const handleConversations = ({ conversations }) => {
      setConversations(conversations);
    };

    const handleAdminHistory = ({ conversation, messages, isOnline }) => {
      setIsOnline(isOnline);
      setCurrentConversation(conversation);
      setMessage(messages);
      localStorage.setItem("conversation", JSON.stringify(conversation));
      localStorage.setItem("messages", JSON.stringify(messages));
    };

    const handleNewMessage = ({ message, conversationId }) => {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversationId
            ? {
                ...c,
                lastMessage: message,
                updatedAt: new Date().toISOString(),
              }
            : c,
        ),
      );
      if (currentConversation?.id === conversationId) {
        setMessage((prev) => [
          ...prev,
          {
            content: message,
            role: "user",
            conversationId,
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    };

    const handleUserOffline = ({ sessionId }) => {
      setConversations((prev) =>
        prev.map((c) =>
          c.visitor.sessionId === sessionId ? { ...c, isOnline: false } : c,
        ),
      );

      if (currentConversation?.visitor.sessionId === sessionId) {
        setIsOnline(false);
      }
    };

    socket.on("private_chat:conversations", handleConversations);

    socket.on("private_chat_admin:history", handleAdminHistory);

    socket.on("private_chat:new_message", handleNewMessage);

    socket.on("user:offline", handleUserOffline);

    return () => {
      socket.off("private_chat:conversations", handleConversations);

      socket.off("private_chat_admin:history", handleAdminHistory);

      socket.off("private_chat:new_message", handleNewMessage);

      socket.off("user:offline", handleUserOffline);
    };
  }, [currentConversation?.id]);

  const scrollToBottom = () => {
    const el = scrollContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
    if (isAtBottom) setShowScrollBtn(false);
  };

  const handleScrollIntoNewMessage = () => {
    scrollToBottom();
    setShowScrollBtn(false);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;

    if (shoudScrollRef.current) {
      shoudScrollRef.current = false;
      scrollToBottom();
      return;
    }

    if (isAtBottom) {
      scrollToBottom();
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowScrollBtn(true);
    }
  }, [messages, showConversationMobile]);

  const formatTime = (value: string) => {
    const t = dayjs(value);
    const time = t.isSame(dayjs(), "day")
      ? t.format("HH:mm")
      : t.format("DD/MM");
    return time;
  };

  const handleJoinConversation = (conversationId: number) => {
    socket.emit("owner:select_conversation", {
      conversationId: conversationId,
    });
    socket.emit("private_chat:mark_read", { conversationId });
  };

  const handleReply = () => {
    if (!reply.trim() || !currentConversation) return;
    setIsLoading(true);
    const newMsg: MessagesType = {
      content: reply,
      role: "owner",
      conversationId: currentConversation.id,
      createdAt: new Date().toISOString(),
    };
    setMessage((prev) => [...prev, newMsg]);
    socket.emit("private_chat:reply", {
      sessionId: currentConversation?.visitor.sessionId,
      message: reply,
      conversationId: currentConversation?.id,
    });
    shoudScrollRef.current = true;
    setReply("");
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  return (
    <div className="relative w-full flex h-[calc(100vh-10rem)] border border-gray-200 dark:border-gray-600 shadow-md md:rounded-xl">
      <div className="w-full md:w-[25rem] lg:w-[30rem] h-full border-r border-r-gray-300 dark:border-gray-600 z-100">
        <div className="p-6 border-b border-b-gray-200 dark:border-b-gray-600">
          <h2 className="text-[1.4rem] md:text-[1.8rem] font-bold">Messages</h2>
          <span>({conversations.length}) conversation</span>
        </div>
        <div className="w-full h-full">
          {conversations.length > 0 ? (
            conversations.map((conversation) => {
              const isActive =
                (currentConversation &&
                  currentConversation.id === conversation.id) ??
                false;
              return (
                <div
                  key={conversation.id}
                  className={`flex items-center gap-4 w-full h-auto p-5 border-b border-b-gray-100 dark:border-b-gray-600 shadow hover:bg-blue-100 dark:bg-gray-600 transition-colors duration-300 dark:hover:bg-gray-600 ${isActive ? "bg-blue-100" : ""}`}
                  onClick={() => {
                    if (isMobile) {
                      setShowConversationMobile(true);
                    }
                    handleJoinConversation(conversation.id);
                  }}
                >
                  <span className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <div>
                    <span className="text-[1.6rem] font-semibold">
                      {conversation.visitor.name ?? "Visitor"}
                    </span>
                    <p className="line-clamp-1">{conversation.lastMessage}</p>
                  </div>
                  <span className="ml-auto">
                    {formatTime(conversation.updatedAt)}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="w-full h-full text-gray-400 mt-[15rem] flex flex-col items-center">
              <FontAwesomeIcon icon={faCommentDots} className="text-[2rem] " />
              No request
            </div>
          )}
        </div>
      </div>
      {!isMobile && (
        <div className="flex-1 flex flex-col w-full h-full">
          {currentConversation ? (
            <>
              <div className="w-full h-auto flex items-center gap-4 bg-gray-100 dark:bg-gray-600 border-b border-b-gray-200  dark:border-b-gray-600 p-6">
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <div className="flex flex-col">
                  <span className="text-[1.6rem] font-semibold">
                    {currentConversation.visitor.name ?? "Visitor"}
                  </span>
                  <span className="text-[1.2rem]">
                    {isOnline ? (
                      <div className="flex items-center gap-1.5">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="text-[.8rem] text-green-500"
                        />
                        <span>Đang online</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="text-[.8rem] text-gray-200"
                        />
                        <span>Đang offline</span>
                      </div>
                    )}
                  </span>
                </div>
              </div>
              <div
                className="flex-1 w-full h-full overflow-y-auto p-6 space-y-10"
                ref={setScrollRef}
                onScroll={handleScroll}
              >
                {messages.length > 0 &&
                  messages.map((message, index) => {
                    const isOwner = message.role === "owner";
                    return (
                      <div
                        key={index}
                        className={`flex items-start gap-4 ${isOwner ? "flex-row-reverse" : ""}`}
                      >
                        {!isOwner && (
                          <span className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white">
                            <FontAwesomeIcon icon={faUser} />
                          </span>
                        )}
                        <div
                          className={`text-[1.2rem] sm:text-[1.4rem] max-w-[25rem] border border-gray-100 dark:border-gray-600 rounded-xl  p-3.5 ${isOwner ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-600"}`}
                        >
                          {message.content}
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="w-full h-auto flex items-center mt-auto p-6 gap-4">
                <input
                  type="text"
                  id="message"
                  name="message"
                  className="flex-1 w-full h-[5rem] rounded-full outline-none border border-gray-400 focus:border-amber-500 pl-8"
                  placeholder="Enter message..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleReply();
                    }
                  }}
                />
                <button
                  type="button"
                  className="w-[5rem] h-[5rem] rounded-full flex items-center justify-center bg-blue-500 text-white"
                  onClick={handleReply}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="loadingBtn w-[2.4rem] h-[2.4rem] rounded-full border-3 border-white animate-spin"></div>
                  ) : (
                    <FontAwesomeIcon icon={faPaperPlane} />
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="w-full h-full text-gray-400 flex flex-col gap-2.5 items-center justify-center">
              <FontAwesomeIcon icon={faCommentDots} className="text-[6rem] " />
              No conversation
            </div>
          )}
        </div>
      )}

      {showConversationMobile && (
        <div className="absolute inset-0 flex flex-col w-full h-full z-999 bg-white dark:bg-[#000033]">
          {currentConversation ? (
            <>
              <div className="w-full h-auto flex items-center gap-4 bg-gray-100 dark:bg-gray-600 border-b border-b-gray-200  dark:border-b-gray-600 p-6">
                <span onClick={() => setShowConversationMobile(false)}>
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="text-[1.6rem]"
                  />
                </span>
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <div className="flex flex-col">
                  <span className="text-[1.6rem] font-semibold">
                    {currentConversation.visitor.name ?? "Visitor"}
                  </span>
                  <span className="text-[1.2rem]">
                    {isOnline ? (
                      <div className="flex items-center gap-1.5">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="text-[.8rem] text-green-500"
                        />
                        <span>Đang online</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="text-[.8rem] text-gray-200"
                        />
                        <span>Đang offline</span>
                      </div>
                    )}
                  </span>
                </div>
              </div>
              <div
                className="flex-1 w-full h-full overflow-y-auto p-6 space-y-10"
                ref={setScrollRef}
                onScroll={handleScroll}
              >
                {messages.length > 0 &&
                  messages.map((message, index) => {
                    const isOwner = message.role === "owner";
                    return (
                      <div
                        key={index}
                        className={`flex items-start gap-4 ${isOwner ? "flex-row-reverse" : ""}`}
                      >
                        {!isOwner && (
                          <span className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white">
                            <FontAwesomeIcon icon={faUser} />
                          </span>
                        )}
                        <div
                          className={`text-[1.2rem] sm:text-[1.4rem] max-w-[25rem] border border-gray-100 dark:border-gray-600 rounded-xl  p-3.5 ${isOwner ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-600"}`}
                        >
                          {message.content}
                        </div>
                      </div>
                    );
                  })}
                <div ref={endRef}></div>
              </div>
              {showScrollBtn && (
                <button
                  className="absolute bottom-[9rem] right-[2rem] w-12 h-12 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-600 cursor-pointer"
                  onClick={handleScrollIntoNewMessage}
                >
                  <FontAwesomeIcon
                    icon={faAnglesDown}
                    className="text-[1.2rem]"
                  />
                </button>
              )}
              <div className="w-full h-auto flex items-center mt-auto p-6 gap-4">
                <input
                  type="text"
                  id="message"
                  name="message"
                  className="flex-1 w-full h-[5rem] rounded-full outline-none border border-gray-400 focus:border-amber-500 pl-8"
                  placeholder="Enter message..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleReply();
                    }
                  }}
                />
                <button
                  type="button"
                  className="w-[5rem] h-[5rem] rounded-full flex items-center justify-center bg-blue-500 text-white"
                  onClick={handleReply}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="loadingBtn w-[2.4rem] h-[2.4rem] rounded-full border-3 border-white animate-spin"></div>
                  ) : (
                    <FontAwesomeIcon icon={faPaperPlane} />
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="w-full h-full text-gray-400 flex flex-col gap-2.5 items-center justify-center">
              <FontAwesomeIcon icon={faCommentDots} className="text-[6rem] " />
              No conversation
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Chat;
