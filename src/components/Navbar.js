import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [show, setShow] = useState(false);

    return (
        <nav className="w-full border-b">
            <div className="py-5 md:py-0 container mx-auto flex items-center justify-between">
                <div aria-label="Home. logo" role="img" className="flex flex-row justify-between items-center md:flex md:flex-row md:items-center md:justify-center">
                    <div>
                        <Link to="/">
                            <img
                                className="mx-auto h-12 w-auto mr-6"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Workflow"
                            />
                        </Link>
                    </div>
                    <div>
                        <button onClick={() => setShow(!show)} className={`${show ? 'hidden' : ''} sm:block md:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500`}>
                            <svg aria-haspopup="true" aria-label="open Main Menu" xmlns="http://www.w3.org/2000/svg" className="md:hidden icon icon-tabler icon-tabler-menu" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1={4} y1={8} x2={20} y2={8} />
                                <line x1={4} y1={16} x2={20} y2={16} />
                            </svg>
                        </button>
                        <div id="menu" className={` ${show ? '' : 'hidden'} md:block lg:block `}>
                            <button onClick={() => setShow(!show)} className={`block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 fixed focus:outline-none focus:ring-2 focus:ring-gray-500 z-30 top-0 mt-6`}>
                                <svg aria-label="close main menu" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1={18} y1={6} x2={6} y2={18} />
                                    <line x1={6} y1={6} x2={18} y2={18} />
                                </svg>
                            </button>
                            <h1 className="text-3xl font-sans text-indigo-700 font-black py-7"> Pen And Paper </h1>
                        </div>
                    </div>
                </div>
                <button className="focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 hidden md:block bg-transparent transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white rounded border border-indigo-700 text-indigo-700 px-4 sm:px-8 py-1 sm:py-3 text-sm transition-all">
                    <Link to="/signUpStep1">
                        Sign Up
                    </Link>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;