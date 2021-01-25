import axios from "./axios";

// 获取轮播图
export function getBanner() {
  return axios.get("/api/getbanner");
}

// 获取商品
export function getGoods() {
  return axios.get("/api/getindexgoods");
}

// 获取商品分类
export function getClassify() {
  return axios.get("/api/getcatetree");
}

// 获取商品列表
export function getGoodsList(fid) {
  return axios.get("/api/getgoods", {
    params: { fid }
  });
}

// 获取一个商品信息
export function getGoodInfo(id) {
  return axios.get("/api/getgoodsinfo", {
    params: { id }
  });
}

// 用户注册
export function register(data) {
  return axios.post("/api/register", data);
}

// 用户登录
export function login(data) {
  return axios.post("/api/login", data);
}

// 添加到购物车
export function addCart(data) {
  return axios.post("/api/cartadd", data);
}

// 获取购物车
export function getCart(uid) {
  return axios.get("/api/cartlist", {
    params: { uid }
  });
}

// 购物车删除
export function delCart(id) {
  return axios.post("/api/cartdelete", { id });
}
