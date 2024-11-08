-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema kartebl_baza
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema kartebl_baza
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `kartebl_baza` DEFAULT CHARACTER SET utf8 ;
USE `kartebl_baza` ;

-- -----------------------------------------------------
-- Table `kartebl_baza`.`Osoba`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kartebl_baza`.`Osoba` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `korisnicko_ime` VARCHAR(50) NOT NULL,
  `sifra` VARCHAR(45) NOT NULL,
  `ime` VARCHAR(45) NOT NULL,
  `prezime` VARCHAR(45) NOT NULL,
  `mail` VARCHAR(100) NOT NULL,
  UNIQUE INDEX `KorisnickoIme_UNIQUE` (`korisnicko_ime` ASC) VISIBLE,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kartebl_baza`.`Korisnik`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kartebl_baza`.`Korisnik` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `korisnicko_ime` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_Korisnik_Osoba1`
    FOREIGN KEY (`korisnicko_ime`)
    REFERENCES `kartebl_baza`.`Osoba` (`korisnicko_ime`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kartebl_baza`.`Administrator`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kartebl_baza`.`Administrator` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `korisnicko_ime` VARCHAR(50) NOT NULL,
  `jmbg` CHAR(13) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `JMBG_UNIQUE` (`jmbg` ASC) VISIBLE,
  CONSTRAINT `fk_Administrator_Osoba`
    FOREIGN KEY (`korisnicko_ime`)
    REFERENCES `kartebl_baza`.`Osoba` (`korisnicko_ime`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kartebl_baza`.`Organizator`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kartebl_baza`.`Organizator` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `korisnicko_ime` VARCHAR(50) NOT NULL,
  `jmbg` CHAR(13) NOT NULL,
  `korisnicko_ime_administrator` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `JMBG_UNIQUE` (`jmbg` ASC) VISIBLE,
  INDEX `fk_Organizator_Administrator1_idx` (`korisnicko_ime_administrator` ASC) VISIBLE,
  CONSTRAINT `fk_Organizator_Osoba1`
    FOREIGN KEY (`korisnicko_ime`)
    REFERENCES `kartebl_baza`.`Osoba` (`korisnicko_ime`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Organizator_Administrator1`
    FOREIGN KEY (`korisnicko_ime_administrator`)
    REFERENCES `kartebl_baza`.`Administrator` (`korisnicko_ime`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kartebl_baza`.`Dogadjaj`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kartebl_baza`.`Dogadjaj` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `naziv` VARCHAR(45) NOT NULL,
  `datum` DATE NOT NULL,
  `vrijeme` TIME NOT NULL,
  `lokacija` VARCHAR(45) NOT NULL,
  `opis` VARCHAR(500) NULL,
  `slika` MEDIUMBLOB NULL,
  `korisnicko_ime_organizator` VARCHAR(50) NOT NULL,
  `korisnicko_ime_administrator` VARCHAR(50) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Dogadjaj_Organizator1_idx` (`korisnicko_ime_organizator` ASC) VISIBLE,
  INDEX `fk_Dogadjaj_Administrator1_idx` (`korisnicko_ime_administrator` ASC) VISIBLE,
  CONSTRAINT `fk_Dogadjaj_Organizator1`
    FOREIGN KEY (`korisnicko_ime_organizator`)
    REFERENCES `kartebl_baza`.`Organizator` (`korisnicko_ime`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Dogadjaj_Administrator1`
    FOREIGN KEY (`korisnicko_ime_administrator`)
    REFERENCES `kartebl_baza`.`Administrator` (`korisnicko_ime`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kartebl_baza`.`Karta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kartebl_baza`.`Karta` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cijena` DECIMAL(10,2) NOT NULL,
  `vrsta_karte` VARCHAR(50) NULL,
  `qr` MEDIUMBLOB NOT NULL,
  `id_dogadjaj` INT NOT NULL,
  `korisnicko_ime_organizator` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Karta_Dogadjaj1_idx` (`id_dogadjaj` ASC) VISIBLE,
  INDEX `fk_Karta_Organizator1_idx` (`korisnicko_ime_organizator` ASC) VISIBLE,
  CONSTRAINT `fk_Karta_Dogadjaj1`
    FOREIGN KEY (`id_dogadjaj`)
    REFERENCES `kartebl_baza`.`Dogadjaj` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Karta_Organizator1`
    FOREIGN KEY (`korisnicko_ime_organizator`)
    REFERENCES `kartebl_baza`.`Organizator` (`korisnicko_ime`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kartebl_baza`.`Transakcija`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kartebl_baza`.`Transakcija` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_karta` INT NOT NULL,
  `korisnicko_ime_korisnik` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Transakcija_Karta1_idx` (`id_karta` ASC) VISIBLE,
  INDEX `fk_Transakcija_Korisnik1_idx` (`korisnicko_ime_korisnik` ASC) VISIBLE,
  CONSTRAINT `fk_Transakcija_Karta1`
    FOREIGN KEY (`id_karta`)
    REFERENCES `kartebl_baza`.`Karta` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Transakcija_Korisnik1`
    FOREIGN KEY (`korisnicko_ime_korisnik`)
    REFERENCES `kartebl_baza`.`Korisnik` (`korisnicko_ime`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kartebl_baza`.`SkeniranaKarta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kartebl_baza`.`SkeniranaKarta` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `vrijeme_skeniranja` TIME NOT NULL,
  `id_transakcija` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_SkeniranaKarta_Transakcija1_idx` (`id_transakcija` ASC) VISIBLE,
  CONSTRAINT `fk_SkeniranaKarta_Transakcija1`
    FOREIGN KEY (`id_transakcija`)
    REFERENCES `kartebl_baza`.`Transakcija` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
