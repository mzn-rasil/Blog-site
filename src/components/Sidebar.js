import { Link, NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <div className="w-48 mr-52 px-10 py-6 bg-slate-50 h-screen fixed top-0 left-0 bottom-0
                flex flex-col items-end justify-between border-r-2 border-slate-300
            ">
            <Link to="/">
                <div className="mt-6">
                    <img
                        className="h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                </div>
            </Link>

            <div>
                <ul className="flex flex-col gap-16 font-monospace pr-2">
                    <li>
                        <NavLink to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 p-2 hover:bg-indigo-200 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </NavLink>
                    </li >
                    <li>
                        <NavLink to="#">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 p-2 hover:bg-indigo-200 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="#">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 p-2 hover:bg-indigo-200 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="#">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 p-2 hover:bg-indigo-200 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="#">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 p-2 hover:bg-indigo-200 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </NavLink>
                    </li>
                </ul >
            </div >

            <div>

            </div>
        </div >
    );
}

export default Sidebar;