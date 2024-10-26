-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Osoba`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Osoba` (
  `KorisnickoIme` VARCHAR(50) NOT NULL,
  `Sifra` VARCHAR(45) NOT NULL,
  `Ime` VARCHAR(45) NOT NULL,
  `Prezime` VARCHAR(45) NOT NULL,
  `Mail` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`KorisnickoIme`),
  UNIQUE INDEX `KorisnickoIme_UNIQUE` (`KorisnickoIme` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Korisnik`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Korisnik` (
  `KorisnickoIme` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`KorisnickoIme`),
  CONSTRAINT `fk_Korisnik_Osoba1`
    FOREIGN KEY (`KorisnickoIme`)
    REFERENCES `mydb`.`Osoba` (`KorisnickoIme`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Administrator`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Administrator` (
  `KorisnickoIme` VARCHAR(50) NOT NULL,
  `JMBG` CHAR(13) NOT NULL,
  PRIMARY KEY (`KorisnickoIme`),
  UNIQUE INDEX `JMBG_UNIQUE` (`JMBG` ASC) VISIBLE,
  CONSTRAINT `fk_Administrator_Osoba`
    FOREIGN KEY (`KorisnickoIme`)
    REFERENCES `mydb`.`Osoba` (`KorisnickoIme`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Organizator`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Organizator` (
  `KorisnickoIme` VARCHAR(50) NOT NULL,
  `JMBG` CHAR(13) NOT NULL,
  `KorisnickoImeAdministratora` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`KorisnickoIme`),
  UNIQUE INDEX `JMBG_UNIQUE` (`JMBG` ASC) VISIBLE,
  INDEX `fk_Organizator_Administrator1_idx` (`KorisnickoImeAdministratora` ASC) VISIBLE,
  CONSTRAINT `fk_Organizator_Osoba1`
    FOREIGN KEY (`KorisnickoIme`)
    REFERENCES `mydb`.`Osoba` (`KorisnickoIme`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Organizator_Administrator1`
    FOREIGN KEY (`KorisnickoImeAdministratora`)
    REFERENCES `mydb`.`Administrator` (`KorisnickoIme`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Dogadjaj`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Dogadjaj` (
  `IdDogadjaja` INT NOT NULL AUTO_INCREMENT,
  `Naziv` VARCHAR(45) NOT NULL,
  `Datum` DATE NOT NULL,
  `Vrijeme` TIME NOT NULL,
  `Lokacija` VARCHAR(45) NOT NULL,
  `Opis` VARCHAR(500) NULL,
  `Slika` MEDIUMBLOB NULL,
  `KorisnickoImeOrganizatora` VARCHAR(50) NOT NULL,
  `KorisnickoImeAdministratora` VARCHAR(50) NULL,
  PRIMARY KEY (`IdDogadjaja`),
  INDEX `fk_Dogadjaj_Organizator1_idx` (`KorisnickoImeOrganizatora` ASC) VISIBLE,
  INDEX `fk_Dogadjaj_Administrator1_idx` (`KorisnickoImeAdministratora` ASC) VISIBLE,
  CONSTRAINT `fk_Dogadjaj_Organizator1`
    FOREIGN KEY (`KorisnickoImeOrganizatora`)
    REFERENCES `mydb`.`Organizator` (`KorisnickoIme`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Dogadjaj_Administrator1`
    FOREIGN KEY (`KorisnickoImeAdministratora`)
    REFERENCES `mydb`.`Administrator` (`KorisnickoIme`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Karta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Karta` (
  `IdKarte` INT NOT NULL AUTO_INCREMENT,
  `Cijena` DECIMAL(10,2) NOT NULL,
  `VrstaKarte` VARCHAR(45) NULL,
  `QR` MEDIUMBLOB NOT NULL,
  `IdDogadjaja` INT NOT NULL,
  `KorisnickoImeOrganizatora` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`IdKarte`),
  INDEX `fk_Karta_Dogadjaj1_idx` (`IdDogadjaja` ASC) VISIBLE,
  INDEX `fk_Karta_Organizator1_idx` (`KorisnickoImeOrganizatora` ASC) VISIBLE,
  CONSTRAINT `fk_Karta_Dogadjaj1`
    FOREIGN KEY (`IdDogadjaja`)
    REFERENCES `mydb`.`Dogadjaj` (`IdDogadjaja`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Karta_Organizator1`
    FOREIGN KEY (`KorisnickoImeOrganizatora`)
    REFERENCES `mydb`.`Organizator` (`KorisnickoIme`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Transakcija`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Transakcija` (
  `IdTransakcije` INT NOT NULL AUTO_INCREMENT,
  `Karta_IdKarte` INT NOT NULL,
  `KorisnickoImeKorisnika` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`IdTransakcije`),
  INDEX `fk_Transakcija_Karta1_idx` (`Karta_IdKarte` ASC) VISIBLE,
  INDEX `fk_Transakcija_Korisnik1_idx` (`KorisnickoImeKorisnika` ASC) VISIBLE,
  CONSTRAINT `fk_Transakcija_Karta1`
    FOREIGN KEY (`Karta_IdKarte`)
    REFERENCES `mydb`.`Karta` (`IdKarte`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Transakcija_Korisnik1`
    FOREIGN KEY (`KorisnickoImeKorisnika`)
    REFERENCES `mydb`.`Korisnik` (`KorisnickoIme`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`SkeniranaKarta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`SkeniranaKarta` (
  `VrijemeSkeniranja` TIME NULL,
  `IdTransakcije` INT NOT NULL,
  PRIMARY KEY (`IdTransakcije`),
  INDEX `fk_SkeniranaKarta_Transakcija1_idx` (`IdTransakcije` ASC) VISIBLE,
  CONSTRAINT `fk_SkeniranaKarta_Transakcija1`
    FOREIGN KEY (`IdTransakcije`)
    REFERENCES `mydb`.`Transakcija` (`IdTransakcije`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
