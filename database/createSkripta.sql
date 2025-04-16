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
  `administrator_id` int NOT NULL,
  `organizator_id` int NOT NULL,
  `odobren` varchar(30) DEFAULT NULL,
  `tip_slike` varchar(10) NOT NULL,
  `slika` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_dogadjaj_administrator1_idx` (`administrator_id`),
  KEY `fk_dogadjaj_organizator1_idx` (`organizator_id`),
  CONSTRAINT `fk_dogadjaj_administrator1` FOREIGN KEY (`administrator_id`) REFERENCES `administrator` (`id`),
  CONSTRAINT `fk_dogadjaj_organizator1` FOREIGN KEY (`organizator_id`) REFERENCES `organizator` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dogadjaj`
--

LOCK TABLES `dogadjaj` WRITE;
/*!40000 ALTER TABLE `dogadjaj` DISABLE KEYS */;
INSERT INTO `dogadjaj` VALUES (8,'Koncert godine testiranje .jpg ekstenzije','2025-04-01','20:00:00','Arena Beograd','Najveći koncert ove godine sa specijalnim gostima.',2,6,'aktivan','image/jpeg','KarteBL_BackendAplikacija\\src\\main\\resources\\Slike\\8.jpg'),(11,'Koncert godine testiranje .jpg ekstenzije','2025-04-01','20:00:00','Arena Beograd','Najveći koncert ove godine sa specijalnim gostima.',2,6,'0','image/jpeg','KarteBL_BackendAplikacija\\src\\main\\resources\\Slike\\11.jpg'),(13,'Koncert godine','2025-04-01','20:00:00','Arena Beograd','Najveći koncert ove godine sa specijalnim gostima.',2,6,'0','image/png','KarteBL_BackendAplikacija\\src\\main\\resources\\Slike\\13.png'),(14,'Koncert godine testiranje .jpg ekstenzije','2025-04-01','20:00:00','Arena Beograd','Najveći koncert ove godine sa specijalnim gostima.',2,6,'0','image/jpeg','KarteBL_BackendAplikacija\\src\\main\\resources\\Slike\\14.jpg');
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
  `vrsta_karte` varchar(100) DEFAULT NULL,
  `dogadjaj_id` int NOT NULL,
  `organizator_id` int NOT NULL,
  `max_broj_karata` int DEFAULT NULL,
  `broj_prodatih_karata` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_karta_dogadjaj1_idx` (`dogadjaj_id`),
  KEY `fk_karta_organizator1_idx` (`organizator_id`),
  CONSTRAINT `fk_karta_dogadjaj1` FOREIGN KEY (`dogadjaj_id`) REFERENCES `dogadjaj` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_karta_organizator1` FOREIGN KEY (`organizator_id`) REFERENCES `organizator` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `karta`
--

LOCK TABLES `karta` WRITE;
/*!40000 ALTER TABLE `karta` DISABLE KEYS */;
INSERT INTO `karta` VALUES (5,20.00,'VIP',8,6,100,0),(6,25.50,'obicna',8,6,100,0),(7,25.50,'obicna',11,6,100,0),(8,25.50,'VIP',11,6,100,0),(9,60.00,'VIP',14,6,350,3),(10,60.00,'obicna',14,6,200,0);
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
INSERT INTO `korisnik` VALUES (2,'korisnik1','$2a$12$I./JSiXeDV4ki0h/gytRNOOgSsslZk0xpLjdMMccap9ZZc6IFeh0y','damjan.milekic@student.etf.unibl.org','ime1','prezime1');
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
-- Table structure for table `poruka`
--

