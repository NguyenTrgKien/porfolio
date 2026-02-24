import { useEffect, useState } from "react";
import { axiosInstance } from "../configs/axiosConfig";

const fetchMe = async () => {
  try {
    const res = await axiosInstance.get("/api/v1/auth/me");
    if (res.status !== 200 || !res.data.data) {
      return null;
    }
    return res.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export function useAdmin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMe()
      .then((data) => setUser(data))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
