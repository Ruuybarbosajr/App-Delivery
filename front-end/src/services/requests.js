import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.API_PORT || '3002'}`,
});

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export default api;
