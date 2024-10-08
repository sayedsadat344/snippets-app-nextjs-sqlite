"use client";

import { useState } from "react";
import CodeMirror, { EditorState } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView, ViewUpdate } from "@codemirror/view";
import * as actions from "@/actions";
import { Snippet } from "@prisma/client";


const simpleTheme = EditorView.theme({
  "&": {
    backgroundColor: "#f8f8f8",
    color: "#333",
  },
  ".cm-content": {
    caretColor: "#000",
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#000",
  },
});

interface SnippetEdit {
  snippet: Snippet | null;
}




export default function NewSnippetForm({ snippet }: SnippetEdit) {

 


  const [title, setTitle] = useState(snippet?.title || "");
  const [code, setCode] = useState(snippet?.code || "");
  const [error, setError] = useState<string | null>(null); 

  const formData ={title,code}

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 

    try {
      if (snippet) {
        await actions.editSnippet(snippet.id, formData); 
      } else {
        await actions.addSnippet(formData); 
      }
    } catch (err: any) {
      setError(err.message); // Set error message if an error occurs
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {error && ( // Display error message if exists
        <div className="text-red-500 mb-2">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="title" className="block mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded text-blue-800"
          required
        />
      </div>
      <div>
        <label htmlFor="code" className="block mb-2">
          Code
        </label>
        <CodeMirror
          value={code}
          onChange={(value) => setCode(value)}
          extensions={[javascript(), simpleTheme]}
          className="border rounded overflow-hidden"
          height="200px"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {snippet ? "Update Snippet" : "Save Snippet"}
      </button>
    </form>
  );
}
