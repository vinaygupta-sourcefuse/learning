import React, { useEffect, useState } from "react";
import { FiMaximize } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DescriptionBox = () => {
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedContent = localStorage.getItem("descriptionContent");
    if (savedContent) {
      setDescription(savedContent);
    }
  }, []);

  const handleChange = (content) => {
    setDescription(content);
    localStorage.setItem("descriptionContent", content);
  };

  const formats = [
    "size",
    "bold", "italic", "underline", "strike",
    "link",
    "list", "bullet",
    "color", "background"
  ];

  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      ["link"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
    ],
  };

  return (
    <div className="p-4 max-w-2xl mx-auto relative border-3 mt-12">
      {/* Inline style block for custom Quill styling */}
      <style>
        {`
          /* Default editor styling */
          .custom-quill .ql-container {
            height: 300px;
          }

          .custom-quill .ql-editor {
            height: 100%;
            overflow-y: auto;
          }

          /* Modal editor styling */
          .custom-quill-modal .ql-container {
            height: 400px;
          }

          .custom-quill-modal .ql-editor {
            height: 100%;
            overflow-y: auto;
          }
        `}
      </style>

      <h2 className="text-xl font-semibold mb-2 flex items-center justify-between">
        Reminders
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-4 p-2 rounded hover:bg-gray-200"
          title="Enlarge"
        >
          <FiMaximize size={20} />
        </button>
      </h2>

      {!isModalOpen && (
        <ReactQuill
          value={description}
          onChange={handleChange}
          theme="snow"
          modules={modules}
          formats={formats}
          className="custom-quill"
        />
      )}

      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 backdrop-blur-sm z-40"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white border-4 border-black rounded-lg p-6 w-full max-w-2xl relative z-50">
              <button
                className="absolute top-3 right-4 text-lg font-bold"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
              <h2 className="text-lg font-semibold mb-4">Reminders</h2>

              <ReactQuill
                value={description}
                onChange={handleChange}
                theme="snow"
                modules={modules}
                formats={formats}
                className="custom-quill custom-quill-modal"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DescriptionBox;
