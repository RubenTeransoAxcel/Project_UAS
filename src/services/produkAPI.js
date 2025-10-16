import axios from "axios";

const API_URL = "https://rajpvmfarysrjfyncnhe.supabase.co/rest/v1/produk";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhanB2bWZhcnlzcmpmeW5jbmhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MjM4MDUsImV4cCI6MjA3NjE5OTgwNX0.YHRF-mjpgvmb1k6kSfCaWZihZdQd4Cbw5pS1fULpVWE";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const produkAPI = {
  async fetchProduk() {
    const res = await axios.get(API_URL, { headers });
    return res.data;
  },

  async createProduk(data) {
    const res = await axios.post(API_URL, data, { headers });
    return res.data;
  },

  async updateProduk(id, data) {
    const res = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
    return res.data;
  },

  async deleteProduk(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },
};
