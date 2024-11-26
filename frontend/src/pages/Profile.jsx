import React, { useState } from "react";

const Profile = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const divContents = [
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Moj Profil</h2>
      <p className="text-gray-600">Ovo je vaš profil. Ovdje možete vidjeti svoje podatke.</p>
    </div>,
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Narudžbe</h2>
      <ul className="list-disc pl-5">
        <li>Narudžba #1</li>
        <li>Narudžba #2</li>
        <li>Narudžba #3</li>
      </ul>
    </div>,
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Podešavanja</h2>
      <p className="text-gray-600">Promijenite svoje postavke ovdje.</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Spremi promjene
      </button>
    </div>,
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Pomoć</h2>
      <p className="text-gray-600">Ako trebate pomoć, kontaktirajte nas na <a href="mailto:support@example.com" className="text-blue-500 underline">support@example.com</a>.</p>
    </div>,
  ];

  return (
    <div className="bg-zinc-200 flex">
      <div className="mt-5 ml-5 mb-5">
        <div className="p-10 bg-zinc-100 w-96 rounded-tl-2xl rounded-tr-2xl">
          <div className="w-14 h-14 rounded-full flex justify-center items-center border-[0.19rem] relative overflow-visible border-pink-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-[3.7rem] h-[3.7rem] text-gray-500"><path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0, 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd"/></svg>
          </div>
          <div className="pt-4">
            <b>Marko Markovic</b>
          </div>
        </div>
        <div className="mt-0.5 p-9 bg-zinc-100 w-96 rounded-bl-2xl rounded-br-2xl">
          {["Moj Profil", "Narudžbe", "Podešavanja", "Pomoć"].map((label, index) => (
            <div key={index}>
              <button
                className={`flex items-center gap-1 pt-5 hover:text-pink-500 transition ${activeIndex === index ? "opacity-40" : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d={
                      index === 0
                        ? "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        : index === 1
                        ? "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        : index === 2
                        ? "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.074-.044.147-.087.22-.127.332-.184.582-.496.645-.87l.213-1.281ZM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        : "M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    }/>
                </svg>
                {label}
              </button>
            </div>
          ))}
          <div>
              <button className="hover:opacity-40 transition flex items-center gap-1 pt-3 mt-24">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" /></svg>
                  Odjava
              </button>
          </div>
        </div>
      </div>
      <div className="bg-zinc-100 w-[68rem] h-[35rem] rounded-2xl ml-5 mt-5 mb-5">{divContents[activeIndex]}</div>
    </div>
  );
};

export default Profile;



