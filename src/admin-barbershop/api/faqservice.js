import axios from "axios";

const API_URL = "http://localhost:3001/faqs";

export const fetchFAQs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createFAQ = async (faq) => {
  await axios.post(API_URL, faq);
};

export const updateFAQ = async (id, faq) => {
  await axios.put(`${API_URL}/${id}`, faq);
};

export const deleteFAQ = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};