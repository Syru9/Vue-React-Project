import axios from "axios";
import router from "./../../router";

// 配置 axios
const http = axios.create({
  baseURL: "/api"
});

// 请求拦截器
http.interceptors.request.use(req => {
  // console.log(req);
  const authorization = sessionStorage.getItem("login")
    ? JSON.parse(sessionStorage.getItem("login")).token
    : "";
  // console.log(authorization);
  req.headers.authorization = authorization;
  return req;
});

// 响应拦截器   一般用于全局拦截错误
http.interceptors.response.use(res => {
  // console.log(res);
  if (res.data.code === 500) {
    alert(res.data.msg)
    router.push("/login");
  } else if (res.data.code === 403) {
    alert(res.data.msg)
    router.push("/login");
  }
  return res;
});

export default http;
