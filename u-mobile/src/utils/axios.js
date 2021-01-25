import axios from "axios";

const http = axios.create({
  baseURL: "/api"
});

// 只获取 data 中的数据
http.interceptors.response.use(res=>{
  return res.data
})

export default http;
