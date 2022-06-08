import Navbar from "../../components/Navbar";
import { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import EditorButton from "../../components/EditorButton";

function BlogForm() {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty()
    );

    function handleKeyCommand(command, editorState) {
        const newEditorState = RichUtils.handleKeyCommand(editorState, command);

        if (!newEditorState) {
            return;
        }

        setEditorState(newEditorState);
    }

    function onChangeHandler(editorState) {
        setEditorState(editorState);
    }

    function handleInlineStyle(style) {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    }

    return (
        <>
            <Navbar />
            <div className="container w-2/4 mx-auto p-3 mt-12 bg-slate-100 rounded-md">
                <div className="flex flex-row gap-x-2">
                    <EditorButton
                        handleInlineStyle={handleInlineStyle}
                        buttonName="b"
                        buttonPurpose="BOLD"
                    />
                    <EditorButton
                        handleInlineStyle={handleInlineStyle}
                        buttonName="i"
                        buttonPurpose="ITALIC"
                    />
                    <EditorButton
                        handleInlineStyle={handleInlineStyle}
                        buttonName="u"
                        buttonPurpose="UNDERLINE"
                    />
                </div>

                <Editor
                    editorState={editorState}
                    onChange={onChangeHandler}
                    placeholder="Tell your Story..."
                    handleKeyCommand={handleKeyCommand}
                />
            </div>
        </>
    );
}

export default BlogForm;