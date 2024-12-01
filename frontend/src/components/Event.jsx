import { Link } from 'react-router-dom';


const Event = ({Picture, Title, Location, Date}) => {
    return (
        <div className="group rounded-2xl bg-[#282231] text-white w-[20rem] h-[22rem] m-14 transition-all duration-300 hover:shadow-[0_0_0.9rem_0.6rem_rgba(236,72,153,0.8)] hover:-translate-y-2 overflow-hidden">
            <Link className="block text-center ">
                <div className="pt-2 pb-2 text-lg">
                    <b className="group-hover:text-pink-500 transition-colors duration-300">{Title}</b>
                </div>
                <div className="overflow-hidden">
                    <img className="w-full h-[14rem] transition-transform duration-300 group-hover:scale-110" src={Picture}/>
                </div>
                <div className="flex pl-3 pb-3 pt-3 gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffffff" className="size-6"><path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 1.144.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"clipRule="evenodd"/></svg>
                    <div>{Location}</div>
                </div>
                <div className="flex pl-3 pb-3 gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffffff" className="size-6"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd"/></svg>
                    <div>{Date}</div>
                </div>
            </Link>
        </div>
    );
};

export default Event;