import { Listbox } from "@headlessui/react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const routes = [{ path: "/blogMenu/edit" }]

function Write() {
    const [saveOption, setSaveOption] = useState("Drafts");
    const navigate = useNavigate();
    const location = useLocation();
    // const [{ route }] = matchRoutes(routes, location);
    // console.log(route.path);
    const [editMode, setEditMode] = useState(false);
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: "",
            content: "",
        }
    });

    async function submitHandler(data) {
        const blogData = {
            ...data,
            published: saveOption === "Drafts" ? false : true,
            category: 'blog'
        }

        console.log(blogData);

        try {
            const token = Cookies.get("token")?.split(" ")[1];
            const draftId = Cookies.get("draftId");

            if (editMode) {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${draftId}`, {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(blogData)
                });
                const resJSON = await res.json();
                console.log(resJSON);
            } else {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(blogData)
                });
                const resJSON = await res.json();
                console.log(resJSON);
            }

            alert(`Saved to ${saveOption}`);
            navigate("/blogMenu/home");
        } catch (error) {
            console.log(error);
        }
    }

    async function editHandler() {
        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${Cookies.get("draftId")}`);
            const resJSON = await res.json();
            return resJSON;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const isEditMode = matchRoutes(routes, location);
        console.log(isEditMode);

        if (isEditMode) {
            setEditMode(true);
            console.log("reseting.. informations")
            editHandler().then(blog => {
                reset(blog);
            });
            return;
        }

        setEditMode(false);

        // const draftId = Cookies.get("draftId");
        // const isEditMode = draftId !== undefined;
    }, [location, reset]);

    return (
        <form className="container w-2/4 p-3 mx-auto mt-6" onSubmit={handleSubmit(submitHandler)}>
            <div className="flex justify-end items-center mb-9 gap-6">

                <Listbox
                    value={saveOption}
                    onChange={setSaveOption}
                >
                    <div className="relative">
                        <Listbox.Button className="relative w-48 border border-1 border-indigo-500 p-2 
                                rounded-md text-sm font-bold bg-indigo-500 text-white flex flex-row justify-between items-center gap-3">
                            <span>{saveOption}</span>
                            <span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                            </svg></span>
                        </Listbox.Button>

                        <Listbox.Options className="absolute border shadow-md w-full
                                text-sm mt-2 rounded-md">
                            <Listbox.Option value="Drafts" className={({ active }) => `p-1 cursor-pointer hover:bg-indigo-500
                                    hover:text-white hover:rounded-t-md ${active && "bg-indigo-500 text-white"}`}>
                                {({ selected }) => (
                                    <div className="flex justify-between items-center">
                                        <span className={`${selected && "font-bold"}`}>
                                            Drafts
                                        </span>
                                        {selected ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : null}
                                    </div>
                                )}
                            </Listbox.Option>
                            <Listbox.Option value="Publish" className={({ active }) => `p-1 cursor-pointer hover:bg-indigo-500
                                    hover:text-white hover:rounded-b-md ${active && "bg-indigo-500 text-white"}`}>
                                {({ selected }) => (
                                    <div className="flex justify-between items-center">
                                        <span className={`${selected && "font-bold"}`}>
                                            Publish
                                        </span>
                                        {selected ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : null}
                                    </div>
                                )}
                            </Listbox.Option>
                        </Listbox.Options>
                    </div>
                </Listbox>

                <button
                    type="submit"
                    className="group relative border border-1 border-indigo-500 text-indigo-700 font-bold text-lg px-3 py-1 rounded-md hover:bg-indigo-500 hover:text-white transition-all"
                >
                    Submit
                </button>
            </div>
            <input
                type="text"
                className="w-full p-2 mb-6 border-b-2 focus:outline-0 text-6xl font-serif focus:border-indigo-500 focus:transition-all"
                placeholder="Title"
                autoFocus={true}
                {...register("title")}
            />
            <textarea
                rows="20"
                placeholder="Tell your story..."
                className="w-full h-full focus:outline-none p-2 border-b-2 focus:border-indigo-500 text-lg font-serif resize-none"
                {...register("content")}
            >
            </textarea>
        </form>
    );
}

export default Write;