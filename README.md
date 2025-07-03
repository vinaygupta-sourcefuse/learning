# 📄 DescriptionBox Component

A React component that provides a content-editable text box where users can type or paste text. URLs in the input are automatically converted into clickable hyperlinks, styled with blue color and underline.

## ✨ Features

* Editable text box using `contentEditable`.
* Auto-detection and conversion of URLs into clickable links.
* URLs open in a new tab (`target="_blank"`).
* Maintains cursor position at the end after every input.

## 🧠 How It Works

* The component uses `useRef` to gain access to the DOM node of the editable `div`.
* On every input (`onInput`), it scans for URLs using a regex and wraps them with an `<a>` tag.
* `placeCaretAtEnd()` ensures the cursor remains at the end of the text box after links are added.

### URL Regex Used

```js
const urlRegex = /(https?:\/\/[^\s]+)/g;
```

This regex matches any string that starts with `http://` or `https://` and is followed by non-whitespace characters.

## ⚠️ Notes

* The component does a full innerText-to-innerHTML conversion on each input. This could potentially remove complex formatting if added.
* `contentEditable` elements are inherently tricky for state management; consider limitations for larger-scale apps.
