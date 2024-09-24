/*
Navicat MySQL Data Transfer

Source Server         : e-shop
Source Server Version : 80028
Source Host           : localhost:3306
Source Database       : e-shop

Target Server Type    : MYSQL
Target Server Version : 80028
File Encoding         : 65001

Date: 2022-03-26 23:06:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for shop_user
-- ----------------------------
DROP TABLE IF EXISTS `shop_user`;
CREATE TABLE `shop_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(32) DEFAULT NULL COMMENT '用户名',
  `password` varchar(50) DEFAULT NULL,
  `password_salt` varchar(50) DEFAULT NULL,
  `password_origin` varchar(50) DEFAULT NULL,
  `avatar` varchar(50) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `role` int(4) unsigned zerofill DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='用户名';

-- ----------------------------
-- Table structure for shop_file_map
-- ----------------------------
DROP TABLE IF EXISTS `shop_file_map`;
CREATE TABLE `shop_file_map` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `size` int DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
