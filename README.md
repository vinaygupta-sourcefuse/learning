## 📄 **Remainders —

### ✅ **Purpose**

The `Remainders` component is a reusable rich-text editor powered by **ReactQuill**, with:

* **Automatic saving to `localStorage`**
* A **modal popup** for full-screen editing
* A single shared state (`description`) to keep content in sync
* Common formatting options (size, bold, italic, lists, colors, links)

---

### ✅ **Key Features**

1. Uses **ReactQuill** for a robust, WYSIWYG rich text editor.
2. Saves content instantly to `localStorage` on every edit.
3. Opens in an **enlarged modal** when the user clicks the maximize icon.
4. Avoids duplicate Quill instance bugs by mounting **only one editor at a time**.
5. Clean and minimal — no external CSS beyond Quill’s own.

---

### ✅ **Installation Requirements**

Install Quill and ReactQuill:

```bash
npm install react-quill
# or
yarn add react-quill
```

Make sure to import the Quill stylesheet **once**, usually in your component or root `index.js`:

```js
import 'react-quill/dist/quill.snow.css';
```

---

### ✅ **Best Practices**

* Use **only one editor instance** at a time to prevent **Delta sync issues**.
* Save your content in **HTML** — Quill’s format — or convert it on the backend if you need plain text.
* Quill handles newlines, links, and formatting. No need for manual `contentEditable` tweaks.

---

### ✅ **Gotchas**

* Don’t manually update `innerHTML` — always update via the `description` state.
* If you need more advanced link behavior (e.g., always open in a new tab with `rel`), add Quill custom modules or handle on your backend.
* This component is **self-contained** — no external CSS is required other than Quill’s.