DROP TABLE IF EXISTS `poruka`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poruka` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email_posiljaoca` varchar(50) NOT NULL,
  `email_primaoca` varchar(50) NOT NULL,
  `sadrzaj_poruke` text NOT NULL,
  `procitana` tinyint(1) DEFAULT '0',
  `datum_vrijeme` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poruka`
--

LOCK TABLES `poruka` WRITE;
/*!40000 ALTER TABLE `poruka` DISABLE KEYS */;
INSERT INTO `poruka` VALUES (1,'admin1@mail.com','organizator1@mail.com','Ovo je testna poruka.',0,NULL),(2,'admin1@mail.com','organizator1@mail.com','Ovo je testna poruka.',0,'2025-03-28 16:38:37'),(3,'admin1@mail.com','organizator1@mail.com','Ovo je testna poruka.',0,'2025-03-28 16:38:48'),(4,'admin1@mail.com','organizator1@mail.com','Ovo je testna poruka.',1,'2025-03-28 16:39:51'),(5,'admin1@mail.com','organizator1@mail.com','Ovo je testna poruka.',0,'2025-03-28 16:42:55'),(6,'admin1@mail.com','organizator1@mail.com','Ovo je testna poruka.',0,'2025-03-28 16:46:47'),(7,'organizator1@mail.com','admin1@mail.com','jednostavna test poruka?',0,'2025-04-01 11:41:50'),(8,'organizator1@mail.com','admin1@mail.com','jednostavna test poruka?',0,'2025-04-01 11:41:59');
/*!40000 ALTER TABLE `poruka` ENABLE KEYS */;
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
  `qr` varchar(100) DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_transakcija_korisnik1_idx` (`korisnik_id`),
  KEY `fk_transakcija_karta1_idx` (`karta_id`),
  CONSTRAINT `fk_transakcija_karta1` FOREIGN KEY (`karta_id`) REFERENCES `karta` (`id`),
  CONSTRAINT `fk_transakcija_korisnik1` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transakcija`
--

LOCK TABLES `transakcija` WRITE;
/*!40000 ALTER TABLE `transakcija` DISABLE KEYS */;
INSERT INTO `transakcija` VALUES (5,2,5,'hello world',NULL),(7,2,5,'P6QM88OU32F6BBHJ752QWF1OYWDBCK7V2VOYH3WQNENX2O02Q9NJPS3792SWXPE6','ACTIVE'),(8,2,5,'3I0EVN1ROQBTMJ51TG5WY1OQV44V16WGCMKXYRDW7FJSJSPHFM1KL96RUS5EPGBE','ACTIVE'),(9,2,5,'JXVXRB6M5G1KS0H0UOJVU4JZ4LK8HOUM5GGX7YHQMGJN2YUA2NLJU353EIY2LROX','ACTIVE'),(10,2,5,'1XX0A3SB85JHI9K3NL1Y0MEDZIEKL8M303MZEEVEHJ5AC6SK16OIJUIGFFEE3E2X','ACTIVE'),(11,2,5,'X6UOXXA0XTNE34VWIKHRAVQTZU29I8KA29D1CACBB7H0B7GXEFF207EAWXMY2TK6','ACTIVE'),(12,2,5,'LGTIH27K4CIFBBBNJWZI7S6GM0LJJJPNLZR2S0NB3JHNUZUU3IM0TOOD2V7RSOCR','ACTIVE'),(13,2,5,'0JJXKJ45LU2DAN5OLUBP13VN9K3SV5X8J9IS2DPPX8D6UT4KVRZBMAV2RUXLIOFP','ACTIVE'),(14,2,5,'EX58Z46JWKM6TER0NI1BY1LCIFASQ6U0Y43EAM7ZF0NPC1I5XGBHWDZPXVYDX894','ACTIVE'),(15,2,5,'L5I5BC3Y6JQBGZV9SGU9TWI1W445S6KODFTTJ441F3D25K8LW24CRYA0DYVQIGQC','ACTIVE'),(16,2,5,'3E4W2A3RTFD7XNZO3TT6AP1R8DSYY1LQDN2XFHHUYDZMB594SWK5USRDR62LEDW9','ACTIVE'),(17,2,5,'SP9LZMYVU6S0FA1IU0O1C5JY7QZBYYBOKO4QT4E9JC6TKU9M1L3KCDPILDCUY7JU','ACTIVE'),(18,2,5,'JHP1X8VAMOH3G9X5Y5ACAGC89Z043Y4EM89XNZERLJ8K7JBNQR1L4QWFL8SOO9EY','ACTIVE'),(20,2,8,'JL7COOVLK1AGV9RGEQX7GF6P721ER32ZOBYXOLN4PDCC17ER3ERO48157CR97Q4O','ACTIVE'),(21,2,9,'Z7W31NJSR3MUJ7GJABRPN3SHSSZZCZWJDH4OEHBVXA1O7WB2LGBOBE5K4ELOE24M','ACTIVE'),(22,2,9,'5B396OY9D8VN7II815K33LYX0IM975QEUZAI1ELC1OUY7Y3NL2A6TTK2UB0O0XO5','ACTIVE'),(23,2,9,'THCWC5Z3YQQA1R55RAEJHE0N8PY7LMJD51YIJF800QJNHLKW0IJNSZ78ZQO98JFK','ACTIVE');
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
-- Dumping events for database 'kartebl_baza'
--

--
-- Dumping routines for database 'kartebl_baza'
--

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

-- Dump completed on 2025-04-14 11:20:58
