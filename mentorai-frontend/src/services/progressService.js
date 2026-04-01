import api from "../api/axios";

export const getProgress = async () => {
  const res = await api.get("/progress/my");
  return res.data;
};
