import React, { useEffect, useState } from "react";
import { FiMaximize } from "react-icons/fi";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const DescriptionBox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");

  // Load saved content on mount
  useEffect(() => {
    const savedContent = localStorage.getItem("descriptionContent");
    if (savedContent) {
      setDescription(savedContent);
    }
  }, []);

  const handleChange = (value) => {
    const updatedHTML = updateLinks(value);
    setDescription(updatedHTML);
    localStorage.setItem("descriptionContent", updatedHTML);
  };

  const updateLinks = (html) => {
    const urlRegex = /(https?:\/\/[^\s<]+)/g;
    return html.replace(urlRegex, (url) => {
      // Avoid wrapping existing anchor tags
      if (url.startsWith('<a')) return url;
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline font-medium">${url}</a>`;
    });
  };

  const handleClick = (e) => {
    const target = e.target;
    if (target.tagName === "A") {
      e.preventDefault();
      window.open(target.href, "_blank");
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto relative">
      <h2 className="text-xl font-semibold mb-2 flex items-center justify-between">
        Description Box
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-4 p-2 rounded hover:bg-gray-200"
          title="Enlarge"
        >
          <FiMaximize size={20} />
        </button>
      </h2>

      <div onClick={handleClick}>
        <Editor
          value={description}
          onTextChange={(e) => handleChange(e.htmlValue)}
          style={{ height: "200px" }}
        />
      </div>

      {isModalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 backdrop-blur-sm z-40"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white border-4 border-black rounded-lg p-6 w-full max-w-2xl relative z-50">
              <button
                className="absolute top-2 right-2 text-lg font-bold"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
              <h2 className="text-lg font-semibold mb-4">Edit Description</h2>
              <div onClick={handleClick}>
                <Editor
                  value={description}
                  onTextChange={(e) => handleChange(e.htmlValue)}
                  style={{ height: "300px" }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DescriptionBox;
