import { useState } from "react";

function EditorButton({ buttonName, handleInlineStyle, buttonPurpose }) {
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    return (
        <button
            onClick={() => {
                handleInlineStyle(buttonPurpose);
                setIsButtonClicked(prevIsButtonClicked => !prevIsButtonClicked);
            }}
            className={`border border-1 border-slate-500 py-1 px-2 mb-3 rounded-md hover:bg-slate-200 ${isButtonClicked && "bg-indigo-300"}`}
        >
            {buttonName}
        </button>
    );
}

export default EditorButton;