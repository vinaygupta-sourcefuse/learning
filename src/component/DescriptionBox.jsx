import React, { useEffect, useRef } from "react";

const DescriptionBox = () => {
  
  const divRef = useRef(null); // useRef to get a reference to the contentEditable div

  // On mount, load saved content from localStorage
  useEffect(() => {
    const savedContent = localStorage.getItem("descriptionContent");

    if (savedContent && divRef.current) {
      divRef.current.innerHTML = savedContent;
    }
  }, []);

  const handleInput = () => {
    updateLinks();
    saveContent();
  };

  const updateLinks = () => {
    const div = divRef.current;  // this will point to actual DOM node when mounted
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let html = div.innerText.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" class="text-blue-600 underline font-medium">${url}</a>`;
    });
    div.innerHTML = html;
    placeCaretAtEnd(div); // this will place the caret at the end of the contentEditable div
  };

  const placeCaretAtEnd = (el) => {
    el.focus();
    if (
      typeof window.getSelection != "undefined" &&
      typeof document.createRange != "undefined"
    ) {
      let range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      let sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  const saveContent = () => {
    const div = divRef.current;
    localStorage.setItem("descriptionContent", div.innerHTML);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Description Box with Inline Clickable Links</h2>
      <div
        ref={divRef}
        contentEditable  // this will allow us to make the div editable
        onInput={handleInput}
         className="min-h-[100px] border border-gray-300 p-3 text-base whitespace-pre-wrap outline-none rounded-md focus:ring-2 focus:ring-blue-400"
      ></div>
    </div>
  );
};

export default DescriptionBox;
