import { useEffect, useState } from "react";
import Editor from "rich-markdown-editor";

export default function TextEditor(props) {
    const [editorState, setEditorState] = useState('');

    return (
        <div className="editor-container">
            <button onClick={()=> props.saveNote(editorState)}>Save</button>
            <div className="editor-wrapper">
      
                    <Editor
                    onChange={setEditorState}
                    defaultValue={props.content}
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