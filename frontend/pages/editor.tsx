import React, { useEffect, useState } from 'react';
import Editor from "rich-markdown-editor";


export default function editor() {
    const [editorState, setEditorState] = useState({});



    useEffect(() => {
        // Send API call to update note
    }, [editorState]);

    return (
        <div className="editor-container">
            <div className="editor-wrapper">
                    <Editor
                    onChange={setEditorState}
                    defaultValue="Hello."
                    />
            </div>
            <style jsx>
                {`
                .editor-container {
                    margin: 5% 20% 5% 20%;
                    border: 1px solid black;
                    background: white;
                    height: 100%;
                    padding: 2em;
                }

                .editor-wrapper {
                    height: 100%;
                    width: 100%;
                }
                `}
            </style>
        </div>
    )
}
