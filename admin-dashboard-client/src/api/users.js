import axios from "./axios";

export const fetchUsers = async (params) => {
  const res = await axios.get("/users", { params });
  return res.data;
};
