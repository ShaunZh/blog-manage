-- MySQL dump 10.13  Distrib 5.7.20, for macos10.12 (x86_64)
--
-- Host: localhost    Database: myweb
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `WEB_ARTICLE`
--

DROP TABLE IF EXISTS `WEB_ARTICLE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `WEB_ARTICLE` (
  `ID` varchar(50) CHARACTER SET utf8 NOT NULL,
  `TITLE` text CHARACTER SET utf8,
  `TAG_ID` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `AUTHOR` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `ABSTRACT` text CHARACTER SET utf8,
  `CREATE_TIME` datetime DEFAULT NULL,
  `MODIFY_TIME` datetime DEFAULT NULL,
  `CONTENT` text CHARACTER SET utf8,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WEB_ARTICLE`
--

LOCK TABLES `WEB_ARTICLE` WRITE;
/*!40000 ALTER TABLE `WEB_ARTICLE` DISABLE KEYS */;
INSERT INTO `WEB_ARTICLE` VALUES ('11121212','æ ‡é¢˜äºŒ','324rg','è‹¹æžœ','ç¬¬äºŒç¯‡æ–‡ç« ',NULL,NULL,NULL),('213er','æ ‡é¢˜ä¸‰','324rg','å¼ å°è™¾','ç¬¬ä¸€ç¯‡æ–‡ç« ',NULL,NULL,NULL),('wdf12er','123ergf','123ergf','123ergb','23erg','2018-01-23 23:07:09','2018-01-23 23:07:15',NULL);
/*!40000 ALTER TABLE `WEB_ARTICLE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WEB_TAG`
--

DROP TABLE IF EXISTS `WEB_TAG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `WEB_TAG` (
  `ID` varchar(255) CHARACTER SET utf8 NOT NULL,
  `NAME` varchar(255) CHARACTER SET gbk NOT NULL DEFAULT '',
  `CREATE_TIME` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `MODIFY_TIME` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WEB_TAG`
--

LOCK TABLES `WEB_TAG` WRITE;
/*!40000 ALTER TABLE `WEB_TAG` DISABLE KEYS */;
INSERT INTO `WEB_TAG` VALUES ('324rg','书法','2018-01-21',NULL),('885f3b80-ffdc-11e7-8708-37920abb219d','有用','2018-01-21',NULL),('9727d420-ffdb-11e7-8708-37920abb219d','吃饭','2018-01-21',NULL),('da233ed0-0040-11e8-aa6c-d176fd6e440f','更新标签',NULL,NULL);
/*!40000 ALTER TABLE `WEB_TAG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WEB_USER`
--

DROP TABLE IF EXISTS `WEB_USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `WEB_USER` (
  `ID` varchar(255) NOT NULL,
  `NAME` varchar(50) DEFAULT '',
  `PASSWORD` varchar(50) NOT NULL,
  `USERNAME` varchar(50) NOT NULL,
  `MOBILE` varchar(50) NOT NULL,
  `HEAD_IMG` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WEB_USER`
--

LOCK TABLES `WEB_USER` WRITE;
/*!40000 ALTER TABLE `WEB_USER` DISABLE KEYS */;
INSERT INTO `WEB_USER` VALUES ('12ertjklefgn','张小虾','','','',NULL);
/*!40000 ALTER TABLE `WEB_USER` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-25 10:46:33
