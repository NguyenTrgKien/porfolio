import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimateMotion from "../../../components/AnimateMotion";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import { axiosInstance } from "../../../configs/axiosConfig";
import { toast } from "react-toastify";

function ConnectSection() {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  const resetForm = () => {
    setData({
      fullName: "",
      email: "",
      message: "",
    });
  };
  const handleSend = async () => {
    let isError = false;
    if (data.fullName === "") {
      setError((prev) => ({
        ...prev,
        fullName: "Please enter your FullName!",
      }));
      isError = true;
    }

    if (data.email === "") {
      setError((prev) => ({
        ...prev,
        email: "Please enter your Email!",
      }));
      isError = true;
    }

    if (data.message === "") {
      setError((prev) => ({
        ...prev,
        message: "Please enter your Message!",
      }));
      isError = true;
    }

    if (isError) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/api/v1/contact", data);

      if (res.status === 201) {
        toast.success("Đã gửi email thành công");
        resetForm();
      }
    } catch (error) {
      console.log(error);
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="text-center mt-[12rem] mb-[5rem]">
      <AnimateMotion delay={0.2}>
        <h3 className="text-[1.8rem] md:text-[2.8rem] ld:text-[3.4rem] font-bold">
          Let's Connect
        </h3>
      </AnimateMotion>
      <AnimateMotion delay={0.3}>
        <p className="text-[1.4rem] md:text-[1.6rem] mt-4">
          I'd love to collaborate and share creative ideas
        </p>
      </AnimateMotion>

      <AnimateMotion delay={0.2}>
        <div className="w-full h-auto mt-[4rem] text-[1.2rem] md:text-[1.4rem]">
          <div className="md:w-[60%] lg:w-[50%] mx-auto dark:border dark:border-gray-500 rounded-xl p-6 md:p-8 lg:p-12 border border-gray-100 shadow-md">
            <h3 className="md:text-[1.6rem] lg:text-[1.8rem] font-bold text-start">
              Send Message
            </h3>
            <div className="flex flex-col items-start gap-2.5 mt-8">
              <label htmlFor="fullName">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={data.fullName}
                className="w-full h-[4.2rem] border border-gray-400 outline-none pl-5 rounded-md focus:border-amber-500 placeholder:text-gray-500"
                placeholder="FullName..."
                onChange={handleChangeInput}
              />
              <p className="text-red-500">{error.fullName}</p>
            </div>

            <div className="flex flex-col items-start gap-2.5 mt-8">
              <label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={data.email}
                className="w-full h-[4.2rem] border border-gray-400 outline-none pl-5 rounded-md focus:border-amber-500 placeholder:text-gray-500"
                placeholder="Email..."
                onChange={(e) => {
                  handleChangeInput(e);
                }}
              />
              <p className="text-red-500">{error.email}</p>
            </div>

            <div className="flex flex-col items-start gap-2.5 mt-8">
              <label htmlFor="message">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                name="message"
                id="message"
                value={data.message}
                className="w-full border border-gray-400 outline-none p-4 rounded-md focus:border-amber-500 placeholder:text-gray-500"
                placeholder="Message..."
                onChange={handleChangeInput}
              />
              <p className="text-red-500">{error.message}</p>
            </div>

            <button
              type="button"
              className="w-full h-[4.2rem] flex items-center gap-2.5 justify-center bg-amber-600 mt-8 rounded-md hover:bg-amber-700 transition-colors duration-300 text-white"
              onClick={handleSend}
              disabled={isLoading}
            >
              {isLoading ? (
                "Đang gửi...  "
              ) : (
                <>
                  <span>Send</span>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </>
              )}
            </button>
          </div>
        </div>
      </AnimateMotion>
    </section>
  );
}

export default ConnectSection;
