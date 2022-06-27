import { NavLink, Outlet } from "react-router-dom";

function Stories() {
    return (
        <div className="container w-2/4 p-3 mx-auto mt-6">
            <h2 className="font-black text-4xl text-indigo-700">
                Your stories
            </h2>

            <div className="w-full h-96 mt-16">
                <div className="flex gap-8 font-serif text-slate-500">
                    <NavLink
                        to="../stories"
                        className="p-2"
                        end
                    >
                        {({ isActive }) => {
                            return <span
                                className={`${isActive && "border-b-[3px] border-indigo-500"} hover:border-b-[3px] hover:border-indigo-500 p-2`}
                            >
                                Drafts
                            </span>
                        }}
                    </NavLink>


                    <NavLink
                        to="published"
                        className="p-2"
                    >
                        {({ isActive }) => {
                            return <span
                                className={`${isActive && "border-b-[3px] border-indigo-500"} hover:border-b-[3px] hover:border-indigo-500 p-2`}
                            >
                                Published
                            </span>
                        }}
                    </NavLink>
                </div>
                <hr />

                <Outlet />
            </div>
        </div>
    );
}

export default Stories;