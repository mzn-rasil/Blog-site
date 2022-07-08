import { useEffect, useRef, useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import Error from "../error/Error";
import Blogs from "./Blogs";

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [searchValue, setSearchValue] = useState(null);
    const searchText = useRef(null);
    const navigate = useNavigate();
    const params = { search: searchValue };
    const [searchParams] = useSearchParams();

    function handleChange(e) {
        setSearchValue(e.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        navigate({
            pathname: "..",
            search: `?${createSearchParams(params)}`
        });
    }

    useEffect(() => {
        // console.log(url.href);
        async function getQueryBlogs() {
            const blogQuery = {
                limit: 10,
                skip: 0,
            };
            if (searchParams.get("search")) {
                blogQuery.search = searchParams.get("search")
            }
            const url = new URL(`${process.env.REACT_APP_BASE_URL}/posts`);

            for (let query in blogQuery) {
                url.searchParams.append(query, blogQuery[query])
            }

            try {
                const res = await fetch(url);
                const resBlogs = await res.json();

                console.log(resBlogs);
                setBlogs(resBlogs);
            } catch (error) {
                console.log(error);
                <Error>{error}</Error>
            }
        }

        getQueryBlogs();
    }, [searchParams]);

    return (
        <div className="container w-2/4 p-3 mx-auto mt-6">
            <div className="flex justify-between items-center mb-20">
                <h2 className="font-black text-4xl text-indigo-700">
                    Home
                </h2>
                <label className="relative block">
                    <span className="sr-only">Search</span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="placeholder:italic placeholder:text-slate-400 block bg-white 
                            w-full border-b-2 border-slate-400 py-2 pl-9 pr-3 shadow-sm 
                            focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Search"
                            type="text"
                            name="search"
                            ref={searchText}
                            onChange={handleChange}
                        />
                    </form>
                </label>
            </div>
            <Blogs blogs={blogs} />
        </div>
    );
}

export default Home;