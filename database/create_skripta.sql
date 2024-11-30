-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema kartebl_baza
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema kartebl_baza
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `kartebl_baza` DEFAULT CHARACTER SET utf8mb3 ;
USE `kartebl_baza` ;

-- -----------------------------------------------------
-- Table `kartebl_baza`.`administrator`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kartebl_baza`.`administrator` ;

CREATE TABLE IF NOT EXISTS `kartebl_baza`.`administrator` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `korisnicko_ime` VARCHAR(50) NOT NULL,
  `jmbg` CHAR(13) NOT NULL,
  `sifra` VARCHAR(300) NOT NULL,
  `ime` VARCHAR(50) NOT NULL,
  `prezime` VARCHAR(50) NOT NULL,
  `email` VARCHAR(60) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `JMBG_UNIQUE` (`jmbg` ASC) VISIBLE,
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  INDEX `fk_Administrator_Osoba` (`korisnicko_ime` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `kartebl_baza`.`korisnik`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kartebl_baza`.`korisnik` ;

CREATE TABLE IF NOT EXISTS `kartebl_baza`.`korisnik` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `korisnicko_ime` VARCHAR(50) NOT NULL,
  `sifra` VARCHAR(200) NULL DEFAULT NULL,
  `email` VARCHAR(200) NULL DEFAULT NULL,
  `ime` VARCHAR(50) NULL DEFAULT NULL,
  `prezime` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Korisnik_Osoba1` (`korisnicko_ime` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `kartebl_baza`.`organizator`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kartebl_baza`.`organizator` ;

CREATE TABLE IF NOT EXISTS `kartebl_baza`.`organizator` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `korisnicko_ime` VARCHAR(50) NOT NULL,
  `jmbg` CHAR(13) NOT NULL,
  `sifra` VARCHAR(200) NULL DEFAULT NULL,
  `email` VARCHAR(70) NULL DEFAULT NULL,
  `administrator_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `JMBG_UNIQUE` (`jmbg` ASC) VISIBLE,
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  INDEX `fk_Organizator_Osoba1` (`korisnicko_ime` ASC) VISIBLE,
  INDEX `fk_organizator_administrator1_idx` (`administrator_id` ASC) VISIBLE,
  CONSTRAINT `fk_organizator_administrator1`
    FOREIGN KEY (`administrator_id`)
    REFERENCES `kartebl_baza`.`administrator` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `kartebl_baza`.`authorities`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kartebl_baza`.`authorities` ;

CREATE TABLE IF NOT EXISTS `kartebl_baza`.`authorities` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uloga` VARCHAR(30) NULL DEFAULT NULL,
  `administrator_id` INT NULL,
  `korisnik_id` INT NULL,
  `organizator_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_authorities_administrator_idx` (`administrator_id` ASC) VISIBLE,
  INDEX `fk_authorities_korisnik1_idx` (`korisnik_id` ASC) VISIBLE,
  INDEX `fk_authorities_organizator1_idx` (`organizator_id` ASC) VISIBLE,
  CONSTRAINT `fk_authorities_administrator`
    FOREIGN KEY (`administrator_id`)
    REFERENCES `kartebl_baza`.`administrator` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_authorities_korisnik1`
    FOREIGN KEY (`korisnik_id`)
    REFERENCES `kartebl_baza`.`korisnik` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_authorities_organizator1`
    FOREIGN KEY (`organizator_id`)
    REFERENCES `kartebl_baza`.`organizator` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `kartebl_baza`.`dogadjaj`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kartebl_baza`.`dogadjaj` ;

