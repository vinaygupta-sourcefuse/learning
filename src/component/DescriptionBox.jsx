import React, { useEffect, useRef, useState } from "react";
import { FiMaximize } from "react-icons/fi";

const DescriptionBox = () => {
  const divRef = useRef(null);
  const modalDivRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");

  // Load saved content when mounted
  useEffect(() => {
    const savedContent = localStorage.getItem("descriptionContent");
    if (savedContent && divRef.current) {
      setDescription(savedContent);
      divRef.current.innerHTML = savedContent;
    }
  }, []);

  const handleInput = () => {
    updateLinks();
    saveContent();
  };

  const handleModalInput = () => {
    updateLinks(modalDivRef);
    saveContent(modalDivRef);
    console.log('modalDivRef.current.innerHTML', modalDivRef.current.innerHTML)
  };

  const updateLinks = (ref = divRef) => {
    const div = ref.current;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let html = div.innerText.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline font-medium">${url}</a>`;
    });
    div.innerHTML = html;
    placeCaretAtEnd(div);
  };

  const placeCaretAtEnd = (el) => {
    el.focus();
    if (
      typeof window.getSelection !== "undefined" &&
      typeof document.createRange !== "undefined"
    ) {
      let range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      let sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  const saveContent = (ref = divRef) => {
    const div = ref.current;
    localStorage.setItem("descriptionContent", div.innerHTML);
    if (ref === divRef && modalDivRef.current) {
      modalDivRef.current.innerHTML = div.innerHTML;
    }
    if (ref === modalDivRef && divRef.current) {
      divRef.current.innerHTML = div.innerHTML;
    }
  };

  const handleClick = (e) => {
    const target = e.target;
    if (target.tagName === "A") {
      e.preventDefault();
      window.open(target.href, "_blank");
    }
  };

  const handleModalClick = (e) => {
    const target = e.target;
    if (target.tagName === "A") {
      e.preventDefault();
      window.open(target.href, "_blank");
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto relative">
      <style>
        {`
          [contenteditable] a {
            cursor: pointer;
          }
        `}
      </style>

      <h2 className="text-xl font-semibold mb-2 flex items-center justify-between">
        Description Box
        <button
          onClick={() => {
            const savedContent = localStorage.getItem("descriptionContent");
            console.log('savedContent', savedContent)
            if (modalDivRef.current) {
              modalDivRef.current.innerHTML = savedContent;
              console.log('modalDivRef.current.innerHTML', modalDivRef.current.innerHTML)
            }
            setIsModalOpen(true);
          }}
          className="ml-4 p-2 rounded hover:bg-gray-200"
          title="Enlarge"
        >
          <FiMaximize size={20} />
        </button>
      </h2>

      <div
        ref={divRef}
        contentEditable
        onInput={handleInput}
        onClick={handleClick}
        className="min-h-[100px] border border-gray-300 p-3 text-base whitespace-pre-wrap outline-none rounded-md focus:ring-2 focus:ring-blue-400"
      ></div>

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
              <div
                ref={modalDivRef}
                contentEditable
                onInput={handleModalInput}
                onClick={handleModalClick}
                className="min-h-[200px] border border-gray-400 p-4 text-base whitespace-pre-wrap outline-none rounded-md focus:ring-2 focus:ring-blue-400"
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DescriptionBox;
