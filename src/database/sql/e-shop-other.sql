-- ----------------------------
-- Table structure for powerful_table
-- ----------------------------
DROP TABLE IF EXISTS `powerful_table`;
CREATE TABLE `powerful_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(128) DEFAULT NULL COMMENT 'IP、Test、CV_MESSAGE',
  `content` text,
  `content_two` text,
  `content_three` text,
  `status` int DEFAULT 1 COMMENT '0: 失效, 1: 未生效',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
