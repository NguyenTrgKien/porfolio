import { useEffect, useState } from "react";
import ContactAi from "../../Layouts/ContactAi";
import Footer from "../../Layouts/Footer";
import Header from "../../Layouts/Header";
import Main from "../../Layouts/Main";
import { axiosInstance } from "../../configs/axiosConfig";
import socket from "../../configs/socket";

function HomePage() {
  const [sessionStatus, setSessionStatus] = useState<
    "loading" | "error" | "ready"
  >("loading");
  useEffect(() => {
    const getSession = async () => {
      try {
        await axiosInstance.get("/api/v1/chat/session", { timeout: 10000 });
        socket.disconnect();
        socket.once("connect", () => {
          setSessionStatus("ready");
        });
        socket.connect();
      } catch (error) {
        console.log(error);
      }
    };
    getSession();
  }, []);

  return (
    <div className="text-[1.4rem] font-extralight dark:bg-[#000033] text-gray-800 dark:text-white transition-colors duration-500">
      <Header />
      <Main />
      <Footer />
      {<ContactAi status={sessionStatus} />}
    </div>
  );
}

export default HomePage;
