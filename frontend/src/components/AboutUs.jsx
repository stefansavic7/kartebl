import Zdravko from "../assets/zdravko.jpeg";

export const AboutUs = () => {
    return (
      <div className="flex flex-col md:flex-row bg-gray-100 p-6 md:p-12 min-h-screen">
        {/* Tekstualni sadržaj */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">ABOUT US</h2>
          <p className="text-gray-600 font-semibold mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <button className="bg-gray-800 text-white py-2 px-6 hover:bg-gray-700 transition">
            Read More
          </button>

          {/* Ikonice društvenih mreža */}
          <div className="flex mt-6 space-x-4">
            <a href="#" className="text-red-600 text-2xl">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-red-600 text-2xl">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-red-600 text-2xl">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Slika */}
        <div className="md:w-1/2 flex justify-center items-center mt-6 md:mt-0">
          <img  
            src={Zdravko}
            alt="About Us"
            className="rounded shadow-lg max-w-md w-full h-auto"
          />
        </div>
      </div>
    );
};
