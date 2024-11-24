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
  `korisnicko_ime` varchar(50) NOT NULL,
  `jmbg` char(13) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `JMBG_UNIQUE` (`jmbg`),
  KEY `fk_Administrator_Osoba` (`korisnicko_ime`),
  CONSTRAINT `fk_Administrator_Osoba` FOREIGN KEY (`korisnicko_ime`) REFERENCES `osoba` (`korisnicko_ime`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (1,'admin_test','1234567891234');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authorities`
--

DROP TABLE IF EXISTS `authorities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authorities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_osoba` int DEFAULT NULL,
  `uloga` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_osoba` (`id_osoba`),
  CONSTRAINT `authorities_ibfk_1` FOREIGN KEY (`id_osoba`) REFERENCES `osoba` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authorities`
--

LOCK TABLES `authorities` WRITE;
/*!40000 ALTER TABLE `authorities` DISABLE KEYS */;
INSERT INTO `authorities` VALUES (1,1,'ROLE_ADMIN'),(2,2,'ROLE_ORGANIZATOR');
/*!40000 ALTER TABLE `authorities` ENABLE KEYS */;
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
  `korisnicko_ime_organizator` varchar(50) NOT NULL,
  `korisnicko_ime_administrator` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Dogadjaj_Organizator1_idx` (`korisnicko_ime_organizator`),
  KEY `fk_Dogadjaj_Administrator1_idx` (`korisnicko_ime_administrator`),
  CONSTRAINT `fk_Dogadjaj_Administrator1` FOREIGN KEY (`korisnicko_ime_administrator`) REFERENCES `administrator` (`korisnicko_ime`),
  CONSTRAINT `fk_Dogadjaj_Organizator1` FOREIGN KEY (`korisnicko_ime_organizator`) REFERENCES `organizator` (`korisnicko_ime`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dogadjaj`
--

LOCK TABLES `dogadjaj` WRITE;
/*!40000 ALTER TABLE `dogadjaj` DISABLE KEYS */;
INSERT INTO `dogadjaj` VALUES (1,'dogadjaj','2024-11-26','15:00:00','banjaluka','test opis',_binary '‰PNG\r\n\Z\n','organizator_test','admin_test'),(2,'dogadjaj 2','2024-12-20','12:00:00','banjaluka','test opisbroj 2',_binary '‰PNG\r\n\Z\n','organizator_test','admin_test');
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
  `id_dogadjaj` int NOT NULL,
  `vrsta_karte` varchar(100) DEFAULT NULL,
  `id_organizator` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Karta_Dogadjaj1_idx` (`id_dogadjaj`),
  KEY `fk_karta_organizator` (`id_organizator`),
  CONSTRAINT `fk_Karta_Dogadjaj1` FOREIGN KEY (`id_dogadjaj`) REFERENCES `dogadjaj` (`id`),
  CONSTRAINT `fk_karta_organizator` FOREIGN KEY (`id_organizator`) REFERENCES `organizator` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `karta`
--

LOCK TABLES `karta` WRITE;
/*!40000 ALTER TABLE `karta` DISABLE KEYS */;
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
  `korisnicko_ime` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Korisnik_Osoba1` (`korisnicko_ime`),
  CONSTRAINT `fk_Korisnik_Osoba1` FOREIGN KEY (`korisnicko_ime`) REFERENCES `osoba` (`korisnicko_ime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnik`
--

LOCK TABLES `korisnik` WRITE;
/*!40000 ALTER TABLE `korisnik` DISABLE KEYS */;
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
  `korisnicko_ime` varchar(50) NOT NULL,
  `jmbg` char(13) NOT NULL,
  `korisnicko_ime_administrator` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `JMBG_UNIQUE` (`jmbg`),
  KEY `fk_Organizator_Administrator1_idx` (`korisnicko_ime_administrator`),
  KEY `fk_Organizator_Osoba1` (`korisnicko_ime`),
  CONSTRAINT `fk_Organizator_Administrator1` FOREIGN KEY (`korisnicko_ime_administrator`) REFERENCES `administrator` (`korisnicko_ime`),
  CONSTRAINT `fk_Organizator_Osoba1` FOREIGN KEY (`korisnicko_ime`) REFERENCES `osoba` (`korisnicko_ime`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizator`
--

LOCK TABLES `organizator` WRITE;
/*!40000 ALTER TABLE `organizator` DISABLE KEYS */;
INSERT INTO `organizator` VALUES (2,'organizator_test','123456789124','admin_test');
/*!40000 ALTER TABLE `organizator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `osoba`
--

DROP TABLE IF EXISTS `osoba`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `osoba` (
  `id` int NOT NULL AUTO_INCREMENT,
  `korisnicko_ime` varchar(50) NOT NULL,
  `sifra` varchar(500) NOT NULL,
  `ime` varchar(45) NOT NULL,
  `prezime` varchar(45) NOT NULL,
  `mail` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `KorisnickoIme_UNIQUE` (`korisnicko_ime`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `osoba`
--

LOCK TABLES `osoba` WRITE;
/*!40000 ALTER TABLE `osoba` DISABLE KEYS */;
INSERT INTO `osoba` VALUES (1,'admin_test','$2a$12$8i3LIJqVsXnvVKuq7Zw/NuyQwFC1uTGGiaelfQ9phU.DPHLsOLH2W','admin','admin','admin@gmail.com'),(2,'organizator_test','$2a$12$iDSBcfvKsvJ10bVk95B3CeuocVbLj9feDAx6dwgypLRWlNNox6oY.','organizator','organizator','organizator@gmail.com');
/*!40000 ALTER TABLE `osoba` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skeniranakarta`
--

DROP TABLE IF EXISTS `skeniranakarta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skeniranakarta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vrijeme_skeniranja` time NOT NULL,
  `id_transakcija` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_SkeniranaKarta_Transakcija1_idx` (`id_transakcija`),
  CONSTRAINT `fk_SkeniranaKarta_Transakcija1` FOREIGN KEY (`id_transakcija`) REFERENCES `transakcija` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skeniranakarta`
--

LOCK TABLES `skeniranakarta` WRITE;
/*!40000 ALTER TABLE `skeniranakarta` DISABLE KEYS */;
/*!40000 ALTER TABLE `skeniranakarta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transakcija`
--

DROP TABLE IF EXISTS `transakcija`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transakcija` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_karta` int NOT NULL,
  `korisnicko_ime_korisnik` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Transakcija_Karta1_idx` (`id_karta`),
  KEY `fk_Transakcija_Korisnik1_idx` (`korisnicko_ime_korisnik`),
  CONSTRAINT `fk_Transakcija_Karta1` FOREIGN KEY (`id_karta`) REFERENCES `karta` (`id`),
  CONSTRAINT `fk_Transakcija_Korisnik1` FOREIGN KEY (`korisnicko_ime_korisnik`) REFERENCES `korisnik` (`korisnicko_ime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

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

-- Dump completed on 2024-11-24 20:35:38
