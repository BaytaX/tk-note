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

| Prop            | Type               | Default Value | Description                                       |
| --------------- | ------------------ | ------------- | ------------------------------------------------- |
| onChange        | `(e: any) => void` | -             | Callback function triggered when content changes. |
| initialValue    | `any`              | -             | The initial value/content of the editor.          |
| readOnly        | `boolean`          | `false`       | Determines if the editor is in read-only mode.    |
| editorClassName | `string`           | -             | CSS class to apply to the editor component.       |

## Example

```jsx
import React from "react";

import { SoftyNote } from "tk-note";

function YourComponent() {
  const initialValue = [
    {
      type: "p",
      children: [
        {
          text: " ",
        },
      ],
    },
  ];
  return (
    <div>
      <SoftyNote
        onChange={(e) => console.log(e)}
        initialValue={initialValue}
        readOnly={false}
        editorClassName="px-[96px]"
      />
    </div>
  );
}
```

## License

MIT © [thabeut](https://github.com/BaytaX)
