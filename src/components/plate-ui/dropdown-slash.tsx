import React from "react";
import { ELEMENT_BLOCKQUOTE } from "@udecode/plate-block-quote";

import {
  ELEMENT_CODE_BLOCK,
  insertEmptyCodeBlock,
} from "@udecode/plate-code-block";
import {
  deleteBackward,
  focusEditor,
  insertEmptyElement,
  useEditorRef,
} from "@udecode/plate-common";
import { ELEMENT_EXCALIDRAW } from "@udecode/plate-excalidraw";
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3 } from "@udecode/plate-heading";
import { ELEMENT_HR } from "@udecode/plate-horizontal-rule";
import { toggleIndentList } from "@udecode/plate-indent-list";
import { ELEMENT_LINK, triggerFloatingLink } from "@udecode/plate-link";
import {
  ELEMENT_IMAGE,
  ELEMENT_MEDIA_EMBED,
  insertMedia,
} from "@udecode/plate-media";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import { ELEMENT_TABLE, insertTable } from "@udecode/plate-table";

import { Icons } from "../icons";

import { DropdownMenuLabel, DropdownMenuSeparator } from "./dropdown-menu";
import { ELEMENT_UPLOAD_IMAGE } from "./image-upload";
import { ELEMENT_UPLOAD_VIDEO } from "./video-upload";
import { ELEMENT_UPLOAD_FILE } from "./file-upload";

const items = [
  {
    label: "Basic blocks",
    items: [
      {
        value: ELEMENT_PARAGRAPH,
        label: "Paragraph",
        description: "Paragraph",
        icon: Icons.paragraph,
      },
      {
        value: ELEMENT_H1,
        label: "Heading 1",
        description: "Heading 1",
        icon: Icons.h1,
      },
      {
        value: ELEMENT_H2,
        label: "Heading 2",
        description: "Heading 2",
        icon: Icons.h2,
      },
      {
        value: ELEMENT_H3,
        label: "Heading 3",
        description: "Heading 3",
        icon: Icons.h3,
      },
      {
        value: ELEMENT_BLOCKQUOTE,
        label: "Quote",
        description: "Quote (⌘+⇧+.)",
        icon: Icons.blockquote,
      },
      {
        value: ELEMENT_TABLE,
        label: "Table",
        description: "Table",
        icon: Icons.table,
      },
      {
        value: "ul",
        label: "Bulleted list",
        description: "Bulleted list",
        icon: Icons.ul,
      },
      {
        value: "ol",
        label: "Numbered list",
        description: "Numbered list",
        icon: Icons.ol,
      },
      {
        value: ELEMENT_HR,
        label: "Divider",
        description: "Divider (---)",
        icon: Icons.minus,
      },
    ],
  },
  {
    label: "Media",
    items: [
      {
        value: ELEMENT_UPLOAD_FILE,
        label: "Uplaod files",
        description: "Upload a file  from your computer",
        icon: Icons.add,
      },
      {
        value: ELEMENT_UPLOAD_IMAGE,
        label: "Uplaod Image",
        description: "Upload an image from your computer",
        icon: Icons.add,
      },
      {
        value: ELEMENT_UPLOAD_VIDEO,
        label: "Uplaod Video",
        description: "Upload a video from your computer",
        icon: Icons.add,
      },
      {
        value: ELEMENT_CODE_BLOCK,
        label: "Code",
        description: "Code (```)",
        icon: Icons.codeblock,
      },
      {
        value: ELEMENT_IMAGE,
        label: "Image",
        description: "Image",
        icon: Icons.image,
      },
      {
        value: ELEMENT_MEDIA_EMBED,
        label: "Embed",
        description: "Embed",
        icon: Icons.embed,
      },
      {
        value: ELEMENT_EXCALIDRAW,
        label: "Excalidraw",
        description: "Excalidraw",
        icon: Icons.excalidraw,
      },
    ],
  },
  {
    label: "Inline",
    items: [
      {
        value: ELEMENT_LINK,
        label: "Link",
        description: "Link",
        icon: Icons.link,
      },
    ],
  },
];

export function DropdownSlash() {
  const editor = useEditorRef();

  return (
    <div className="flex max-h-[500px] min-w-0 flex-col gap-0.5 overflow-y-auto ">
      {items.map(({ items: nestedItems, label }, index) => (
        <React.Fragment key={label}>
          {index !== 0 && <DropdownMenuSeparator />}

          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          {nestedItems.map(({ value: type, label: itemLabel, icon: Icon }) => (
            <div
              key={type}
              className="relative flex h-9 min-w-[200px] cursor-pointer select-none items-center rounded-sm p-2 text-sm outline-none transition-colors hover:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 "
              onClick={async () => {
                deleteBackward(editor, { unit: "character" });

                switch (type) {
                  case ELEMENT_CODE_BLOCK: {
                    insertEmptyCodeBlock(editor);

                    break;
                  }
                  case ELEMENT_IMAGE: {
                    await insertMedia(editor, { type: ELEMENT_IMAGE });

                    break;
                  }
                  case ELEMENT_MEDIA_EMBED: {
                    await insertMedia(editor, {
                      type: ELEMENT_MEDIA_EMBED,
                    });

                    break;
                  }
                  case "ul":
                  case "ol": {
                    insertEmptyElement(editor, ELEMENT_PARAGRAPH, {
                      select: true,
                      nextBlock: true,
                    });
                    toggleIndentList(editor, {
                      listStyleType: type === "ul" ? "disc" : "decimal",
                    });

                    break;
                  }
                  case ELEMENT_TABLE: {
                    insertTable(editor);

                    break;
                  }
                  case ELEMENT_LINK: {
                    await triggerFloatingLink(editor, { focused: true });

                    break;
                  }
                  default: {
                    insertEmptyElement(editor, type, {
                      select: true,
                      nextBlock: true,
                    });
                  }
                }
                focusEditor(editor);
              }}
            >
              <Icon className="mr-2 size-5" />
              {itemLabel}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
