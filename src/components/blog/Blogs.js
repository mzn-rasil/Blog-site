import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../Profile";

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    console.log(blogs);

    useEffect(() => {
        async function getBlogs() {
            try {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`);
                const blogPosts = await res.json();

                setBlogs(blogPosts);
            } catch (error) {
                console.log(error);
            }
        }
        getBlogs();
    }, []);

    const blogElements = blogs.length > 0 &&
        blogs.filter(blog => blog.owner.id !== parseInt(Cookies.get("userId"))).map(blog => (
            <div key={blog.id} className="my-8">
                <Profile blog={blog} />

                <h2
                    className="font-bold text-xl my-3 text-slate-800 cursor-pointer"
                    onClick={() => navigate({
                        pathname: "blogs",
                        search: `?id=${blog.id}`
                    })}
                >
                    {blog.title}
                </h2>

                <p
                    className="text-sm font-sans text-justify cursor-pointer"
                    onClick={() => navigate({
                        pathname: "blogs",
                        search: `?id=${blog.id}`
                    })}
                >
                    {blog.content}
                </p>

                <hr className="my-6 border-1 border-slate-300" />
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

export default Blogs;