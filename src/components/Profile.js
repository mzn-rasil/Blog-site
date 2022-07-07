import Image from "./Image";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Profile({ blog }) {
    const [blogOwner, setBlogOwner] = useState(null);
    // console.log(blogOwner);

    useEffect(() => {
        async function getBlogOwner() {
            try {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/user/${blog.owner_id}`);
                const blogOwner = await res.json();
                setBlogOwner({
                    firstName: blogOwner.firstName,
                    lastName: blogOwner.lastName
                });
            } catch (error) {
                console.log(error);
            }
        }
        getBlogOwner();
    }, [blog.owner_id]);

    return (
        <div className="flex my-2 gap-4 items-center ">
            <Link to="#">
                <Image src={blog.profileImage} />
            </Link>
            <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                    <Link to="#">
                        <span
                            className="text-sm text-indigo-600 font-bold"
                        >{blogOwner?.firstName} {blogOwner?.lastName}
                        </span>
                    </Link>
                    <span className="text-indigo-500">
                        |
                    </span>
                    <span
                        className="text-xs text-slate-400 font-semibold cursor-pointer"
                    >
                        {blog.category}
                    </span>
                </div>
                <span
                    className="text-xs text-slate-400 font-semibold cursor-pointer"
                >
                    {formatDate(blog.created_at)}
                </span>
            </div>
        </div>
    );
}

export default Profile;