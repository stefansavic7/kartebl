
const SendEmail = () => {
    return (
        <button className="flex flex-col justify-center items-center w-96 h-64 rounded-2xl bg-zinc-100 group transition transition-all hover:shadow-[0_0_0.9rem_0.6rem_rgba(236,72,153,0.8)] duration-300">
            <div className="relative flex justify-center items-center mt-10">
                {/* First Icon (Visible by default, hidden on hover) */}
                <i className="fa-regular fa-envelope fa-7x absolute transition-opacity duration-300 opacity-100 group-hover:opacity-0"></i>
                {/* Second Icon (Hidden by default, visible on hover) */}
                <i className="fa-solid fa-envelope fa-7x absolute transition-opacity duration-300 opacity-0 group-hover:opacity-100"></i>
            </div>
            {/* Button Text */}
            <span className="mt-14">Pošaljite nam E-mail</span>
        </button>
    );
};


export default SendEmail;