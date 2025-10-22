-- MySQL dump 10.13  Distrib 9.4.0, for Win64 (x86_64)
--
-- Host: localhost    Database: inovel
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `inovel`
--

/*!40000 DROP DATABASE IF EXISTS `inovel`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `inovel` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `inovel`;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'金庸','jinyong@example.com','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH.F/JjSl6G8f8KJzHPZ.5QOQrXrYK','2025-09-28 10:21:41','2025-09-28 10:21:41'),(2,'古龙','gulong@example.com','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH.F/JjSl6G8f8KJzHPZ.5QOQrXrYK','2025-09-28 10:21:41','2025-09-28 10:21:41'),(3,'琼瑶','qiongyao@example.com','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH.F/JjSl6G8f8KJzHPZ.5QOQrXrYK','2025-09-28 10:21:41','2025-09-28 10:21:41'),(4,'鲁迅','luxun@example.com','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH.F/JjSl6G8f8KJzHPZ.5QOQrXrYK','2025-09-28 10:21:41','2025-09-28 10:21:41');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分类名称',
  `slug` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'URL友好标识',
  `description` text COLLATE utf8mb4_unicode_ci COMMENT '分类描述',
  `cover_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '分类封面图',
  `is_featured` tinyint(1) DEFAULT '0' COMMENT '是否推荐',
  `sort_order` int DEFAULT '0' COMMENT '排序权重',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'未分类','uncategorized','默认分类',NULL,0,0,'2025-10-01 15:46:56','2025-10-01 15:46:56'),(2,'武侠小说','wuxia','传统武侠、新武侠作品',NULL,1,0,'2025-10-01 15:46:56','2025-10-01 15:46:56'),(3,'玄幻奇幻','fantasy','东方玄幻、西方奇幻',NULL,1,0,'2025-10-01 15:46:56','2025-10-01 15:46:56'),(4,'都市生活','urban','现代都市题材',NULL,1,0,'2025-10-01 15:46:56','2025-10-01 15:46:56'),(5,'历史军事','history','历史穿越、军事题材',NULL,0,0,'2025-10-01 15:46:56','2025-10-01 15:46:56'),(6,'科幻未来','scifi','科幻、未来世界',NULL,0,0,'2025-10-01 15:46:56','2025-10-01 15:46:56'),(7,'言情小说','romance','爱情、情感题材',NULL,1,0,'2025-10-01 15:46:56','2025-10-01 15:46:56'),(8,'悬疑推理','mystery','侦探、悬疑、推理',NULL,0,0,'2025-10-01 15:46:56','2025-10-01 15:46:56'),(9,'网游竞技','game','网游、电竞题材',NULL,0,0,'2025-10-01 15:46:56','2025-10-01 15:46:56'),(10,'恐怖灵异','horror','恐怖、灵异故事',NULL,0,0,'2025-10-01 15:46:56','2025-10-01 15:46:56');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapters`
--

DROP TABLE IF EXISTS `chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `novel_id` int NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `chapter_number` int NOT NULL,
  `word_count` int DEFAULT '0',
  `is_vip` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `novel_id` (`novel_id`),
  CONSTRAINT `chapters_ibfk_1` FOREIGN KEY (`novel_id`) REFERENCES `novels` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
INSERT INTO `chapters` VALUES (1,1,'第一回 风雪惊变','钱塘江浩浩江水，日日夜夜无穷无休地从临安牛家村边绕过，东流入海。江畔一排数十株乌柏树，叶子似火烧般红，正是八月天时。村前村后的野草刚起始变黄，一抹斜阳映照之下，更增了几分萧索。两株大松树下围着一堆村民，男男女女和十几个小孩，正自聚精会神地听着一个瘦削的老者说话。那说话人五十来岁年纪，一件青布长袍早洗得褪成了蓝灰色。只听他两片梨花木板碰了几下，左手中竹棒在一面小羯鼓上敲起得得连声。唱道：「小桃无主自开花，烟草茫茫带晚鸦。几处败垣围故井，向来一一是人家。」',1,3500,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(2,1,'第二回 江南七怪','这晚梅超风与陈玄风悄悄议论，黄药师尽管聪明绝顶，却也无法想到，自己的弟子竟会偷窥《九阴真经》。他们二人私心窃喜，以为得计，却不知这正是他们悲剧的开始。',2,3200,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(3,1,'第三回 大漠风沙','郭靖随母亲离开牛家村，一路北上。大漠风沙如刀，刮得人脸生疼。这日正行间，忽见远处尘头大起，一队蒙古骑兵疾驰而来。',3,3800,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(4,1,'第四回 黑风双煞','荒山野岭之中，梅超风长发飞舞，双目已盲却听觉敏锐。郭靖躲在岩石之后，大气不敢出一口，眼见那铁尸五指如钩，正自四下摸索。',4,4100,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(5,1,'第五回 弯弓射雕','草原之上，郭靖拉开铁胎弓，瞄准空中盘旋的巨雕。华筝在一旁拍手叫好，拖雷则紧张地注视着。这一箭射出，不仅关乎比试胜负，更将改变众人命运。',5,2900,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(6,2,'第一回 风月无情','终南山下，活死人墓前，李莫愁一袭道袍，手执拂尘，望着那紧闭的墓门，眼中尽是怨毒之色。\"师妹，你既不肯出来见我，就莫怪师姐无情了！\"',1,4000,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(7,2,'第二回 英雄大宴','襄阳城中，郭靖黄蓉大摆英雄宴，各路豪杰齐聚。杨过随郭芙前来，却因衣衫褴褛被众人轻视。谁也不知，这少年日后将成为何等人物。',2,3700,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(8,2,'第三回 拜师学艺','古墓之中，小龙女白衣如雪，教导杨过修习玉女心经。二人朝夕相处，一个不谙世事，一个天真烂漫，竟不知情愫暗生。',3,3500,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(9,2,'第四回 绝情幽谷','绝情谷中，公孙止道貌岸然，实则心怀鬼胎。杨过为救小龙女，身中情花剧毒，却仍强忍痛楚，不肯屈服。',4,4200,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(10,2,'第五回 十六年约','断肠崖前，杨过眼睁睁看着小龙女跃入深谷，留下\"十六年后，在此相会\"的约定。他仰天长啸，泪流满面，从此浪迹天涯。',5,3900,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(11,3,'第一章 飞刀与快剑','秋天的风很冷，冷得像是刀锋。李寻欢坐在马车里，不停地咳嗽。他手里握着一把小刀，正在雕刻一个人像。人像已渐渐成形，是个美丽的女人。',1,2800,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(12,3,'第二章 梅花盗','夜色如墨，梅花盗悄然现身。李寻欢放下酒杯，眼中闪过一丝锐利的光芒。\"你终于来了。\"他的声音很轻，却带着不容置疑的威严。',2,3100,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(13,3,'第三章 龙啸云','龙啸云的出现让李寻欢既惊且喜。多年好友重逢，本该把酒言欢，却因林诗音的存在，使二人之间生出微妙隔阂。',3,2900,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(14,3,'第四章 嵩阳铁剑','郭嵩阳的铁剑重达七十二斤，剑法却轻灵迅捷。他与李寻欢一战，虽败犹荣，二人惺惺相惜，结为知己。',4,3300,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(15,3,'第五章 阿飞','雪地里，少年阿飞手持一柄薄如蝉翼的剑。他的剑法没有花招，只有快，快得令人难以置信。李寻欢看着他，仿佛看到了年轻时的自己。',5,2700,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(16,4,'第一章 紫薇进宫','乾隆年间，北京城热闹非凡。紫薇带着金锁，怀揣着母亲的遗愿，踏进了紫禁城的大门。她不知道，这将彻底改变她的命运。',1,2500,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(17,4,'第二章 小燕子','市井之中，小燕子身手矫健，从一群追兵手中逃脱。她无意中闯入皇家围场，与乾隆皇帝不期而遇，谁也没想到这次相遇会引发怎样的风波。',2,2300,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(18,4,'第三章 认亲','紫薇在淑芳斋外长跪不起，小燕子急得团团转。当乾隆终于得知真相时，这位九五之尊的皇帝，竟也流下了热泪。',3,2600,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(19,4,'第四章 宫廷险恶','皇后和容嬷嬷设下毒计，紫薇被关进暗室受尽折磨。小燕子不顾自身安危，挺身相救，姐妹情深令人动容。',4,2400,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(20,4,'第五章 真相大白','在福尔康等人的帮助下，紫薇终于与乾隆相认。小燕子虽然失去了格格身份，却收获了真挚的亲情和友情。',5,2200,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(21,5,'第一回 青衫磊落险峰行','青光闪动，一柄青钢剑倏地刺出，指向中年汉子左肩。那汉子不挡不闪，反而挺胸迎上。使剑的少年不由一怔，急忙收剑。',1,5000,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(22,5,'第二回 玉璧月华明','无量山剑湖宫中，段誉不慎跌入悬崖，却意外发现琅嬛福地。那尊玉像栩栩如生，令他魂牵梦萦，不知是福是祸。',2,4800,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(23,5,'第三回 马疾香幽','乔峰与段誉在无锡城外相遇，二人斗酒比脚力，豪气干云。谁也不知，这位丐帮帮主的身世之谜即将揭开。',3,5200,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(24,5,'第四回 崖高人远','少林寺中，虚竹误打误撞破解珍珑棋局，得无崖子传授毕生功力。这个老实巴交的小和尚，命运从此改变。',4,4900,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(25,5,'第五回 枯井底，污泥处','西夏皇宫内，王语嫣终于明白自己对段誉的感情。枯井之中，污泥之处，却成就了最纯洁的爱情。',5,4600,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(26,6,'第一章 灭门','华山派弟子令狐冲正在思过崖面壁，忽闻山下传来噩耗：衡山派刘正风金盆洗手大典上，嵩山派突然发难，刘家满门被杀。',1,3800,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(27,6,'第二章 授谱','华山绝顶，风清扬传授令狐冲独孤九剑。\"无招胜有招\"的剑理让令狐冲茅塞顿开，武功大进。',2,3500,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(28,6,'第三章 救美','洛阳城中，令狐冲为救仪琳，与田伯光斗智斗勇。他虽身受重伤，却始终不肯退让，展现侠义本色。',3,4000,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(29,6,'第四章 倾心','绿竹巷中，任盈盈以婆婆身份教授令狐冲琴艺。二人虽未见面，却已心意相通，情愫暗生。',4,3700,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(30,6,'第五章 联手','黑木崖上，令狐冲与任我行、向问天联手对抗东方不败。那一战惊天动地，改变了整个武林格局。',5,4200,0,'2025-09-28 10:21:42','2025-09-28 10:21:42'),(31,7,'狂人日记','今天晚上，很好的月光。我不见他，已是三十多年；今天见了，精神分外爽快。才知道以前的三十多年，全是发昏；然而须十分小心。不然，那赵家的狗，何以看我两眼呢？',1,20000,0,'2025-09-28 10:21:42','2025-09-28 10:21:42');
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `novel_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `novel_id` (`novel_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`novel_id`) REFERENCES `novels` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `novels`
--

DROP TABLE IF EXISTS `novels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `novels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author_id` int NOT NULL,
  `cover_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `category` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'uncategorized',
  `status` enum('ongoing','completed') COLLATE utf8mb4_unicode_ci DEFAULT 'ongoing',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `word_count` int DEFAULT '0',
  `tags` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  FULLTEXT KEY `title` (`title`,`description`) /*!50100 WITH PARSER `ngram` */ ,
  CONSTRAINT `novels_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `novels`
--

LOCK TABLES `novels` WRITE;
/*!40000 ALTER TABLE `novels` DISABLE KEYS */;
INSERT INTO `novels` VALUES (1,'射雕英雄传',1,'/covers/shediao.jpg','南宋年间，郭靖与黄蓉的传奇故事','武侠','completed','2025-09-28 10:21:41','2025-09-28 10:21:41',1200000,''),(2,'神雕侠侣',1,'/covers/shendiao.jpg','杨过与小龙女的师徒之恋','武侠','completed','2025-09-28 10:21:41','2025-09-28 10:21:41',1000000,''),(3,'多情剑客无情剑',2,'/covers/duoqing.jpg','小李飞刀系列第一部','武侠','completed','2025-09-28 10:21:41','2025-09-28 10:21:41',800000,''),(4,'还珠格格',3,'/covers/huanzhu.jpg','乾隆时期的宫廷爱情故事','言情','completed','2025-09-28 10:21:41','2025-09-28 10:21:41',500000,''),(5,'天龙八部',1,'/covers/tianlong.jpg','北宋年间，乔峰、段誉和虚竹的故事','武侠','completed','2025-09-28 10:21:41','2025-09-28 10:21:41',1500000,''),(6,'笑傲江湖',1,'/covers/xiaoao.jpg','令狐冲的江湖冒险故事','武侠','completed','2025-09-28 10:21:41','2025-09-28 10:21:41',1100000,''),(7,'狂人日记',4,'/covers/kuangren.jpg','中国现代文学史上的第一篇白话小说','文学','completed','2025-09-28 10:21:41','2025-09-28 10:21:41',20000,'');
/*!40000 ALTER TABLE `novels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `novel_id` int NOT NULL,
  `user_id` int NOT NULL,
  `score` tinyint NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `novel_id` (`novel_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`novel_id`) REFERENCES `novels` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ratings_chk_1` CHECK ((`score` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_favorites`
--

DROP TABLE IF EXISTS `user_favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `novel_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_novel` (`user_id`,`novel_id`),
  KEY `novel_id` (`novel_id`),
  CONSTRAINT `user_favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_favorites_ibfk_2` FOREIGN KEY (`novel_id`) REFERENCES `novels` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_favorites`
--

LOCK TABLES `user_favorites` WRITE;
/*!40000 ALTER TABLE `user_favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '/images/default-avatar.jpg',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_login` timestamp NULL DEFAULT NULL,
  `status` enum('active','suspended','deleted') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'zzh','3147307592@qq.com','$2b$10$e3Vce.SofsRLoShv.9YpGujvzhT2FjqVfDKX9IZuyByZeFl0Kc2Ca','/images/default-avatar.jpg','2025-10-02 17:13:31','2025-10-02 17:28:28','2025-10-02 17:28:28','active');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'inovel'
--

--
-- Dumping routines for database 'inovel'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-03  2:39:21
