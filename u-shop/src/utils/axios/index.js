import axios from "./axios";
// 请求接口

// !菜单模块
// 添加菜单
export function addMenu(data) {
  return axios.post("/api/menuadd", data);
}

// 获取菜单数据
export function getMenu() {
  return axios.get("/api/menulist?istree=true");
}

// 删除一条菜单数据
export function delMenu(id) {
  return axios.post("/api/menudelete", { id });
}

// 获取单条数据数据
export function getById(id) {
  return axios.get("/api/menuinfo", {
    params: { id }
  });
}

// 修改数据
export function editInfo(data) {
  return axios.post("/api/menuedit", data);
}

// !管理员管理模块
// 管理员添加
export function addUser(data) {
  return axios.post("/api/useradd", data);
}

// 获取管理员列表
export function getUser(params) {
  return axios.get("/api/userlist", {
    params
  });
}

// 获取一条管理员数据
export function getUserInfo(uid) {
  return axios.get("/api/userinfo", {
    params: { uid }
  });
}

// 管理员删除
export function deleteUser(uid) {
  return axios.post("/api/userdelete", { uid });
}

// 管理员修改
export function editUser(data) {
  return axios.post("/api/useredit", data);
}

// 管理员总数  计算分页
export function userCount() {
  return axios.get("/api/usercount");
}

// !角色管理模块
// 添加角色
export function addRole(data) {
  return axios.post("/api/roleadd", data);
}

// 获取角色列表
export function getRole() {
  return axios.get("/api/rolelist");
}

// 获取一条角色数据
export function getRoleInfo(id) {
  return axios.get("/api/roleinfo", {
    params: { id }
  });
}

// 删除一条角色数据
export function deleteRole(id) {
  return axios.post("/api/roledelete", { id });
}

// 角色修改
export function editRole(data) {
  return axios.post("/api/roleedit", data);
}

// !登录接口
export function login(data) {
  return axios.post("/api/userlogin", data);
}

// !商品分类模块
// 获取商品分类列表
export function getClassify() {
  return axios.get("/api/catelist", {
    params: {
      istree: true
    }
  });
}

// 添加一条商品分类
export function addClassify(data) {
  // 表单包含上传，需要更改格式
  const file = new FormData();
  for (const item in data) {
    file.append(item, data[item]);
  }
  return axios.post("/api/cateadd", file);
}

// 删除一条商品分类
export function deleteClassify(id) {
  return axios.post("/api/catedelete", { id });
}

// 获取一条商品分类的数据
export function getClassifyInfo(id) {
  return axios.get("/api/cateinfo", {
    params: { id }
  });
}

// 修改一条商品分类数据
export function editClassify(data) {
  const file = new FormData();
  for (const item in data) {
    file.append(item, data[item]);
  }
  return axios.post("/api/cateedit", file);
}

// !商品规格模块
//获取规格列表 分页
export function getSpecs(params) {
  return axios.get("/api/specslist", {
    params
  });
}

// 获取规格总数
export function getSpecsCount() {
  return axios.get("/api/specscount");
}

// 添加规格
export function addSpecs(data) {
  return axios.post("/api/specsadd", data);
}

// 删除规格
export function delSpecs(id) {
  return axios.post("/api/specsdelete", { id });
}

// 获取一条数据
export function getSpecsInfo(id) {
  return axios.get("/api/specsinfo", {
    params: { id }
  });
}

// 修改数据
export function editSpecs(data) {
  return axios.post("/api/specsedit", data);
}

// !商品管理模块
// 获取商品列表 分页
export function getGoods(params) {
  return axios.get("/api/goodslist", { params });
}

// 获取商品列表总量
export function getGoodsCount() {
  return axios.get("/api/goodscount");
}

// 添加商品
export function addGoods(data) {
  const file = new FormData();
  for (const i in data) {
    file.append(i, data[i]);
  }
  return axios.post("/api/goodsadd", file);
}

// 删除商品
export function delGoods(id) {
  return axios.post("/api/goodsdelete", { id });
}

// 获取一条数据
export function getGoodsInfo(params) {
  return axios.get("/api/goodsinfo", { params });
}

// 修改一条数据
export function editGoods(data) {
  const file = new FormData();
  for (const item in data) {
    file.append(item, data[item]);
  }
  return axios.post("/api/goodsedit", file);
}

// ! 轮播图 banner模块
// 获取轮播图列表
export function getBanner() {
  return axios.get("/api/bannerlist");
}

// 添加一条 banner 数据
export function addBanner(data) {
  const file = new FormData();
  for (const i in data) {
    file.append(i, data[i]);
  }
  return axios.post("/api/banneradd", file);
}

// 删除一条 banner
export function delBanner(id) {
  return axios.post("/api/bannerdelete", { id });
}

// 获取一条 banner 数据
export function getBannerInfo(id) {
  return axios.get("/api/bannerinfo", {
    params: { id }
  });
}

// 编辑一条 banner 数据
export function editBanner(data) {
  const file = new FormData();
  for (const i in data) {
    file.append(i, data[i]);
  }
  return axios.post("/api/banneredit", file);
}

// !显示秒杀模块
// 获取秒杀列表
export function getSecondKill() {
  return axios.get("/api/secklist");
}

// 添加一条秒杀信息
export function addSecondKillInfo(data) {
  return axios.post("/api/seckadd", data);
}

// 删除一条秒杀信息
export function delSecondKill(id) {
  return axios.post("/api/seckdelete", { id });
}

// 获取一条秒杀信息
export function getSecondKillInfo(id) {
  return axios.get("/api/seckinfo", {
    params: { id }
  });
}

// 编辑一条秒杀信息
export function editSecondKill(data) {
  return axios.post("/api/seckedit", data);
}

// !会员管理模块
// 获取会员列表
export function getMember() {
  return axios.get("/api/memberlist");
}

// 获取一条会员信息
export function getMemberInfo(uid) {
  return axios.get("/api/memberinfo", {
    params: { uid }
  });
}

// 会员修改
export function editMember(data) {
  return axios.post("/api/memberedit", data);
}
