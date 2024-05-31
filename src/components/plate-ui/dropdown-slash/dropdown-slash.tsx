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
// import { ELEMENT_EXCALIDRAW } from "@udecode/plate-excalidraw";
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

import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../dropdown-menu/dropdown-menu";
import { ELEMENT_UPLOAD_IMAGE } from "../image-upload/image-upload";
import { ELEMENT_UPLOAD_VIDEO } from "../video-upload/video-upload";
import { ELEMENT_UPLOAD_FILE } from "../file-upload/file-upload";
import { ELEMENT_TODO_LI } from "@udecode/plate-list";
import { ELEMENT_TOGGLE } from "@udecode/plate-toggle";
import { ELEMENT_MATH } from "../math-element/math-element";

const items = [
  {
    label: "Basic blocks",
    items: [
      {
        value: ELEMENT_PARAGRAPH,
        label: "Paragraph",
        description: "Just start writing with plain text.",
        icon: "https://www.notion.so/images/blocks/text/en-US.png",
      },
      {
        value: ELEMENT_H1,
        label: "Heading 1",
        description: "Big section heading.",
        icon: "https://www.notion.so/images/blocks/header.57a7576a.png",
      },
      {
        value: ELEMENT_H2,
        label: "Heading 2",
        description: "Medium section heading.",
        icon: "https://www.notion.so/images/blocks/subheader.9aab4769.png",
      },
      {
        value: ELEMENT_H3,
        label: "Heading 3",
        description: "Small section heading.",
        icon: "https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png",
      },
      {
        value: ELEMENT_BLOCKQUOTE,
        label: "Quote",
        description: "Capture a quote.",
        icon: "https://www.notion.so/images/blocks/quote/en-US.png",
      },
      {
        value: ELEMENT_TABLE,
        label: "Table",
        description: "Add simple tabular content to your page.",
        icon: "https://www.notion.so/images/blocks/simple-table.e31a23bb.png",
      },
      {
        value: "ul",
        label: "Bulleted list",
        description: "Create a simple bulleted list.",
        icon: "https://www.notion.so/images/blocks/bulleted-list.0e87e917.png",
      },
      {
        value: "ol",
        label: "Numbered list",
        description: "Create a list with numbering.",
        icon: "https://www.notion.so/images/blocks/numbered-list.0406affe.png",
      },
      {
        value: ELEMENT_TODO_LI,
        label: "Todo",
        description: "Track tasks with a to-do list.",
        icon: "https://www.notion.so/images/blocks/to-do.f8d20542.png",
      },
      {
        value: ELEMENT_HR,
        label: "Divider",
        description: "Visually divide blocks.",
        icon: "https://www.notion.so/images/blocks/divider.210d0faf.png",
      },
      {
        value: ELEMENT_TOGGLE,
        label: "Toggle",
        description: "Toggles can hide and show content inside.",
        icon: "https://www.notion.so/images/blocks/toggle.5e462b2a.png",
      },
      {
        value: ELEMENT_LINK,
        label: "Link",
        description: "Save a link as a visual bookmark.",
        icon: "https://www.notion.so/images/blocks/web-bookmark.82a15180.png",
      },
    ],
  },
  {
    label: "Media",
    items: [
      {
        value: ELEMENT_UPLOAD_IMAGE,
        label: "Upload image",
        description: "Upload an image from your computer",
        icon: "https://www.notion.so/images/import/import.png",
      },
      {
        value: ELEMENT_UPLOAD_VIDEO,
        label: "Upload video",
        description: "Upload a video from your computer",
        icon: "https://www.notion.so/images/blocks/video.ceeec2c7.png",
      },
      {
        value: ELEMENT_IMAGE,
        label: "Image",
        description: "Embed with a link.",
        icon: "https://www.notion.so/images/blocks/image.33d80a98.png",
      },
      {
        value: ELEMENT_MEDIA_EMBED,
        label: "Embed",
        description: "Embed with a link (video ,social-media posts)",
        icon: "https://www.notion.so/images/blocks/embed.6a481331.png",
      },
      {
        value: ELEMENT_CODE_BLOCK,
        label: "Code",
        description: "Capture a code snippet.",
        icon: "https://www.notion.so/images/blocks/code.a8b201f4.png",
      },
      {
        value: ELEMENT_UPLOAD_FILE,
        label: "Upload file",
        description: "Upload a file  from your computer",
        icon: "https://www.notion.so/images/blocks/file.4fade042.png",
      },
    ],
  },
  {
    label: "Embeds",
    items: [
      // {
      //   value: ELEMENT_EXCALIDRAW,
      //   label: "Excalidraw",
      //   description: "Embed an Excalidraw whiteboard.",
      //   icon: "https://www.notion.so/images/blocks/excalidraw.b2dad901.png",
      // },
      {
        value: ELEMENT_MATH,
        label: "Math",
        description: "Capture Mathematic Operations",
        icon: "https://www.notion.so/images/import/csv.png",
      },
    ],
  },
];

export function DropdownSlash() {
  const editor = useEditorRef();

  return (
    <div className="flex max-h-[400px] min-w-0 flex-col gap-0.5 overflow-y-auto p-1 ">
      {items.map(({ items: nestedItems, label }, index) => (
        <React.Fragment key={label}>
          {index !== 0 && <DropdownMenuSeparator />}

          <DropdownMenuLabel className="text-xs text-gray-500 font-normal">
            {label}
          </DropdownMenuLabel>
          {nestedItems.map(
            ({ value: type, label: itemLabel, icon: Icon, description }) => (
              <div
                key={type}
                className="relative flex gap-2  min-w-[200px] cursor-pointer select-none items-center rounded-sm p-1 text-sm outline-none transition-colors hover:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 "
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
                <img
                  className="w-12 h-12 border border-gray-200 rounded-md"
                  src={Icon}
                  alt="element img"
                />
                <div className="flex flex-col  ">
                  <p>{itemLabel}</p>
                  <p className="text-xs text-gray-500">
                    {description?.length > 36
                      ? `${description?.split(" ").slice(0, 6).join(" ")}...`
                      : description}
                  </p>
                </div>
              </div>
            )
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
