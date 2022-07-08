import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Delete } from "../../icons/Delete";
import { Edit } from "../../icons/Edit";
import { showReadMore, showFullContent } from "../../utils/LongToShortText";
import Button from "../Button";

function Published() {
    const [publishedBlogs, setPublishedBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function getPublishedBlogs() {
        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/draft/${true}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token")?.split(" ")[1]}`
                }
            });
            const publishedBlogs = await res.json();
            setPublishedBlogs(publishedBlogs);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDelete(id) {
        setIsLoading(true);
        try {
            await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token").split(" ")[1]}`
                }
            })
        } catch (error) {
            // handle later on
        }
        getPublishedBlogs();
        setIsLoading(false);
    }

    function handleEdit(publishedId) {
        Cookies.set("draftId", publishedId);
        navigate("../../edit");
    }

    useEffect(() => {
        getPublishedBlogs();
    }, []);

    const publishedBlogElements = publishedBlogs?.length > 0 ? publishedBlogs.map(publishedBlog => (
        <div key={publishedBlog.id} className="flex flex-col text-justify gap-y-4 justify-space-around">
            <h2 className="font-bold font-sans text-2xl mt-4">{publishedBlog.title}</h2>
            <p>
                {/* {publishedBlog.content} */}
                {publishedBlog.content.length > 500 ?
                    showReadMore(publishedBlog.content, 500) :
                    showFullContent(publishedBlog.content)
                }
            </p>

            <div>
                <Button
                    icon={<Edit />}
                    className="p-2 mr-4"
                    onClick={() => handleEdit(publishedBlog.id)}
                />
                <Button
                    icon={<Delete />}
                    className="p-1 mr-4"
                    onClick={() => handleDelete(publishedBlog.id)}
                />
            </div>
            <hr />
        </div>
    )) :
        "Your published list is empty..."

    return (
        <div className="px-2 py-4 font-serif">
            {
                publishedBlogElements.length === 0 ? (isLoading ? "Loading..." : "Your published list is empty...") :
                    publishedBlogElements
            }
        </div>
    );
}

export default Published;