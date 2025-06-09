import axios from "axios";

const API_URL = "https://hoeeyupxjwcnbbzxmjtw.supabase.co/rest/v1/job";
const API_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvZWV5dXB4andjbmJienhtanR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNjk2NjIsImV4cCI6MjA2NDk0NTY2Mn0.756dSUBUpKUS8TisUtQjyuFgK1sxV5ZP64s-RagWMZM";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const jobAPI = {
  async fetchJob() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  async createJob(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  async deleteJob(id) {
    const url = `${API_URL}?id=eq.${id}`;
    const response = await axios.delete(url, { headers });
    return response.data;
  },

  async updateJob(id, data) {
    const url = `${API_URL}?id=eq.${id}`;
    const response = await axios.patch(url, data, { headers });
    return response.data;
  },
};
