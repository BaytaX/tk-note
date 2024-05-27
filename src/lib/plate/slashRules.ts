import { PlateEditor, toggleNodeType } from "@udecode/plate-core";
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3 } from "@udecode/plate-heading";
import { ListStyleType, toggleIndentList } from "@udecode/plate-indent-list";
import { focusEditor } from "@udecode/slate-react";
import { SlashRule } from "./plate-types";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import { ELEMENT_BLOCKQUOTE } from "@udecode/plate-block-quote";
import { ELEMENT_TABLE, insertTable } from "@udecode/plate-table";
import { ELEMENT_TODO_LI } from "@udecode/plate-list";
import { ELEMENT_HR } from "@udecode/plate-horizontal-rule";
import { ELEMENT_TOGGLE } from "@udecode/plate-toggle";
import { ELEMENT_LINK, triggerFloatingLink } from "@udecode/plate-link";
import { ELEMENT_UPLOAD_IMAGE } from "../../components/plate-ui/image-upload/image-upload";
import { ELEMENT_UPLOAD_VIDEO } from "../../components/plate-ui/video-upload/video-upload";
import {
  ELEMENT_IMAGE,
  ELEMENT_MEDIA_EMBED,
  insertMedia,
} from "@udecode/plate-media";
import {
  ELEMENT_CODE_BLOCK,
  insertEmptyCodeBlock,
} from "@udecode/plate-code-block";
import { ELEMENT_UPLOAD_FILE } from "../../components/plate-ui/file-upload/file-upload";
import { ELEMENT_EXCALIDRAW } from "@udecode/plate-excalidraw";
import { ELEMENT_MATH } from "../../components/plate-ui/math-element/math-element";
import { insertEmptyElement } from "@udecode/plate-common";

