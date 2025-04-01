package org.unibl.etf.kartebl_backendaplikacija.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudJpaService;
import org.unibl.etf.kartebl_backendaplikacija.component.QRCodeGenerator;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.TransakcijaDto;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.KartaEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.KorisnikEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.TransakcijaEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.request.TransakcijaRequest;
import org.unibl.etf.kartebl_backendaplikacija.repositories.KartaRepository;
import org.unibl.etf.kartebl_backendaplikacija.repositories.KorisnikRepository;
import org.unibl.etf.kartebl_backendaplikacija.repositories.TransakcijaRepository;
import org.unibl.etf.kartebl_backendaplikacija.services.TransakcijaService;

import java.security.SecureRandom;
import java.util.List;

@Service
@Transactional
public class TransakcijaServiceImpl extends CrudJpaService<TransakcijaEntity, Integer> implements TransakcijaService
{
    private final ModelMapper modelMapper;
    TransakcijaRepository transakcijaRepository;
    private static final String ALPHANUMERIC_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int CODE_LENGTH = 64;
    EmailService emailService;
    KorisnikRepository korisnikRepository;
    KartaRepository kartaRepository;


    QRCodeGenerator qrCodeGenerator;

    public TransakcijaServiceImpl(TransakcijaRepository transakcijaRepository, ModelMapper modelMapper,
              QRCodeGenerator qrCodeGenerator,  EmailService emailService,
               KorisnikRepository korisnikRepository, KartaRepository kartaRepository)
    {
        super(transakcijaRepository, modelMapper, TransakcijaEntity.class);
        this.modelMapper = modelMapper;
        this.qrCodeGenerator = qrCodeGenerator;
        this.transakcijaRepository = transakcijaRepository;

        this.emailService = emailService;
       this.kartaRepository = kartaRepository;
        this.korisnikRepository = korisnikRepository;
    }

    @Override
    public TransakcijaDto generate(TransakcijaRequest transakcijaRequest) throws Exception {
        TransakcijaEntity transakcijaEntity = modelMapper.map(transakcijaRequest, TransakcijaEntity.class);
        transakcijaEntity.setStatus("ACTIVE");
        transakcijaEntity.setQr(generateTicketCode());
        KorisnikEntity korisnik = korisnikRepository.findById(transakcijaRequest.getKorisnikId())
                .orElseThrow(() -> new RuntimeException("Korisnik nije pronađen"));

        KartaEntity karta = kartaRepository.findById(transakcijaRequest.getKartaId())
                .orElseThrow(() -> new RuntimeException("Karta nije pronađena"));


        transakcijaEntity.setKorisnik(korisnik);
        transakcijaEntity.setKarta(karta);
        byte[] pngData= qrCodeGenerator.getQRCode(transakcijaEntity.getQr(),200,200);

        String content="Primili ste ovaj mejl zato sto ste narucili kartu preko stranice KarteBl";
        emailService.sendEmail(transakcijaEntity.getKorisnik().getEmail(),"ISCON 2023 - TICKET CONFIRMATION",content,pngData,
                transakcijaEntity.getKorisnik().getIme()+"_"+transakcijaEntity.getKorisnik().getPrezime()+".pdf",
                transakcijaEntity.getKorisnik().getIme(),transakcijaEntity.getKorisnik().getPrezime(),transakcijaEntity.getQr(), transakcijaEntity.getKarta().getVrstaKarte());


        return modelMapper.map(transakcijaRepository.saveAndFlush(transakcijaEntity), TransakcijaDto.class);

    }

    public String generateTicketCode() throws Exception{
        StringBuilder codeBuilder;
        int maxAttempts = 1000;
        int count = 0;
        SecureRandom random = new SecureRandom();

        do {
             codeBuilder = new StringBuilder();

            for (int i = 0; i < CODE_LENGTH; i++) {
                int randomIndex = random.nextInt(ALPHANUMERIC_CHARS.length());
                char randomChar = ALPHANUMERIC_CHARS.charAt(randomIndex);
                codeBuilder.append(randomChar);
            }
            if(count > maxAttempts) {
                throw new Exception("Nije moguce generisati qr kod!");

            }
            count++;
        }while (qrPostojiUBazi(codeBuilder.toString()));

        return codeBuilder.toString();
    }

    public boolean qrPostojiUBazi(String qr)
    {
        List<String> kodovi=transakcijaRepository.findAllQRCodes();
        for (String kod:kodovi)
            if (kod.equals(qr))
                return true;
        return false;
    }

}
