import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { MAX_LEN, showReadMore, showFullContent } from "../../utils/LongToShortText";

function Published() {
    const [publishedBlogs, setPublishedBlogs] = useState([]);

    useEffect(() => {
        async function getPublishedBlogs() {
            const res = await fetch(`http://127.0.0.1:8000/draft/${true}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token")?.split(" ")[1]}`
                }
            });
            const resJSON = await res.json();
            return resJSON;
        }

        try {
            const resPublishedBlogs = getPublishedBlogs();

            resPublishedBlogs
                .then(publishedBlogs => {
                    console.log(publishedBlogs);
                    setPublishedBlogs(publishedBlogs);
                })
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error);
        }
    }, []);

    const publishedBlogElements = publishedBlogs && publishedBlogs.map(publishedBlog => (
        <div key={publishedBlog.id}>
            <h2 className="py-2">{publishedBlog.title}</h2>
            <p className="pb-4">
                {/* {publishedBlog.content} */}
                {publishedBlog.content.length > MAX_LEN ?
                    showReadMore(publishedBlog.content) :
                    showFullContent(publishedBlog.content)
                }
            </p>
            <hr />
        </div>
    ))

    return (
        <div className="px-2 py-4 font-serif">
            {publishedBlogElements}
        </div>
    );
}

export default Published;