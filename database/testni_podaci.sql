-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: kartebl_baza
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (2,'administrator1','1111111111111','$2a$12$I./JSiXeDV4ki0h/gytRNOOgSsslZk0xpLjdMMccap9ZZc6IFeh0y','aime1','aprezime1','admin1@mail.com');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `authorities`
--

LOCK TABLES `authorities` WRITE;
/*!40000 ALTER TABLE `authorities` DISABLE KEYS */;
/*!40000 ALTER TABLE `authorities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dogadjaj`
--

LOCK TABLES `dogadjaj` WRITE;
/*!40000 ALTER TABLE `dogadjaj` DISABLE KEYS */;
INSERT INTO `dogadjaj` VALUES (8,'Bijelo dugme','2025-02-25','20:30:00','Kastel','Koncert za pamcenje',_binary 'âPNG\r\n\Z\n\0\0\0\rIHDR\0\0\0\0\0\0\0\0\0ƒâ\0\0\0sRGB\0Æ\Œ\È\0\0\0gAMA\0\0±è¸a\0\0\0	pHYs\0\0\0\0\0öú\0\0\0tIME\Ê,˝.π\0\0ÛIDATxú]ëøJAÖ]ì~\ :*HãÅCGé\00\‡äD\—U—¶√µ\n\ÎÒ\…t\Óû9fo•\Á\‹\"Û(÷èww\√<\ƒfbg°h\√√°àßS\ÈBY∂\Ì´˘:OH+}7íhå˛\Ì\ﬁ#¿W˚˚ˇˇ\Œ[\«\0\0\0\0IENDÆB`Ç',2,6);
/*!40000 ALTER TABLE `dogadjaj` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `karta`
--

LOCK TABLES `karta` WRITE;
/*!40000 ALTER TABLE `karta` DISABLE KEYS */;
INSERT INTO `karta` VALUES (5,20.00,_binary 'âPNG\r\n\Z\n\0\0\0\rIHDR\0\0\0\0\0\0\0\0\0ƒâ\0\0\0sRGB\0Æ\Œ\È\0\0\0gAMA\0\0±è¸a\0\0\0	pHYs\0\0\0\0\0öú\0\0\0tIME\Ê,˝.π\0\0ÛIDATxú]ëøJAÖ]ì~\ :*HãÅCGé\00\‡äD\—U—¶√µ\n\ÎÒ\…t\Óû9fo•\Á\‹\"Û(÷èww\√<\ƒfbg°h\√√°àßS\ÈBY∂\Ì´˘:OH+}7íhå˛\Ì\ﬁ#¿W˚˚ˇˇ\Œ[\«\0\0\0\0IENDÆB`Ç','VIP',8,6);
/*!40000 ALTER TABLE `karta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `korisnik`
--

LOCK TABLES `korisnik` WRITE;
/*!40000 ALTER TABLE `korisnik` DISABLE KEYS */;
INSERT INTO `korisnik` VALUES (2,'korisnik1','$2a$12$I./JSiXeDV4ki0h/gytRNOOgSsslZk0xpLjdMMccap9ZZc6IFeh0y','korisnik1@mail.com','ime1','prezime1');
/*!40000 ALTER TABLE `korisnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `organizator`
--

LOCK TABLES `organizator` WRITE;
/*!40000 ALTER TABLE `organizator` DISABLE KEYS */;
INSERT INTO `organizator` VALUES (6,'organizator1','1111111111111','$2a$12$I./JSiXeDV4ki0h/gytRNOOgSsslZk0xpLjdMMccap9ZZc6IFeh0y','organizator1@mail.com',2);
/*!40000 ALTER TABLE `organizator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `skenirana_karta`
--

LOCK TABLES `skenirana_karta` WRITE;
/*!40000 ALTER TABLE `skenirana_karta` DISABLE KEYS */;
/*!40000 ALTER TABLE `skenirana_karta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `transakcija`
--

LOCK TABLES `transakcija` WRITE;
/*!40000 ALTER TABLE `transakcija` DISABLE KEYS */;
/*!40000 ALTER TABLE `transakcija` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-30 20:19:15
