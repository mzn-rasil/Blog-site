import { useEffect, useState } from "react";


function Drafts() {
    const [drafts, setDrafts] = useState([]);

    useEffect(() => {
        async function getDrafts() {
            const res = await fetch(`http://127.0.0.1:8000/posts`);
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

    return (
        <div className="p-2 mt-4 font-serif">
            {drafts.map(draft => (
                <div key={draft.id} className="p-2">
                    <h2>{draft.title}</h2>
                    <p className="py-2">{draft.content}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Drafts;