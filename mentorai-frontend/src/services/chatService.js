import api from "../api/axios";

export const sendMessage = async (message) => {
  const res = await api.post("/chat", { message });
  return res.data;
};
