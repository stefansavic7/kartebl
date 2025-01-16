import SendEmail from "../components/SendEmail";
import CallUs from "../components/CallUs";
import  FAQ from "../components/FAQ";


const Contact = () => {
  return (
    <div className="bg-zinc-200">
      <div className="flex flex-col p-10 space-y-10 justify-center items-center">
        <b className="text-2xl">Često postavljena pitanja</b>
        <FAQ question="Pitanje" answer = "Odgovor nainivfnaisn aisndiasnidn asfjiasndoiasd jasfnoasjdonasd"></FAQ>
        <FAQ question="Pitanjeeeeee eeeeee" answer = "Odgovor"></FAQ>
        <FAQ question="Pitanje opettttttttttttttttttttttttttt" answer = "Odgovor nainivfnrergferfgerdfddddddddddddddddddddddddddddddddddddddddddferferaisn aisndiasnidn asfjiasndoiasdfffffffffffffffffffffffffffffffffffffffffffffffffffff jasfnoasjdonasd"></FAQ>
      </div>
      <div className="flex justify-center p-10 gap-60 pb-20 ">
        <SendEmail></SendEmail>
        <CallUs></CallUs>
      </div>
    </div>
  )
}

export default Contact