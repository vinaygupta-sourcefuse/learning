# 📄 DescriptionBox Component

A React component that provides a rich text editor for typing and formatting text, with URL support and a modal popup for an enlarged editing experience.

## ✨ Features

* Rich text editing powered by **React Quill**.
* Toolbar with formatting options: font size, bold, italic, underline, strikethrough, links, lists, text/background color.
* URLs are automatically recognized and rendered as clickable links within the editor.
* Links open in a new tab (`target="_blank"`).
* Editable main editor and an enlargable modal editor, both synchronized to the same content.
* Content is saved to and loaded from `localStorage` automatically.
* Modal editor gains focus on open for smooth typing.
* Cleaner and more robust than managing raw `contentEditable` divs.

## 🧠 How It Works

* The component uses React state (`description`) as the **single source of truth** for the content.
* Both the main editor and the modal editor use `<ReactQuill>` components bound to the same `description` state.
* Changes in either editor update `description` and persist the content to `localStorage`.
* React Quill handles all caret management, formatting, and link recognition internally, so no manual DOM manipulation is needed.
* When the modal opens, the editor inside it is automatically focused to ensure the cursor works as expected.
* The toolbar configuration controls which formatting options are available to the user.

## 🎨 Toolbar Configuration

The toolbar includes:

* Font size selector (small, normal, large, huge)
* Bold, italic, underline, strikethrough
* Hyperlink insertion
* Ordered and unordered lists
* Text color and background color pickers

## ⚠️ Notes

* React Quill outputs HTML content which is saved as-is in `localStorage`. When loading, this HTML is directly loaded into the editors.
* The component no longer uses manual regex or innerHTML manipulations — this is now handled internally by Quill.
* Keyboard behaviors such as Enter key, cursor position, and link clicks are handled gracefully by Quill.
* Styling and modal overlay must be handled carefully to avoid interfering with editor focus or keyboard input.
