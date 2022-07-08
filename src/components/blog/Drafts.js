import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { Edit } from "../../icons/Edit";
import { Delete } from "../../icons/Delete";

function Drafts() {
    const [drafts, setDrafts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function getDrafts() {
        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/draft/${false}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token")?.split(" ")[1]}`
                }
            });
            const drafts = await res.json();
            setDrafts(drafts);
            setIsLoading(false);
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
        getDrafts();
        setIsLoading(false);
    }

    function handleEdit(draftId) {
        Cookies.set("draftId", draftId);
        navigate("../../edit");
    }

    useEffect(() => {
        getDrafts();
    }, []);

    const draftElements = drafts.length > 0 ? drafts.map(draft => (
        <div key={draft.id} className="py-3">
            <h2 className="py-2 font-bold font-sans text-xl">{draft.title}</h2>
            <p className="pb-4">
                {draft.content.substring(0, 200)}...
            </p>
            <Button
                icon={<Edit />}
                className="p-2 mr-4"
                onClick={() => handleEdit(draft.id)}
            />
            <Button
                icon={<Delete />}
                className="p-1 mr-4"
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