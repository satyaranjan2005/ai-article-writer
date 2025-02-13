import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const App = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const editorRef = useRef(null);

  const generateArticle = async () => {
    if (!title) return alert("Please enter a title!");
    setLoading1(true);

    try {
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.article);
      animateTyping(editorRef.current, data.article);
    } catch (error) {
      console.error("Error generating article:", error);
      alert("Error generating article. Please try again.");
    } finally {
      setLoading1(false);
    }
  };

  const optimizeArticle = async () => {
    if (!content) return alert("No content to optimize!");
    setLoading2(true);

    try {
      const response = await fetch("http://localhost:5000/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      eraseTyping(editorRef.current, data.optimizedArticle);
    } catch (error) {
      console.error("Error optimizing article:", error);
      alert("Error optimizing article. Please try again.");
    } finally {
      setLoading2(false);
    }
  };

  // Typing animation
  const animateTyping = (editor, text) => {
    let index = 0;
    editor.setContent(""); // Clear editor content

    const interval = setInterval(() => {
      const currentContent = editor.getContent({ format: "html" });
      const partialContent = text.slice(0, index + 1); // Take HTML substring
      editor.setContent(partialContent);
      index++;

      if (index === text.length) {
        clearInterval(interval);
      }

      // Scroll to the bottom
      editor.selection.select(editor.getBody(), true);
      editor.selection.collapse(false);
      editor.getWin().scrollTo(0, editor.getDoc().body.scrollHeight);
    }, 10); // Adjust typing speed here
  };

  const eraseTyping = (editor, html) => {
    let index = editor.getContent({ format: 'html' }).length;

    const eraseInterval = setInterval(() => {
        const currentContent = editor.getContent({ format: 'html' });
        const partialContent = currentContent.slice(0, index - 1);
        editor.setContent(partialContent);
        index--;

        if (index <= 0) {
            clearInterval(eraseInterval);

            let newIndex = 0;
            const typeInterval = setInterval(() => {
                const partialNewContent = html.slice(0, newIndex + 1);
                editor.setContent(partialNewContent);
                newIndex++;

                if (newIndex === html.length) {
                    clearInterval(typeInterval);
                }
            }, 10); // Typing speed in milliseconds
        }
    }, 5); // Erasing speed in milliseconds
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#141414]">
      <div className="w-3xl mx-auto p-6 bg-[#282828] shadow-md rounded-lg">
        <h1 className="text-2xl text-[#ffffff] font-bold mb-4 text-center">
          AI Article Writer
        </h1>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter article title..."
          className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-[#3c3c3c] text-[#ffffff] placeholder-white-500"
        />

        <div className="flex space-x-4 mb-4 justify-center">
          <button
            onClick={generateArticle}
            disabled={loading1}
            className="px-4 py-2 bg-[#3c3c3c] text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading1 ? "Generating..." : "Submit"}
          </button>

          <button
            onClick={optimizeArticle}
            disabled={loading2 || !content}
            className="text-white px-4 py-2 bg-[#3c3c3c]  rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading2 ? "Optimizing..." : "Optimize"}
          </button>
        </div>
        {!title && <p className="text-white text-center mb-4">Please enter a title to generate an article.</p>}

        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          apiKey= {import.meta.env.VITE_TINYMCE_API_KEY} // Replace with your TinyMCE API key
          init={{
            height: 300,
            menubar: false,
            plugins: ["lists link image code"],
            toolbar:
              "undo redo | bold italic | bullist numlist outdent indent | code",
          }}
          value={content}
          onEditorChange={(newContent) => setContent(newContent)}
        />
      </div>
    </div>
  );
};

export default App;
