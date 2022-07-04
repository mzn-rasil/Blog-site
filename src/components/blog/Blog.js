import { useEffect, useState } from "react";
import Image from "../Image";
import { formatDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";

function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    async function getBlogs() {
        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`);
            const blogPosts = await res.json();

            setBlogs(blogPosts);
        } catch (error) {
            console.log(error);
        }
    }

    function handleLike() {
        setLiked(prevLiked => !prevLiked);
    }

    function handleBookmark() {
        setBookmarked(prevBookmarked => !prevBookmarked);
    }

    useEffect(() => {
        getBlogs();
    }, []);


    const blogElements = blogs.length > 0 &&
        blogs.map(blog => (
            <div key={blog.id} className="my-8">
                <div className="flex my-2 gap-4 items-center ">
                    <Link to="#">
                        <Image src={blog.owner.profileImage} />
                    </Link>
                    <div className="flex flex-col">
                        <Link to="#">
                            <span
                                className="text-sm text-indigo-600 font-bold"
                            >{blog.owner.firstName} {blog.owner.lastName}
                            </span>
                        </Link>
                        <span
                            className="text-xs text-slate-400 font-semibold cursor-pointer"
                        >
                            {formatDate(blog.created_at)}
                        </span>
                    </div>
                </div>

                <Link to="#">
                    <h2
                        className="font-bold text-xl my-3 text-slate-800"
                    >
                        {blog.title}
                    </h2>
                </Link>

                <Link to="#">
                    <p
                        className="text-sm font-sans text-justify"
                    >
                        {blog.content}
                    </p>
                </Link>

                <div className="flex gap-4 mt-4">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 hover:fill-indigo-500 cursor-pointer ${liked && "fill-indigo-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                onClick={handleLike} />
                        </svg>
                    </div>

                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 hover:fill-indigo-500 cursor-pointer ${bookmarked && "fill-indigo-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" onClick={handleBookmark} />
                        </svg>
                    </div>
                </div>

                <hr className="my-6 border-1 border-indigo-300" />
            </div>
        ));

    return (
        <div>
            {
                blogElements
            }
        </div>
    );
}

export default Blog;