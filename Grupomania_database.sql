CREATE DATABASE  IF NOT EXISTS `grupomania` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `grupomania`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: grupomania
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `idcomments` int NOT NULL AUTO_INCREMENT,
  `idposts` int NOT NULL,
  `iduser` int NOT NULL,
  `textComment` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idcomments`),
  KEY `idpost-comments_idx` (`idposts`),
  KEY `iduser-comments_idx` (`iduser`),
  CONSTRAINT `idpost-comments` FOREIGN KEY (`idposts`) REFERENCES `posts` (`postId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `iduser-comments` FOREIGN KEY (`iduser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id_likes` int NOT NULL AUTO_INCREMENT,
  `user_id_like` int NOT NULL,
  `post_id_like` int NOT NULL,
  `count_post_like` int DEFAULT NULL,
  PRIMARY KEY (`id_likes`),
  KEY `user_id_likes_idx` (`user_id_like`),
  KEY `post_ID_likes_idx` (`post_id_like`,`count_post_like`),
  CONSTRAINT `user_id_likes` FOREIGN KEY (`user_id_like`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=306 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (299,102,204,NULL),(300,101,204,NULL),(301,101,205,NULL),(303,102,206,NULL),(304,102,211,NULL),(305,102,207,NULL);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `postId` int NOT NULL AUTO_INCREMENT,
  `imageUrl` varchar(255) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `iduser` int NOT NULL,
  `createdAt` date DEFAULT NULL,
  `timestamps` time DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `likes_post` int DEFAULT NULL,
  PRIMARY KEY (`postId`),
  KEY `id_user_idx` (`iduser`),
  CONSTRAINT `id_user_post` FOREIGN KEY (`iduser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=213 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (205,'','Hi',102,'2022-06-14',NULL,'2022-06-14 08:05:52',NULL),(206,'','Hiiii',102,'2022-06-14',NULL,'2022-06-14 07:54:13',NULL),(207,'','Hello!!',101,'2022-06-14',NULL,'2022-06-14 08:04:28',NULL),(208,'','New post',101,'2022-06-14',NULL,'2022-06-14 08:04:18',NULL),(209,'','hi',102,'2022-06-14',NULL,'2022-06-14 07:59:44',NULL),(210,'','hi',102,'2022-06-14',NULL,'2022-06-14 07:59:53',NULL),(211,'','new',102,'2022-06-14',NULL,'2022-06-14 08:04:06',NULL),(212,'','New post',102,'2022-06-14',NULL,'2022-06-14 08:04:13',NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email` varchar(255) CHARACTER SET armscii8 COLLATE armscii8_general_ci NOT NULL,
  `password` varchar(255) NOT NULL,
  `photoUrl` varchar(255) DEFAULT NULL,
  `description` text,
  `isAdmin` tinyint NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (96,'Dillan','Simons','dillan.s@hotmail.com','$2b$10$AW3zzNSkHc6K7e7eGJhazeChd5loCdXfaoCAc3n15b6ZdK77cgrNO','http://localhost:3000/images/26aa5ce0-bea2-491c-8562-e60a1816f2ad.jpg1654695315627.jpg','I am Dillan',0),(99,'Monica','Geller','newuser@gmail.com','$2b$10$wVkvzLw26HaQTt.j4XfaeOE631BxCPhyAdq7s56nVBHgfAOZP4mdS','http://localhost:3000/images/1590392355_Les-17-looks-de-Monica-Geller-que-nous-avons-vus.jpeg1654947907696.jpg','Friends',0),(101,'Orianne','Noemi','o.noemi@yahoo.com','$2b$10$6e8bBBZJJM.NjiCPKN.vt.NYv.3K7BTh/.JPczN2/RcXc0V1CFrYO','http://localhost:3000/images/b4565967-2bac-4f57-a2eb-3a56d9a150c7.jpg1655061324757.jpg','Hey I am Orianne!!',0),(102,'Snezhana','Pashovska','admin@groupomania.com','$2b$10$Qj9KqKzFzPOjF/V6ZVW1ueXLulxZxzIydjYv9JPVSLUCqm5Z9SydG','http://localhost:3000/images/5e47d289f1335_thumb900.jpg1655139887039.jpg','I am the Admin!',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-14 12:48:58
