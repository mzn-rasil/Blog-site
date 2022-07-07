import { Listbox } from "@headlessui/react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import categories from "../../store/categories.json";

const routes = [{ path: "/blogMenu/edit" }]

function Write() {
    const [saveOption, setSaveOption] = useState("Drafts");
    const [currentCategory, setCurrentCategory] = useState("Select category");
    const navigate = useNavigate();
    const location = useLocation();
    const [editMode, setEditMode] = useState(false);
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: "",
            content: "",
            category: "",
        }
    });

    async function submitHandler(data) {
        const blogData = {
            ...data,
            published: saveOption === "Drafts" ? false : true,
            category: currentCategory,
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
            navigate("/blogMenu/");
        } catch (error) {
            console.log(error);
        }
    }

    async function editHandler() {
        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${Cookies.get("draftId")}`);
            const resJSON = await res.json();
            console.log(resJSON);
            return resJSON;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const isEditMode = matchRoutes(routes, location);

        if (isEditMode) {
            setEditMode(true);
            editHandler().then(blog => {
                setCurrentCategory(blog.category);
                reset(blog);
            });
            return;
        }

        setEditMode(false);
    }, [location, reset]);

    return (
        <form className="container w-2/4 p-3 mx-auto mt-6" onSubmit={handleSubmit(submitHandler)}>
            <div className="flex justify-end items-center mb-9 gap-6">
                <div className="flex gap-8 z-10">
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
                                text-sm mt-2 rounded-md bg-slate-100">
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

            </div>
            <div className="relative">
                <div className="absolute left-full ml-16">
                    <Listbox
                        value={currentCategory}
                        onChange={setCurrentCategory}
                    >
                        <Listbox.Button className="relative w-48 p-2 border-b-2 border-indigo-400 rounded-sm text-md font-bold text-indigo-500 flex flex-row justify-between items-center gap-3">
                            <span>{currentCategory}</span>
                            <span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                            </svg></span>
                        </Listbox.Button>
                        <div className="relative">
                            <Listbox.Options className="absolute border shadow-md w-full
                        text-sm mt-2 rounded-md">
                                {
                                    categories.categories.map(category => (
                                        // console.log(categoryValue.field)
                                        <Listbox.Option key={category.id} value={category.field} className={({ active }) => `p-1 cursor-pointer hover:bg-indigo-500
                                    hover:text-white hover:rounded-t-md ${active && "bg-indigo-500 text-white"}`}>
                                            {({ selected }) => (
                                                <div className="flex justify-between items-center">
                                                    <span className={`${selected && "font-bold"}`}>
                                                        {category.field}
                                                    </span>
                                                    {selected ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : null}
                                                </div>
                                            )}
                                        </Listbox.Option>
                                    ))
                                }
                            </Listbox.Options>
                        </div>
                    </Listbox>
                </div>
                <input
                    type="text"
                    className="w-full p-2 mb-6 border-b-2 focus:outline-0 text-6xl font-serif focus:border-indigo-500 focus:transition-all"
                    placeholder="Title"
                    autoFocus={true}
                    {...register("title")}
                />
            </div>
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