export const SLASH_RULES: SlashRule[] = [
  {
    key: ELEMENT_PARAGRAPH,
    text: "Paragraph",
    description: "Just start writing with plain text.",
    img: "https://www.notion.so/images/blocks/text/en-US.png",
    onTrigger(editor: PlateEditor) {
      insertEmptyElement(editor, ELEMENT_PARAGRAPH, {
        select: true,
      });
      focusEditor(editor);
    },
    blocksName: "Basic Blocks",
  },
  {
    key: ELEMENT_H1,
    text: "Heading 1",
    description: "Big section heading.",
    img: "https://www.notion.so/images/blocks/header.57a7576a.png",
    onTrigger(editor: PlateEditor) {
      toggleNodeType(editor, { activeType: ELEMENT_H1 });
      focusEditor(editor);
    },
    blocksName: "Basic Blocks",
  },
  {
    key: ELEMENT_H2,
    text: "Heading 2",
    description: "Medium section heading.",
    img: "https://www.notion.so/images/blocks/subheader.9aab4769.png",
    onTrigger(editor: PlateEditor) {
      toggleNodeType(editor, { activeType: ELEMENT_H2 });
      focusEditor(editor);
    },
    blocksName: "Basic Blocks",
  },
  {
    key: ELEMENT_H3,
    text: "Heading 3",
    description: "Small section heading.",
    img: "https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png",
    onTrigger(editor: PlateEditor) {
      toggleNodeType(editor, { activeType: ELEMENT_H3 });
      focusEditor(editor);
    },
    blocksName: "Basic Blocks",
  },
  {
    key: ELEMENT_BLOCKQUOTE,
    text: "Quote",
    description: "Capture a quote.",
    img: "https://www.notion.so/images/blocks/quote/en-US.png",
    onTrigger(editor: PlateEditor) {
      toggleNodeType(editor, { activeType: ELEMENT_BLOCKQUOTE });
      focusEditor(editor);
    },
    blocksName: "Basic Blocks",
  },
  {
    key: ELEMENT_TABLE,
    text: "Table",
    description: "Add simple tabular content to your page.",
    img: "https://www.notion.so/images/blocks/simple-table.e31a23bb.png",
    onTrigger(editor: PlateEditor) {
      insertTable(editor);
    },
    blocksName: "Basic Blocks",
  },
  {
    key: ListStyleType.Disc,
    text: "Bulleted list",
    description: "Create a simple bulleted list.",
    img: "https://www.notion.so/images/blocks/bulleted-list.0e87e917.png",
    onTrigger(editor: PlateEditor) {
      toggleIndentList(editor, {
        listStyleType: ListStyleType.Disc,
      });
      focusEditor(editor);
    },
    blocksName: "Basic Blocks",
  },
  {
    key: ListStyleType.Decimal,
    text: "Numbered list",
    description: "Create a list with numbering.",
    img: "https://www.notion.so/images/blocks/numbered-list.0406affe.png",
    onTrigger(editor: PlateEditor) {
      toggleIndentList(editor, {
        listStyleType: ListStyleType.Decimal,
      });
      focusEditor(editor);
    },
    blocksName: "Basic Blocks",
  },
  {
    key: ELEMENT_TODO_LI,
    text: "Todo",
    description: "Track tasks with a to-do list.",
    img: "https://www.notion.so/images/blocks/to-do.f8d20542.png",
    onTrigger(editor: PlateEditor) {
      insertEmptyElement(editor, ELEMENT_TODO_LI, {
        select: true,
        nextBlock: true,
      });
    },
    blocksName: "Basic Blocks",
  },
  {
    key: ELEMENT_HR,
    text: "Divider",
    description: "Visually divide blocks.",
    img: "https://www.notion.so/images/blocks/divider.210d0faf.png",
    onTrigger(editor: PlateEditor) {
      insertEmptyElement(editor, ELEMENT_HR, {
        select: true,
        nextBlock: true,
      });
      focusEditor(editor);
    },
    blocksName: "Basic Blocks",
  },
  {
    key: ELEMENT_TOGGLE,
    text: "Toggle",
    description: "Toggles can hide and show content inside.",
    img: "https://www.notion.so/images/blocks/toggle.5e462b2a.png",
    onTrigger(editor: PlateEditor) {
      insertEmptyElement(editor, ELEMENT_TOGGLE, {
        select: true,
        nextBlock: true,
      });
      focusEditor(editor);
    },
    blocksName: "Basic Blocks",
  },
  {
    key: ELEMENT_LINK,
    text: "Link",
    description: "Save a link as a visual bookmark.",
    img: "https://www.notion.so/images/blocks/web-bookmark.82a15180.png",
    onTrigger(editor: PlateEditor) {
      triggerFloatingLink(editor, { focused: true });
    },
    blocksName: "Basic Blocks",
  },
  //media
  {
    key: ELEMENT_UPLOAD_IMAGE,
    text: "Upload image",
    description: "Upload an image from your computer",
    img: "https://res.cloudinary.com/df4jaqtep/image/upload/v1715854685/uplaod_azqpli.png",
    onTrigger(editor: PlateEditor) {
      insertEmptyElement(editor, ELEMENT_UPLOAD_IMAGE);
      focusEditor(editor);
    },
    blocksName: "Media",
  },
  {
    key: ELEMENT_UPLOAD_VIDEO,
    text: "Upload video",
    description: "Upload a video from your computer",
    img: "https://www.notion.so/images/blocks/video.ceeec2c7.png",
    onTrigger(editor: PlateEditor) {
      insertEmptyElement(editor, ELEMENT_UPLOAD_VIDEO);
      focusEditor(editor);
    },
    blocksName: "Media",
  },
  {
    key: ELEMENT_IMAGE,
    text: "Image",
    description: "Embed with a link.",
    img: "https://m.media-amazon.com/images/I/81Ow+8sxGFL._AC_UF1000,1000_QL80_.jpg",
    onTrigger(editor: PlateEditor) {
      insertMedia(editor, { type: ELEMENT_IMAGE });
      focusEditor(editor);
    },
    blocksName: "Media",
  },
  {
    key: ELEMENT_MEDIA_EMBED,
    text: "Embed",
    description: "Embed with a link (video ,social-media posts)",
    img: "https://www.notion.so/images/blocks/embed.6a481331.png",
    onTrigger(editor: PlateEditor) {
      insertMedia(editor, {
        type: ELEMENT_MEDIA_EMBED,
      });
      focusEditor(editor);
    },
    blocksName: "Media",
  },
  {
    key: ELEMENT_CODE_BLOCK,
    text: "Code",
    description: "Capture a code snippet.",
    img: "https://www.notion.so/images/blocks/code.a8b201f4.png",
    onTrigger(editor: PlateEditor) {
      insertEmptyCodeBlock(editor);
      focusEditor(editor);
    },
    blocksName: "Media",
  },
  {
    key: ELEMENT_UPLOAD_FILE,
    text: "Upload file",
    description: "Upload a file  from your computer",
    img: "https://www.notion.so/images/blocks/file.4fade042.png",
    onTrigger(editor: PlateEditor) {
      insertEmptyElement(editor, ELEMENT_UPLOAD_FILE);
      focusEditor(editor);
    },
    blocksName: "Media",
  },
  {
    key: ELEMENT_EXCALIDRAW,
    text: "Excalidraw",
    description: "Embed an Excalidraw whiteboard.",
    img: "https://www.notion.so/images/blocks/excalidraw.b2dad901.png",
    onTrigger(editor: PlateEditor) {
      insertEmptyElement(editor, ELEMENT_EXCALIDRAW);
      focusEditor(editor);
    },
    blocksName: "Embeds",
  },
  {
    key: ELEMENT_MATH,
    text: "Math",
    description: "Capture Mathematic Operations",
    img: "https://www.notion.so/images/import/csv.png",
    onTrigger(editor: PlateEditor) {
      insertEmptyElement(editor, ELEMENT_MATH);
      focusEditor(editor);
    },
    blocksName: "Embeds",
  },
];
