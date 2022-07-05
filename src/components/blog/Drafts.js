import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

function Drafts() {
    const [drafts, setDrafts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function getDrafts() {
        setIsLoading(true);
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/draft/${false}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")?.split(" ")[1]}`
            }
        });
        const resJSON = await res.json();
        return resJSON;
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
            try {
                const resDrafts = getDrafts();
                resDrafts
                    .then(drafts => {
                        console.log(drafts)
                        setDrafts(drafts)
                        setIsLoading(false);
                    })
                    .catch(error => console.log(error))
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            // handle later on
        }
    }

    function handleEdit(draftId) {
        Cookies.set("draftId", draftId);
        navigate("../../edit");
    }

    useEffect(() => {
        try {
            const resDrafts = getDrafts();

            resDrafts
                .then(drafts => setDrafts(drafts))
                .catch(error => console.log(error))

            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const draftElements = drafts.length > 0 ? drafts.map(draft => (
        <div key={draft.id} className="py-3">
            <h2 className="py-2 font-bold text-xl">{draft.title}</h2>
            <p className="pb-4">
                {draft.content.substring(0, 150)}...
            </p>
            <Button
                title="Edit"
                className="p-1 mr-4 w-16"
                onClick={() => handleEdit(draft.id)}
            />
            <Button
                title="Delete"
                className="p-1 mr-4 w-16"
                onClick={() => handleDelete(draft.id)}
            />
            <hr />
        </div>
    )) :
        "Your drafts is empty...";

    return (
        <div className="px-2 py-4 font-serif">
            {
                draftElements.length === 0 ? (isLoading ? "Loading..." : "Your drafts is empty...") :
                    draftElements
            }
        </div>
    );
}

export default Drafts;