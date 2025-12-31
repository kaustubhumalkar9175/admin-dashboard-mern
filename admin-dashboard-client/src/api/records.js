import axios from "./axios";

export const fetchRecords = async (params) => {
  const res = await axios.get("/records", { params });
  return res.data;
};

export const createRecord = async (data) => {
  const res = await axios.post("/records", data);
  return res.data;
};

export const updateRecord = async (id, data) => {
  const res = await axios.put(`/records/${id}`, data);
  return res.data;
};

export const deleteRecord = async (id) => {
  const res = await axios.delete(`/records/${id}`);
  return res.data;
};
