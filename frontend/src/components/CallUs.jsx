import React, { useState } from 'react';

const CallUs = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <button onClick={handleClick} className="relative w-96 h-64 rounded-2xl group transition-all duration-[400ms] cursor-pointer" style={{perspective: '800px',}}>
      <div className="absolute inset-0 flex justify-center items-center transition duration-[400ms] rounded-2xl group-hover:shadow-[0_0_0.9rem_0.6rem_rgba(236,72,153,0.8)]"
        style={{transformStyle: 'preserve-3d',transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}}>
        {/* Front Side */}
        <div
          className="absolute flex flex-col justify-center items-center w-full h-full bg-zinc-100 rounded-2xl"
          style={{ backfaceVisibility: 'hidden'}}>
          <div className="relative flex justify-center items-center mt-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20 absolute transition-opacity duration-[400ms] opacity-100"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-20 absolute transition-opacity duration-[400ms] opacity-0 group-hover:opacity-100"><path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd"/></svg>
          </div>
          <span className="mt-14">Pozovite nas</span>
        </div>

        {/* Back Side */}
        <div
          className={`absolute flex flex-col justify-center items-center w-full h-full bg-zinc-100 rounded-2xl text-center p-4 transition-opacity duration-[550ms] ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
          style={{transform: 'rotateY(180deg)'}}>
          <span className={`text-2xl font-semibold transition-opacity duration-[200ms] ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
            +387 66 111 111
          </span>
        </div>
      </div>
    </button>
  );
};

export default CallUs;
















