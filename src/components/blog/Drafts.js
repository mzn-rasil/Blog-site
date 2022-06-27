import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function Drafts() {
    const [drafts, setDrafts] = useState([]);

    useEffect(() => {
        async function getDrafts() {
            const res = await fetch(`http://127.0.0.1:8000/draft/${false}`, {
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
            const resDrafts = getDrafts();

            resDrafts
                .then(drafts => setDrafts(drafts))
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error);
        }
    }, []);

    const draftElements = drafts && drafts.map(draft => (
        <div key={draft.id}>
            <h2 className="py-2">{draft.title}</h2>
            <p className="pb-4">
                {draft.content}
            </p>
            <hr />
        </div>
    ))

    return (
        <div className="px-2 py-4 font-serif">
            {draftElements}
        </div>
    );
}

export default Drafts;