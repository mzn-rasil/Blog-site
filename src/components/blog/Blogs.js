import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../Profile";

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    // console.log(blogs);


    // console.log('Rasil', blogs[0]?.Post.title);

    useEffect(() => {
        async function getBlogs() {
            try {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`, {
                    headers: {
                        "content-type": "application/json"
                    }
                });
                const blogPosts = await res.json();
                // console.log(blogPosts);
                setBlogs(blogPosts.map(blog => {
                    // console.log(blog);
                    const blogg = {
                        ...blog.Post,
                        likes: blog.likes
                    };
                    return blogg;
                }));

                const arr = blogPosts.map(blog => blog.Post.owner.id);
                // for (let blog of blogPosts) {
                //     // console.log(blog);
                //     arr.push(blog.Post.owner.id);
                // }
                console.log('ownnerIdArray', arr);
            } catch (error) {
                console.log(error);
            }
        }
        getBlogs();
    }, []);

    const blogElements = blogs?.length > 0 &&
        blogs.filter(blog => blog?.owner?.id !== parseInt(Cookies.get("userId"))).map(blog => (
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