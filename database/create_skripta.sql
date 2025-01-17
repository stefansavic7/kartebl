CREATE DATABASE  IF NOT EXISTS `kartebl_baza` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `kartebl_baza`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: kartebl_baza
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator` (
  `id` int NOT NULL AUTO_INCREMENT,
  `korisnicko_ime` varchar(50) DEFAULT NULL,
  `jmbg` char(13) NOT NULL,
  `sifra` varchar(300) NOT NULL,
  `ime` varchar(50) NOT NULL,
  `prezime` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `JMBG_UNIQUE` (`jmbg`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_Administrator_Osoba` (`korisnicko_ime`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (2,'administrator1','1111111111111','$2a$12$I./JSiXeDV4ki0h/gytRNOOgSsslZk0xpLjdMMccap9ZZc6IFeh0y','aime1','aprezime1','admin1@mail.com');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dogadjaj`
--

DROP TABLE IF EXISTS `dogadjaj`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dogadjaj` (
  `id` int NOT NULL AUTO_INCREMENT,
  `naziv` varchar(45) NOT NULL,
  `datum` date NOT NULL,
  `vrijeme` time NOT NULL,
  `lokacija` varchar(45) NOT NULL,
  `opis` varchar(500) DEFAULT NULL,
  `slika` mediumblob,
  `administrator_id` int NOT NULL,
  `organizator_id` int NOT NULL,
  `odobren` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_dogadjaj_administrator1_idx` (`administrator_id`),
  KEY `fk_dogadjaj_organizator1_idx` (`organizator_id`),
  CONSTRAINT `fk_dogadjaj_administrator1` FOREIGN KEY (`administrator_id`) REFERENCES `administrator` (`id`),
  CONSTRAINT `fk_dogadjaj_organizator1` FOREIGN KEY (`organizator_id`) REFERENCES `organizator` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dogadjaj`
--

LOCK TABLES `dogadjaj` WRITE;
/*!40000 ALTER TABLE `dogadjaj` DISABLE KEYS */;
INSERT INTO `dogadjaj` VALUES (8,'Bijelo dugme','2025-02-25','20:30:00','Kastel','Koncert za pamcenje',_binary 'PNG\r\n\Z\n\0\0\0\rIHDR\0\0\0\0\0\0\0\0\0Ä\0\0\0sRGB\0®Îé\0\0\0gAMA\0\0±üa\0\0\0	pHYs\0\0\0\0\0\0\0\0tIMEæ,ý.¹\0\0óIDATx]¿JA]~Ê:*HCG\00àDÑUÑ¦Ãµ\nëñÉtî9fo¥çÜ\"ó(ÖwwÃ<Äfbg¡hÃÃ¡§SéBY¶í«ù:OH+}7hþíÞ#ÀWûûÿÿÎ[Ç\0\0\0\0IEND®B`',2,6,0);
/*!40000 ALTER TABLE `dogadjaj` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `karta`
--

DROP TABLE IF EXISTS `karta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `karta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cijena` decimal(10,2) NOT NULL,
  `qr` blob,
  `vrsta_karte` varchar(100) DEFAULT NULL,
  `dogadjaj_id` int NOT NULL,
  `organizator_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_karta_dogadjaj1_idx` (`dogadjaj_id`),
  KEY `fk_karta_organizator1_idx` (`organizator_id`),
  CONSTRAINT `fk_karta_dogadjaj1` FOREIGN KEY (`dogadjaj_id`) REFERENCES `dogadjaj` (`id`),
  CONSTRAINT `fk_karta_organizator1` FOREIGN KEY (`organizator_id`) REFERENCES `organizator` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `karta`
--

LOCK TABLES `karta` WRITE;
/*!40000 ALTER TABLE `karta` DISABLE KEYS */;
INSERT INTO `karta` VALUES (5,20.00,_binary 'PNG\r\n\Z\n\0\0\0\rIHDR\0\0\0\0\0\0\0\0\0Ä\0\0\0sRGB\0®Îé\0\0\0gAMA\0\0±üa\0\0\0	pHYs\0\0\0\0\0\0\0\0tIMEæ,ý.¹\0\0óIDATx]¿JA]~Ê:*HCG\00àDÑUÑ¦Ãµ\nëñÉtî9fo¥çÜ\"ó(ÖwwÃ<Äfbg¡hÃÃ¡§SéBY¶í«ù:OH+}7hþíÞ#ÀWûûÿÿÎ[Ç\0\0\0\0IEND®B`','VIP',8,6);
/*!40000 ALTER TABLE `karta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `korisnik`
--

DROP TABLE IF EXISTS `korisnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `korisnik` (
  `id` int NOT NULL AUTO_INCREMENT,
  `korisnicko_ime` varchar(50) DEFAULT NULL,
  `sifra` varchar(200) NOT NULL,
  `email` varchar(255) NOT NULL,
  `ime` varchar(50) DEFAULT NULL,
  `prezime` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Korisnik_Osoba1` (`korisnicko_ime`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnik`
--

LOCK TABLES `korisnik` WRITE;
/*!40000 ALTER TABLE `korisnik` DISABLE KEYS */;
INSERT INTO `korisnik` VALUES (2,'korisnik1','$2a$12$I./JSiXeDV4ki0h/gytRNOOgSsslZk0xpLjdMMccap9ZZc6IFeh0y','korisnik1@mail.com','ime1','prezime1');
/*!40000 ALTER TABLE `korisnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organizator`
--

DROP TABLE IF EXISTS `organizator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organizator` (
  `id` int NOT NULL AUTO_INCREMENT,
  `korisnicko_ime` varchar(50) DEFAULT NULL,
  `jmbg` char(13) NOT NULL,
  `sifra` varchar(200) NOT NULL,
  `email` varchar(255) NOT NULL,
  `administrator_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `JMBG_UNIQUE` (`jmbg`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_Organizator_Osoba1` (`korisnicko_ime`),
  KEY `fk_organizator_administrator1_idx` (`administrator_id`),
  CONSTRAINT `fk_organizator_administrator1` FOREIGN KEY (`administrator_id`) REFERENCES `administrator` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizator`
--

LOCK TABLES `organizator` WRITE;
/*!40000 ALTER TABLE `organizator` DISABLE KEYS */;
INSERT INTO `organizator` VALUES (6,'organizator1','1111111111111','$2a$12$I./JSiXeDV4ki0h/gytRNOOgSsslZk0xpLjdMMccap9ZZc6IFeh0y','organizator1@mail.com',2);
/*!40000 ALTER TABLE `organizator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skenirana_karta`
--

DROP TABLE IF EXISTS `skenirana_karta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skenirana_karta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vrijeme_skeniranja` time NOT NULL,
  `transakcija_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_skenirana_karta_transakcija1_idx` (`transakcija_id`),
  CONSTRAINT `fk_skenirana_karta_transakcija1` FOREIGN KEY (`transakcija_id`) REFERENCES `transakcija` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skenirana_karta`
--

LOCK TABLES `skenirana_karta` WRITE;
/*!40000 ALTER TABLE `skenirana_karta` DISABLE KEYS */;
/*!40000 ALTER TABLE `skenirana_karta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transakcija`
--

DROP TABLE IF EXISTS `transakcija`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transakcija` (
  `id` int NOT NULL AUTO_INCREMENT,
  `korisnik_id` int NOT NULL,
  `karta_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_transakcija_korisnik1_idx` (`korisnik_id`),
  KEY `fk_transakcija_karta1_idx` (`karta_id`),
  CONSTRAINT `fk_transakcija_karta1` FOREIGN KEY (`karta_id`) REFERENCES `karta` (`id`),
  CONSTRAINT `fk_transakcija_korisnik1` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transakcija`
--

LOCK TABLES `transakcija` WRITE;
/*!40000 ALTER TABLE `transakcija` DISABLE KEYS */;
/*!40000 ALTER TABLE `transakcija` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `users`
--

DROP TABLE IF EXISTS `users`;
/*!50001 DROP VIEW IF EXISTS `users`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `users` AS SELECT 
 1 AS `id`,
 1 AS `username`,
 1 AS `email`,
 1 AS `password`,
 1 AS `tip`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `users`
--

/*!50001 DROP VIEW IF EXISTS `users`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `users` AS select `korisnik`.`id` AS `id`,`korisnik`.`korisnicko_ime` AS `username`,`korisnik`.`email` AS `email`,`korisnik`.`sifra` AS `password`,'korisnik' AS `tip` from `korisnik` union all select `administrator`.`id` AS `id`,`administrator`.`korisnicko_ime` AS `username`,`administrator`.`email` AS `email`,`administrator`.`sifra` AS `password`,'administrator' AS `tip` from `administrator` union all select `organizator`.`id` AS `id`,`organizator`.`korisnicko_ime` AS `username`,`organizator`.`email` AS `email`,`organizator`.`sifra` AS `password`,'organizator' AS `tip` from `organizator` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-17 13:47:12
