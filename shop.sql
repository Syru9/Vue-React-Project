/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80020
 Source Host           : localhost:3306
 Source Schema         : shop

 Target Server Type    : MySQL
 Target Server Version : 80020
 File Encoding         : 65001

 Date: 25/01/2021 20:26:51
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner`  (
  `id` smallint(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '轮播图id',
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '轮播图标题',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '轮播图图片地址',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '轮播图表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES (1, 'banner1', '/uploads/banner/3a1289f0-5e20-11eb-a5b4-236eec50e57c.jpg', 1);
INSERT INTO `banner` VALUES (2, 'banner2', '/uploads/banner/8daf9170-5e20-11eb-a5b4-236eec50e57c.jpg', 1);
INSERT INTO `banner` VALUES (3, 'banner3', '/uploads/banner/925b3f30-5e20-11eb-a5b4-236eec50e57c.jpg', 1);
INSERT INTO `banner` VALUES (4, 'banner4', '/uploads/banner/974aacb0-5e20-11eb-a5b4-236eec50e57c.jpg', 1);

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '购物车主键',
  `uid` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户id',
  `goodsid` int(0) NOT NULL COMMENT '商品编号',
  `num` tinyint(0) NOT NULL COMMENT '数量',
  `status` tinyint(1) NOT NULL COMMENT '选中状态',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uid`(`uid`, `goodsid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '购物车表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES (12, '6de71c80-5ee0-11eb-a0ff-4f0092261f4f', 1, 2, 1);
INSERT INTO `cart` VALUES (13, '6de71c80-5ee0-11eb-a0ff-4f0092261f4f', 4, 2, 1);

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` smallint(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '分类编号',
  `pid` smallint(0) UNSIGNED NOT NULL COMMENT '上级分类编号',
  `catename` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类名称',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类图片',
  `status` tinyint(0) UNSIGNED NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '商品分类表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 0, '电子产品', '', 1);
INSERT INTO `category` VALUES (2, 0, '厨房用品', '', 1);
INSERT INTO `category` VALUES (3, 1, '手机', '/uploads/category/796645a0-5e12-11eb-a5b4-236eec50e57c.webp', 1);
INSERT INTO `category` VALUES (4, 1, '耳机', '/uploads/category/96dd7450-5e12-11eb-a5b4-236eec50e57c.jpg', 1);
INSERT INTO `category` VALUES (5, 2, '炒锅', '/uploads/category/b2f0cd40-5e12-11eb-a5b4-236eec50e57c.jpg', 1);
INSERT INTO `category` VALUES (6, 2, '碗碟', '/uploads/category/d2107bd0-5e12-11eb-a5b4-236eec50e57c.jpg', 1);

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品编号',
  `first_cateid` smallint(0) UNSIGNED NOT NULL COMMENT '一级分类编号',
  `second_cateid` smallint(0) NOT NULL COMMENT '二级分类编号',
  `goodsname` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品名称',
  `price` decimal(10, 2) NOT NULL COMMENT '商品价格',
  `market_price` decimal(10, 2) NOT NULL COMMENT '市场价格',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品图片',
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '商品描述',
  `specsid` int(0) NOT NULL COMMENT '规格id',
  `specsattr` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '规则属性值',
  `isnew` tinyint(1) NOT NULL COMMENT '是否新品1是2不是',
  `ishot` tinyint(1) NOT NULL COMMENT '是否热卖1是2不是',
  `status` tinyint(1) NOT NULL COMMENT '状态1启用2禁用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '商品表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (1, 1, 3, 'iPhone', 110.00, 110.00, '/uploads/8dbcc3c0-5e13-11eb-a5b4-236eec50e57c.jpg', '<p>iPhone</p>', 1, '套餐A', 2, 1, 1);
INSERT INTO `goods` VALUES (2, 1, 4, 'airpods', 150.00, 150.00, '/uploads/c68c5fd0-5e13-11eb-a5b4-236eec50e57c.jpg', '<p>airPods</p>', 1, '套餐B', 2, 1, 1);
INSERT INTO `goods` VALUES (3, 2, 6, '景德镇陶瓷', 200.00, 200.00, '/uploads/e6f8d9b0-5e13-11eb-a5b4-236eec50e57c.jpg', '<p>景德镇陶瓷<br></p>', 2, '折扣A', 1, 1, 1);
INSERT INTO `goods` VALUES (4, 2, 5, '苏泊尔炒锅', 300.00, 300.00, '/uploads/0d5e41d0-5e14-11eb-a5b4-236eec50e57c.jpg', ' <p>苏泊尔炒锅</p>', 1, '套餐C', 1, 1, 1);

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户编号',
  `phone` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '手机号',
  `nickname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '昵称',
  `password` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `randstr` char(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码随机串',
  `addtime` char(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '注册时间',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '会员表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of member
-- ----------------------------
INSERT INTO `member` VALUES (1, '6de71c80-5ee0-11eb-a0ff-4f0092261f4f', '12312341234', '用户111', '4a9f93d39421256886fe33e0613d1a4c', 'Aj82i', '1611560357448', 1);
INSERT INTO `member` VALUES (2, 'f381afe0-5ee0-11eb-a0ff-4f0092261f4f', '32112341234', '333', '73d345e1f61ee0fe079ab11746711e2e', 'pgsXa', '1611560581598', 1);

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `id` smallint(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '菜单编号',
  `pid` smallint(0) NOT NULL COMMENT '上级菜单编号',
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单名称',
  `icon` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单图标',
  `type` tinyint(1) NOT NULL COMMENT '菜单类型1目录2菜单',
  `url` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单地址',
  `status` tinyint(1) NOT NULL COMMENT '菜单状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '后台菜单权限表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (4, 0, '系统管理', 'el-icon-s-tools', 1, '', 1);
INSERT INTO `menu` VALUES (5, 0, '商城管理', 'el-icon-s-goods', 1, '', 1);
INSERT INTO `menu` VALUES (6, 4, '菜单管理', '', 2, '/menu', 1);
INSERT INTO `menu` VALUES (7, 4, '角色管理', '', 2, '/role', 1);
INSERT INTO `menu` VALUES (9, 4, '管理员管理', '', 2, '/user', 1);
INSERT INTO `menu` VALUES (10, 5, '商品管理', '', 2, '/goods', 1);
INSERT INTO `menu` VALUES (11, 5, '商品分类', '', 2, '/classify', 1);
INSERT INTO `menu` VALUES (12, 5, '商品规格', '', 2, '/specs', 1);
INSERT INTO `menu` VALUES (13, 5, '轮播图管理', '', 2, '/banner', 1);
INSERT INTO `menu` VALUES (15, 5, '会员管理', '', 2, '/member', 1);
INSERT INTO `menu` VALUES (16, 5, '秒杀活动', '', 2, '/secondKill', 1);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` smallint(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '角色编号',
  `rolename` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色名称',
  `menus` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单权限 存放的是菜单编号，用逗号隔开',
  `status` tinyint(1) NOT NULL COMMENT '角色状态1正常2禁用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '后台用户角色表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, '超级管理员', '4,6,7,9,5,10,11,12,13,15,16', 1);
INSERT INTO `role` VALUES (2, '普通管理员', '5,10,11,12', 1);

-- ----------------------------
-- Table structure for seckill
-- ----------------------------
DROP TABLE IF EXISTS `seckill`;
CREATE TABLE `seckill`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '秒杀表id',
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '活动名称',
  `begintime` char(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '秒杀开始时间',
  `endtime` char(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '秒杀结束时间',
  `first_cateid` smallint(0) NOT NULL COMMENT '商品一级分类编号',
  `second_cateid` smallint(0) NOT NULL COMMENT '商品二级分类编号',
  `goodsid` int(0) NOT NULL COMMENT '商品编号',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '限时秒杀活动表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of seckill
-- ----------------------------
INSERT INTO `seckill` VALUES (1, '活动1', '1611417600000', '1611504000000', 1, 3, 1, 1);
INSERT INTO `seckill` VALUES (2, '活动2', '1611676800000', '1611849600000', 2, 5, 4, 1);
INSERT INTO `seckill` VALUES (5, 'aaaa', '1609862400000', '1611417600000', 1, 4, 2, 1);

-- ----------------------------
-- Table structure for specs
-- ----------------------------
DROP TABLE IF EXISTS `specs`;
CREATE TABLE `specs`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '规格id',
  `specsname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '规格名称',
  `status` tinyint(1) NOT NULL COMMENT '规格状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '商品规格表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of specs
-- ----------------------------
INSERT INTO `specs` VALUES (1, '套餐', 1);
INSERT INTO `specs` VALUES (2, '折扣', 1);

-- ----------------------------
-- Table structure for specs_attr
-- ----------------------------
DROP TABLE IF EXISTS `specs_attr`;
CREATE TABLE `specs_attr`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '规格项编号',
  `specsid` int(0) NOT NULL COMMENT '规格的specsid',
  `specsval` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '规格值',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '商品规格明细表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of specs_attr
-- ----------------------------
INSERT INTO `specs_attr` VALUES (1, 1, '套餐A');
INSERT INTO `specs_attr` VALUES (2, 1, '套餐B');
INSERT INTO `specs_attr` VALUES (3, 1, '套餐C');
INSERT INTO `specs_attr` VALUES (4, 2, '折扣A');
INSERT INTO `specs_attr` VALUES (5, 2, '折扣B');
INSERT INTO `specs_attr` VALUES (6, 2, '折扣C');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` smallint(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '住建',
  `uid` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '管理员编号',
  `roleid` smallint(0) NOT NULL COMMENT '角色编号',
  `username` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `randstr` char(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '随机加密串',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uid`(`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '后台管理员用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'fb0f21e0-5e11-11eb-a5b4-236eec50e57c', 1, 'admin', '5c1fe45b25f4dab8f7032698e23d623b', '4x7ZJ', 1);

SET FOREIGN_KEY_CHECKS = 1;