CREATE TABLE IF NOT EXISTS `kartebl_baza`.`dogadjaj` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `naziv` VARCHAR(45) NOT NULL,
  `datum` DATE NOT NULL,
  `vrijeme` TIME NOT NULL,
  `lokacija` VARCHAR(45) NOT NULL,
  `opis` VARCHAR(500) NULL DEFAULT NULL,
  `slika` MEDIUMBLOB NULL DEFAULT NULL,
  `administrator_id` INT NOT NULL,
  `organizator_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_dogadjaj_administrator1_idx` (`administrator_id` ASC) VISIBLE,
  INDEX `fk_dogadjaj_organizator1_idx` (`organizator_id` ASC) VISIBLE,
  CONSTRAINT `fk_dogadjaj_administrator1`
    FOREIGN KEY (`administrator_id`)
    REFERENCES `kartebl_baza`.`administrator` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_dogadjaj_organizator1`
    FOREIGN KEY (`organizator_id`)
    REFERENCES `kartebl_baza`.`organizator` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `kartebl_baza`.`karta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kartebl_baza`.`karta` ;

CREATE TABLE IF NOT EXISTS `kartebl_baza`.`karta` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cijena` DECIMAL(10,2) NOT NULL,
  `qr` BLOB NULL DEFAULT NULL,
  `vrsta_karte` VARCHAR(100) NULL DEFAULT NULL,
  `dogadjaj_id` INT NOT NULL,
  `organizator_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_karta_dogadjaj1_idx` (`dogadjaj_id` ASC) VISIBLE,
  INDEX `fk_karta_organizator1_idx` (`organizator_id` ASC) VISIBLE,
  CONSTRAINT `fk_karta_dogadjaj1`
    FOREIGN KEY (`dogadjaj_id`)
    REFERENCES `kartebl_baza`.`dogadjaj` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_karta_organizator1`
    FOREIGN KEY (`organizator_id`)
    REFERENCES `kartebl_baza`.`organizator` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `kartebl_baza`.`transakcija`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kartebl_baza`.`transakcija` ;

CREATE TABLE IF NOT EXISTS `kartebl_baza`.`transakcija` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `korisnik_id` INT NOT NULL,
  `karta_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_transakcija_korisnik1_idx` (`korisnik_id` ASC) VISIBLE,
  INDEX `fk_transakcija_karta1_idx` (`karta_id` ASC) VISIBLE,
  CONSTRAINT `fk_transakcija_korisnik1`
    FOREIGN KEY (`korisnik_id`)
    REFERENCES `kartebl_baza`.`korisnik` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_transakcija_karta1`
    FOREIGN KEY (`karta_id`)
    REFERENCES `kartebl_baza`.`karta` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `kartebl_baza`.`skenirana_karta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kartebl_baza`.`skenirana_karta` ;

CREATE TABLE IF NOT EXISTS `kartebl_baza`.`skenirana_karta` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `vrijeme_skeniranja` TIME NOT NULL,
  `transakcija_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_skenirana_karta_transakcija1_idx` (`transakcija_id` ASC) VISIBLE,
  CONSTRAINT `fk_skenirana_karta_transakcija1`
    FOREIGN KEY (`transakcija_id`)
    REFERENCES `kartebl_baza`.`transakcija` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

USE `kartebl_baza` ;

-- -----------------------------------------------------
-- Placeholder table for view `kartebl_baza`.`svi_korisnici_sistema`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kartebl_baza`.`svi_korisnici_sistema` (`id` INT, `korisnicko_ime` INT, `email` INT, `tip` INT);

-- -----------------------------------------------------
-- View `kartebl_baza`.`svi_korisnici_sistema`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kartebl_baza`.`svi_korisnici_sistema`;
DROP VIEW IF EXISTS `kartebl_baza`.`svi_korisnici_sistema` ;
USE `kartebl_baza`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `kartebl_baza`.`svi_korisnici_sistema` AS select `kartebl_baza`.`korisnik`.`id` AS `id`,`kartebl_baza`.`korisnik`.`korisnicko_ime` AS `korisnicko_ime`,`kartebl_baza`.`korisnik`.`email` AS `email`,'korisnik' AS `tip` from `kartebl_baza`.`korisnik` union all select `kartebl_baza`.`administrator`.`id` AS `id`,`kartebl_baza`.`administrator`.`korisnicko_ime` AS `korisnicko_ime`,`kartebl_baza`.`administrator`.`email` AS `email`,'administrator' AS `tip` from `kartebl_baza`.`administrator` union all select `kartebl_baza`.`organizator`.`id` AS `id`,`kartebl_baza`.`organizator`.`korisnicko_ime` AS `korisnicko_ime`,`kartebl_baza`.`organizator`.`email` AS `email`,'organizator' AS `tip` from `kartebl_baza`.`organizator`;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
