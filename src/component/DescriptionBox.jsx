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
      return `<a href="${url}" target="_blank" style="color: blue; text-decoration: underline;" contenteditable="false">${url}</a>`;
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
    <div className="App">
      <h2>Description Box with Inline Clickable Links</h2>
      <div
        ref={divRef}
        contentEditable  // this will allow us to make the div editable
        onInput={handleInput}
        style={{
          minHeight: "100px",
          border: "1px solid #ccc",
          padding: "10px",
          whiteSpace: "pre-wrap",
        }}
      ></div>
    </div>
  );
};

export default DescriptionBox;
