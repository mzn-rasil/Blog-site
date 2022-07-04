import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Blog from "../../components/blog/Blog";
import Navbar from "../../components/Navbar";

function BlogLandingPage() {

    return (
        <div className="">
            <div className="bg-gray-100 py-24 overflow-y-hidden" style={{ minHeight: 600 }}>
                {/* Code block starts */}
                <dh-component>
                    <Navbar />
                    <div className="bg-gray-100">
                        <div className="container mx-auto flex flex-col justify-center items-center py-12 sm:py-24">
                            <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10">
                                    The Freedom to Create the
                                    <br />
                                    <span className="text-indigo-700"> Blogs </span>
                                    You Want
                                </h1>
                                <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg"><i>“Blogging is to writing what extreme sports are to athletics: more free-form, more accident-prone, less formal, more alive. It is, in many ways, writing out loud.” </i></p>
                            </div>
                            <div className="flex justify-center items-center">
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-indigo-700 py-2 sm:py-4 text-sm">
                                    <Link to={Cookies.get("token") ? "/blogMenu/write" : "/login"}>
                                        Start Writing Your Blogs
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </dh-component>
                {/* Code block ends */}
            </div>
            <Blog />
        </div>

    );
}

export default BlogLandingPage;
