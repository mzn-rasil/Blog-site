import Image from "./Image";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";

function Profile({ blog }) {
    return (
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
    );
}

export default Profile;