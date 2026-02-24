import React, { useState } from "react";
import { axiosInstance } from "../../../configs/axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function LoginAdmin() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setData({
      email: "",
      password: "",
    });
  };

  const onSubmit = async () => {
    let isError = false;
    if (data.email === "") {
      setError((prev) => ({
        ...prev,
        email: "Please enter your Email!",
      }));
      isError = true;
    }

    if (data.password === "") {
      setError((prev) => ({
        ...prev,
        password: "Please enter your Password!",
      }));
      isError = true;
    }

    if (isError) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/api/v1/auth/login", data);

      if (res.status === 200) {
        toast.success("Đăng nhập thành công!");
        navigate("/admin");
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
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-[40rem] h-auto rounded-xl border border-gray-200 shadow-2xl p-10">
        <h2 className="text-blue-500 font-bold text-center text-[2rem]">
          Login Admin
        </h2>
        <div className="space-y-8 mt-8">
          <div className="flex flex-col gap-2.5 ">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              className="w-full h-[4.2rem] border border-gray-400 rounded-md pl-6 outline-none"
              placeholder="Enter email..."
              onChange={handleChangeInput}
            />
            <p className="text-red-500">{error.email}</p>
          </div>

          <div className="flex flex-col gap-2.5">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              className="w-full h-[4.2rem] border border-gray-400 rounded-md pl-6 outline-none"
              placeholder="Enter password..."
              onChange={handleChangeInput}
            />
            <p className="text-red-500">{error.password}</p>
          </div>

          <button
            type="button"
            className="w-full h-[4.2rem] bg-red-500 text-white rounded-md outline-none hover:bg-red-600 transition-colors duration-300"
            disabled={isLoading}
            onClick={onSubmit}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
