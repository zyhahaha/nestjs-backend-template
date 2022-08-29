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

-- ----------------------------
-- Table structure for shop_cart
-- ----------------------------
DROP TABLE IF EXISTS `shop_cart`;
CREATE TABLE `shop_cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for shop_product
-- ----------------------------
DROP TABLE IF EXISTS `shop_product`;
CREATE TABLE `shop_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `detail` varchar(500) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for shop_order
-- ----------------------------
DROP TABLE IF EXISTS `shop_order`;
CREATE TABLE `shop_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_no` varchar(128) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `product_ids` varchar(100) DEFAULT NULL,
  `product_count_map` varchar(200) DEFAULT NULL,
  `total_price` int DEFAULT NULL,
  `receiver_name` varchar(32) DEFAULT NULL,
  `receiver_mobile` varchar(32) DEFAULT NULL,
  `receiver_address` varchar(128) DEFAULT NULL,
  `order_status` int DEFAULT NULL,
  `postage` int DEFAULT NULL,
  `payment_type` int DEFAULT NULL,
  `pay_time` timestamp NULL DEFAULT NULL,
  `delivery_time` timestamp NULL DEFAULT NULL,
  `end_time` timestamp NULL DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for shop_order_item
-- ----------------------------
DROP TABLE IF EXISTS `shop_order_item`;
CREATE TABLE `shop_order_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_no` varchar(128) DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-------------------------------------------------------- 数据处理 ----------------------------------------------------------------------

-- ----------------------------
-- Table structure for shop_batch_sku_once
-- ----------------------------
DROP TABLE IF EXISTS `shop_batch_sku_once`;
CREATE TABLE `shop_batch_sku_once` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sku` varchar(128) DEFAULT NULL,
  `name` varchar(500) DEFAULT NULL,
  `status` int DEFAULT 0 COMMENT '0: 未处理, 1: 在平台存在, 2: 在平台不存在',
  `refresh_count` int DEFAULT 0 COMMENT '刷新次数',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for shop_batch_djh_sku_once
-- ----------------------------
DROP TABLE IF EXISTS `shop_batch_djh_sku_once`;
CREATE TABLE `shop_batch_djh_sku_once` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sku` varchar(128) DEFAULT NULL,
  `name` varchar(500) DEFAULT NULL,
  `status` int DEFAULT 0 COMMENT '0: 未处理, 1: 在平台存在, 2: 在平台不存在',
  `refresh_count` int DEFAULT 0 COMMENT '刷新次数',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for shop_batch_jdvsp_sku_once
-- ----------------------------
DROP TABLE IF EXISTS `shop_batch_jdvsp_sku_once`;
CREATE TABLE `shop_batch_jdvsp_sku_once` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sku` varchar(128) DEFAULT NULL,
  `name` varchar(500) DEFAULT NULL,
  `status` int DEFAULT 0 COMMENT '0: 未处理, 1: 在平台存在, 2: 在平台不存在',
  `refresh_count` int DEFAULT 0 COMMENT '刷新次数',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for shop_cookie
-- ----------------------------
DROP TABLE IF EXISTS `shop_cookie`;
CREATE TABLE `shop_cookie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `domain` varchar(128) DEFAULT NULL,
  `cookie` text,
  `status` int DEFAULT 1 COMMENT '0: 失效, 1: 未生效',
  `refresh_count` int DEFAULT 0 COMMENT '刷新次数',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for shop_cookie_ispa
-- ----------------------------
DROP TABLE IF EXISTS `shop_cookie_ispa`;
CREATE TABLE `shop_cookie_ispa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `domain` varchar(128) DEFAULT NULL,
  `cookie` text,
  `status` int DEFAULT 1 COMMENT '0: 失效, 1: 未生效',
  `refresh_count` int DEFAULT 0 COMMENT '刷新次数',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for shop_cookie_jdvsp
-- ----------------------------
DROP TABLE IF EXISTS `shop_cookie_jdvsp`;
CREATE TABLE `shop_cookie_jdvsp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `domain` varchar(128) DEFAULT NULL,
  `cookie` text,
  `status` int DEFAULT 1 COMMENT '0: 失效, 1: 未生效',
  `refresh_count` int DEFAULT 0 COMMENT '刷新次数',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-------------------------------------------------------- 数据处理 END ----------------------------------------------------------------------

-- ----------------------------
-- Table structure for shop_statistics
-- ----------------------------
DROP TABLE IF EXISTS `shop_statistics`;
CREATE TABLE `shop_statistics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ip` varchar(128) DEFAULT NULL,
  `type` varchar(128) DEFAULT NULL COMMENT 'ISPA、DJH、ISPA_COOKIE',
  `invoke_count` int DEFAULT 1 COMMENT '调用次数',
  `invoke_date` varchar(128) DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for shop_batch_sku
-- ----------------------------
-- DROP TABLE IF EXISTS `shop_batch_sku`;
-- CREATE TABLE `shop_batch_sku` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `sku` varchar(128) DEFAULT NULL,
--   `name` varchar(500) DEFAULT NULL,
--   `status` int DEFAULT 0 COMMENT '0: 未处理, 1: 在平台存在, 2: 在平台不存在',
--   `refresh_count` int DEFAULT 0 COMMENT '刷新次数',
--   `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
--   `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for shop_coupon
-- ----------------------------
-- DROP TABLE IF EXISTS `shop_coupon`;
-- CREATE TABLE `shop_product` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `name` varchar(100) DEFAULT NULL,
--   `detail` varchar(500) DEFAULT NULL,
--   `price` int DEFAULT NULL,
--   `stock` int DEFAULT NULL,
--   `status` int DEFAULT NULL,
--   `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
--   `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for shop_order_confirm <该表不需要使用，直接用order表的status字段代替>
-- ----------------------------
-- DROP TABLE IF EXISTS `shop_order_confirm`;
-- CREATE TABLE `shop_order_confirm` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `user_id` int DEFAULT NULL,
--   `product_ids` int DEFAULT NULL,
--   `total_price` int DEFAULT NULL,
--   `receiver_name` varchar(32) DEFAULT NULL,
--   `receiver_mobile` varchar(32) DEFAULT NULL,
--   `receiver_address` varchar(128) DEFAULT NULL,
--   `postage` int DEFAULT NULL,
--   `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
--   `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
