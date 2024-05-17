# Rich Text Editor

## Install

```bash
npm install tk-note
```

## Usage

```jsx
import React from "react";

import { SoftyNote } from "tk-note";

function YourComponent() {
  return (
    <div>
      <SoftyNote />
    </div>
  );
}
```

## Props

### `<SoftyNote />`

| Prop                        | Type                   | Default Value | Description                                                                                                                                                                              |
| --------------------------- | ---------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onChange`                  | `(e: any) => void`     | -             | Callback function triggered when content changes.                                                                                                                                        |
| `initialValue`              | `any`                  | -             | The initial value/content of the editor.                                                                                                                                                 |
| `readOnly`                  | `boolean`              | `false`       | Determines if the editor is in read-only mode.                                                                                                                                           |
| `editorClassName`           | `string`               | -             | CSS class to apply to the editor component.                                                                                                                                              |
| `onUpload`                  | `(file: File) => void` | -             | Handles the upload of files and returns the URL of the uploaded file.                                                                                                                    |
| `MentionComponentItem`      | `({ item }) => any`    | -             | Component for rendering items in the mention component list. Receives `item` containing `text`, `link`, `key`, and `avatar`.                                                             |
| `MentionablesArr`           | `TComboboxItem[]`      | -             | Array containing the objects of mentionables.                                                                                                                                            |
| `mentionComponentClassName` | `string`               | -             | CSS class to apply to the mention component.                                                                                                                                             |
| `slashComponentClassName`   | `string`               | -             | CSS class to apply to the slash component.                                                                                                                                               |
| `slashItemClassName`        | `string`               | -             | CSS class to apply to each item in the slash component list.                                                                                                                             |
| `SlashArr`                  | `TSlashArr[]`          | -             | Array of objects to overwrite the title, description, or image of slash list items. Each object should contain the `key` of the element and the properties to overwrite.(keys are below) |

### Example Usage

```jsx
import React, { useState } from "react";
import { SoftyNote, P_KEY } from "tk-note";

function App() {
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleUpload = (file) => {
    // Handle file upload and return the URL
  };

  const mentionables = [
    {
      text: "John Doe",
      link: "https://example.com/johndoe",
      key: "1",
      avatar: "https://example.com/avatar1.png",
    },
    // more mentionables...
  ];

  const SlashArr = [
    {
      key: P_KEY,
      text: "فقرة",
      description: "ابدأ الكتابة بنص عادي.",
    },
  ];

  const MentionItem = ({ item }) => (
    <div className="flex items-center space-x-2">
      <img className="w-8 h-8 rounded-full" src={item.avatar} alt={item.text} />
      <a className="text-blue-500 hover:underline" href={item.link}>
        {item.text}
      </a>
    </div>
  );

  return (
    <div>
      <SoftyNote
        onChange={handleChange}
        initialValue={content}
        readOnly={false}
        editorClassName="px-[96px] border border-gray-300 "
        onUpload={handleUpload}
        MentionComponentItem={MentionItem}
        MentionablesArr={mentionables}
        mentionComponentClassName=" "
        slashComponentClassName=" "
        slashItemClassName=" "
        SlashArr={SlashArr}
      />
    </div>
  );
}

export default App;
```

### Prop Descriptions

- **`onChange`**: This prop takes a function that is triggered whenever the content of the editor changes. The function receives an event object as its argument.
- **`initialValue`**: This is the initial content of the editor.
- **`readOnly`**: A boolean prop that, when set to `true`, makes the editor read-only. By default, it is set to `false`, allowing content to be edited.
- **`editorClassName`**: This prop allows you to pass a custom CSS class name to the editor component, making it easy to apply custom styles.
- **`onUpload`**: This prop takes a function that handles the upload of files. The function receives a `file` object and should return the URL of the uploaded file.By default,files will be uploaded in cloudinary and everything works well.
- **`MentionComponentItem`**: A component used to render items in the mention component list. It receives an `item` containing `text`, `key`,`link`(optional), and `avatar`(optional) (MentionComponent is called when typing @ ).
- **`MentionablesArr`**: An array containing objects for mentionables .
- **`mentionComponentClassName`**: A CSS class name to apply to the mention component.
- **`SlashArr`**: An array of objects to customize the title, description, or image of slash list items in the `<SoftyNote />` component. Each object in the array should contain the `key` of the slash list item to be customized, along with the properties to be overwritten, such as `title`, `description`, and `img`. This prop is useful for users who need to tailor the appearance of specific slash list items to better fit their application's requirements.
- **`slashComponentClassName`**: A CSS class name to apply to the slash component.
- **`slashItemClassName`**: A CSS class name to apply to each item in the slash component list.

#### KEYS

P_KEY
H1_KEY
H2_KEY
H3_KEY
BLOCKQUOTE_KEY
TABLE_KEY
DISC_KEY
DECIMAL_KEY
TODO_KEY
HR_KEY
TOGGLE_KEY
LINK_KEY
UPLOAD_IMAGE_KEY
UPLOAD_VIDEO_KEY
IMAGE_KEY
MEDIA_EMBED_KEY
CODE_BLOCK_KEY
UPLOAD_FILE_KEY
EXCALIDRAW_KEY
INSERT_MATH_KEY

##### License

MIT © [thabeut](https://github.com/BaytaX)
