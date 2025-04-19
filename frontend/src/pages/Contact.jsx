import SendEmail from "../components/SendEmail";
import CallUs from "../components/CallUs";
import  FAQ from "../components/FAQ";


const Contact = () => {
  return (
    <div className="bg-zinc-200">
      <div className="flex flex-col p-10 space-y-10 justify-center items-center">
        <b className="text-2xl">Često postavljena pitanja</b>
        <FAQ question="Kako dobijam kartu?" answer = "Karta će nakon kupovine biti poslata na vaš email. Pri ulasku na događaj dužni ste kartu prikazati na ulazu."></FAQ>
        <FAQ question="Da li se sa jednom kartom može više puta ući na događaj?" answer = "Ne, nakon skeniranja karta postaje nevalidna."></FAQ>
      </div>
      <div className="flex justify-center p-10 gap-60 pb-20 ">
        <SendEmail emailPrimaoca="admin1@mail.com"></SendEmail>
        <CallUs></CallUs>
      </div>
    </div>
  )
}

export default Contact