import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { MAX_LEN, showReadMore, showFullContent } from "../../utils/LongToShortText";

function Published() {
    const [publishedBlogs, setPublishedBlogs] = useState([]);

    useEffect(() => {
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

        getPublishedBlogs();
    }, []);

    const publishedBlogElements = publishedBlogs.length > 0 ? publishedBlogs.map(publishedBlog => (
        <div key={publishedBlog.id} className="flex flex-col text-justify gap-y-4 justify-space-around">
            <h2 className="font-bold text-xl mt-4">{publishedBlog.title}</h2>
            <p>
                {/* {publishedBlog.content} */}
                {publishedBlog.content.length > MAX_LEN ?
                    showReadMore(publishedBlog.content) :
                    showFullContent(publishedBlog.content)
                }
            </p>
            <hr />
        </div>
    )) :
        "Your published list is empty..."

    return (
        <div className="px-2 py-4 font-serif">
            {publishedBlogElements}
        </div>
    );
}

export default Published;