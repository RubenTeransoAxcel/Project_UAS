import axios from 'axios';

const API_URL = "https://rajpvmfarysrjfyncnhe.supabase.co/rest/v1/layanan";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhanB2bWZhcnlzcmpmeW5jbmhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MjM4MDUsImV4cCI6MjA3NjE5OTgwNX0.YHRF-mjpgvmb1k6kSfCaWZihZdQd4Cbw5pS1fULpVWE";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const layananAPI = {
  async fetchLowongan() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  async createLowongan(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  async deleteLowongan(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },

  async updateLowongan(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
    return response.data;
  },
};
