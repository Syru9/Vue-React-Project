import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3000',
});

// 响应拦截
http.interceptors.response.use((res) => {
  return res.data;
});
export default http;
