import Sidebar from "../../components/Sidebar";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Profile from "../../components/Profile";

function Blog() {
    const [searchParams] = useSearchParams();
    const blogId = searchParams.get("id");
    const [blog, setBlog] = useState(null);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    function handleLike(id) {
        setLiked(prevLiked => !prevLiked);
    }

    function handleBookmark(id) {
        setBookmarked(prevBookmarked => !prevBookmarked);
    }

    useEffect(() => {
        async function getBlog() {
            try {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${blogId}`);
                const blog = await res.json();

                console.log(blog);
                setBlog(blog);
            } catch (error) {
                console.log(error);
            }
        }
        getBlog();
    }, [blogId]);

    return (
        <div>
            <Sidebar />

            <div className="container w-2/4 p-3 mx-auto mt-8">
                <div className="flex flex-col mb-20">
                    <div className="flex justify-between ">
                        {blog && <Profile blog={blog} />}

                        <div className="flex gap-4 mt-4">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 hover:fill-indigo-500 cursor-pointer ${liked && "fill-indigo-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        onClick={() => handleLike(blog.id)} />
                                </svg>
                            </div>

                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 hover:fill-indigo-500 cursor-pointer ${bookmarked && "fill-indigo-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" onClick={() => handleBookmark(blog.id)} />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <h2 className="font-black text-4xl text-slate-700 my-8">
                        {blog?.title}
                    </h2>

                    <p className="text-justify">
                        {blog?.content}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Blog;