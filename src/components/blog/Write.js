import { Listbox } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Write() {
    const [saveOption, setSaveOption] = useState("Choose save option");

    const { register, handleSubmit, formState: { errors } } = useForm();

    function submitHandler(data) {
        const blogData = {
            ...data,
            blogSaveAs: saveOption
        }

        console.log(blogData);
    }

    return (
        <form className="container w-2/4 p-3 mx-auto mt-6 rounded-md" onSubmit={handleSubmit(submitHandler)}>
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
                contentEditable
                placeholder="Tell your story..."
                className="w-full h-full focus:outline-none p-2 border-b-2 focus:border-indigo-500 text-lg font-serif resize-none"
                {...register("story")}
            >
            </textarea>
        </form>
    );
}

export default Write;