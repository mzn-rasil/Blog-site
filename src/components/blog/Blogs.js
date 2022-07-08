import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Profile from "../Profile";
import { showReadMore } from "../../utils/LongToShortText";

function Blogs({ blogs }) {
    const navigate = useNavigate();

    const blogElements = blogs?.length > 0 &&
        blogs.filter(blog => blog?.owner_id !== parseInt(Cookies.get("userId"))).map(blog => (
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
                    {showReadMore(blog.content, 800)}
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