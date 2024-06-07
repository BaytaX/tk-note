import { withProps } from "@udecode/cn";
import { createAlignPlugin } from "@udecode/plate-alignment";
import { createAutoformatPlugin } from "@udecode/plate-autoformat";
import {
  createBoldPlugin,
  createCodePlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createUnderlinePlugin,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import {
  createBlockquotePlugin,
  ELEMENT_BLOCKQUOTE,
} from "@udecode/plate-block-quote";
import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from "@udecode/plate-break";
import { createCaptionPlugin } from "@udecode/plate-caption";
import {
  createSlashPlugin,
  ELEMENT_SLASH_INPUT,
} from "@udecode/plate-slash-command";
import {
  createCodeBlockPlugin,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_CODE_SYNTAX,
  isCodeBlockEmpty,
  isSelectionAtCodeBlockStart,
  unwrapCodeBlock,
} from "@udecode/plate-code-block";
import { createComboboxPlugin } from "@udecode/plate-combobox";
import { createCommentsPlugin, MARK_COMMENT } from "@udecode/plate-comments";
import {
  createPlugins,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  PlateElement,
  PlateLeaf,
  RenderAfterEditable,
  someNode,
} from "@udecode/plate-common";
import { createDndPlugin } from "@udecode/plate-dnd";
import { createEmojiPlugin } from "@udecode/plate-emoji";
import {
  createFontBackgroundColorPlugin,
  createFontColorPlugin,
  createFontSizePlugin,
} from "@udecode/plate-font";
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  KEYS_HEADING,
} from "@udecode/plate-heading";
import {
  createHighlightPlugin,
  MARK_HIGHLIGHT,
} from "@udecode/plate-highlight";
import {
  createHorizontalRulePlugin,
  ELEMENT_HR,
} from "@udecode/plate-horizontal-rule";
import { createIndentPlugin } from "@udecode/plate-indent";
import {
  createIndentListPlugin,
  KEY_LIST_STYLE_TYPE,
} from "@udecode/plate-indent-list";
import { createJuicePlugin } from "@udecode/plate-juice";
import { createKbdPlugin, MARK_KBD } from "@udecode/plate-kbd";
import { createLineHeightPlugin } from "@udecode/plate-line-height";
import { createLinkPlugin, ELEMENT_LINK } from "@udecode/plate-link";
import {
  createTodoListPlugin,
  ELEMENT_LI,
  ELEMENT_OL,
  ELEMENT_TODO_LI,
  ELEMENT_UL,
} from "@udecode/plate-list";
import {
  createImagePlugin,
  createMediaEmbedPlugin,
  ELEMENT_IMAGE,
  ELEMENT_MEDIA_EMBED,
} from "@udecode/plate-media";
import {
  createMentionPlugin,
  ELEMENT_MENTION,
  ELEMENT_MENTION_INPUT,
} from "@udecode/plate-mention";
import { createNodeIdPlugin } from "@udecode/plate-node-id";
import {
  createParagraphPlugin,
  ELEMENT_PARAGRAPH,
} from "@udecode/plate-paragraph";
import { createResetNodePlugin } from "@udecode/plate-reset-node";
import { createSelectOnBackspacePlugin } from "@udecode/plate-select";
import { createBlockSelectionPlugin } from "@udecode/plate-selection";
import { createDeserializeDocxPlugin } from "@udecode/plate-serializer-docx";
import { createDeserializeMdPlugin } from "@udecode/plate-serializer-md";
import { createTabbablePlugin } from "@udecode/plate-tabbable";
import {
  createTablePlugin,
  ELEMENT_TABLE,
  ELEMENT_TD,
  ELEMENT_TH,
  ELEMENT_TR,
} from "@udecode/plate-table";
import { createTrailingBlockPlugin } from "@udecode/plate-trailing-block";

import { autoformatPlugin } from "../../lib/plate/autoformatPlugin";
import { dragOverCursorPlugin } from "../../lib/plate/dragOverCursorPlugin";
import { BlockquoteElement } from "../../components/plate-ui/blockquote-element/blockquote-element";
import { CodeBlockElement } from "../../components/plate-ui/code-block-element/code-block-element";
import { CodeLeaf } from "../../components/plate-ui/code-leaf/code-leaf";
import { CodeLineElement } from "../../components/plate-ui/code-line-element/code-line-element";
import { CodeSyntaxLeaf } from "../../components/plate-ui/code-syntax-leaf/code-syntax-leaf";
import { CommentLeaf } from "../../components/plate-ui/comment-leaf/comment-leaf";
import { EmojiCombobox } from "../../components/plate-ui/emoji-combobox/emoji-combobox";
// import { ExcalidrawElement } from "../../components/plate-ui/excalidraw-element/excalidraw-element";
import { HeadingElement } from "../../components/plate-ui/heading-element/heading-element";
import { HighlightLeaf } from "../../components/plate-ui/highlight-leaf/highlight-leaf";
import { HrElement } from "../../components/plate-ui/hr-element/hr-element";
import { ImageElement } from "../../components/plate-ui/image-element/image-element";
import { KbdLeaf } from "../../components/plate-ui/kbd-leaf/kbd-leaf";
import { LinkElement } from "../../components/plate-ui/link-element/link-element";
import { LinkFloatingToolbar } from "../../components/plate-ui/link-floating-toolbar/link-floating-toolbar";
import { ListElement } from "../../components/plate-ui/list-element/list-element";
import { MediaEmbedElement } from "../../components/plate-ui/media-embed-element/media-embed-element";
import { MentionElement } from "../../components/plate-ui/mention-element/mention-element";
import { MentionInputElement } from "../../components/plate-ui/mention-input-element/mention-input-element";
import { ParagraphElement } from "../../components/plate-ui/paragraph-element/paragraph-element";
import { withPlaceholders } from "../../components/plate-ui/placeholder/placeholder";
import {
  TableCellElement,
  TableCellHeaderElement,
} from "../../components/plate-ui/table-cell-element/table-cell-element";
import { TableElement } from "../../components/plate-ui/table-element/table-element";
import { TableRowElement } from "../../components/plate-ui/table-row-element/table-row-element";
import { TodoListElement } from "../../components/plate-ui/todo-list-element/todo-list-element";
import { createTogglePlugin, ELEMENT_TOGGLE } from "@udecode/plate-toggle";

import { withDraggables } from "../../components/plate-ui/with-draggables/with-draggables";
import { TabbableElement } from "../../components/plate-ui/tabbable-element/tabbable-element";
import createUploadImagePlugin, {
  ELEMENT_UPLOAD_IMAGE,
  UploadImageElement,
} from "../../components/plate-ui/image-upload/image-upload";
import createMathPlugin, {
  ELEMENT_MATH,
  InsertMathElement,
} from "../../components/plate-ui/math-element/math-element";
import createUploadVideoPlugin, {
  ELEMENT_UPLOAD_VIDEO,
  UploadVideoElement,
} from "../../components/plate-ui/video-upload/video-upload";
import createUploadFilePlugin, {
  ELEMENT_UPLOAD_FILE,
  UploadFileElement,
} from "../../components/plate-ui/file-upload/file-upload";
// import { createYjsPlugin } from "@udecode/plate-yjs";

import { ToggleElement } from "../../components/plate-ui/toggle-element/toggle-element";
import { SlashInputElement } from "../../components/plate-ui/slash-input-element/slash-input-element";
import { SLASH_RULES } from "./slashRules";
import { createSlashArPlugin, ELEMENT_SLASH_AR_INPUT } from "./ar-slash";
import { SlashInputArElement } from "../../components/plate-ui/slash-input-ar-elemnt/slash-input-ar-elemnt";

import { createCloudPlugin } from "../../components/cloud/create-cloud-plugin";
import createSpinnerPlugin, {
  ELEMENT_SPINNER,
  SpinnerElement,
} from "../../components/plate-ui/spinner-element/spinner-element";

const resetBlockTypesCommonRule = {
  types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
  defaultType: ELEMENT_PARAGRAPH,
};

const resetBlockTypesCodeBlockRule = {
  types: [ELEMENT_CODE_BLOCK],
  defaultType: ELEMENT_PARAGRAPH,
  onReset: unwrapCodeBlock,
};
export const plugins = createPlugins(
  [
    //CLOUD
    createCloudPlugin(),
    createSpinnerPlugin(),

    createUploadImagePlugin(),
    createImagePlugin(),
    createUploadFilePlugin(),
    createUploadVideoPlugin(),
    createMediaEmbedPlugin(),
    createMathPlugin(),
    createSelectOnBackspacePlugin({
      options: {
        query: {
          allow: [
            ELEMENT_UPLOAD_IMAGE,
            ELEMENT_MEDIA_EMBED,
            // ELEMENT_EXCALIDRAW,
          ],
        },
      },
    }),
    // Nodes
    createParagraphPlugin(),
    createHeadingPlugin(),
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createHorizontalRulePlugin(),
    createLinkPlugin({
      renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
    }),
    createImagePlugin(),
    createTogglePlugin(),
    createMediaEmbedPlugin(),
    createCaptionPlugin({
      options: { pluginKeys: [ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED] },
    }),
    createMentionPlugin(),
    createTablePlugin(),
    createTodoListPlugin(),
    // createExcalidrawPlugin(),
    // Marks
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createCodePlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    createHighlightPlugin(),
    createKbdPlugin(),

    // Block Style
    createAlignPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
            ELEMENT_TODO_LI,
          ],
        },
      },
    }),
    createIndentPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
            ELEMENT_BLOCKQUOTE,
            ELEMENT_CODE_BLOCK,
            ELEMENT_TODO_LI,
          ],
        },
      },
    }),
    createIndentListPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
            ELEMENT_BLOCKQUOTE,
            ELEMENT_CODE_BLOCK,
            ELEMENT_TODO_LI,
          ],
        },
      },
    }),
    createLineHeightPlugin({
      inject: {
        props: {
          defaultNodeValue: 1.5,
          validNodeValues: [1, 1.2, 1.5, 2, 3],
          validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3],
        },
      },
    }),

    // Functionality
    createAutoformatPlugin(autoformatPlugin),
    createBlockSelectionPlugin({
      options: {
        sizes: {
          top: 0,
          bottom: 0,
        },
      },
    }),
    createComboboxPlugin(),
    createDndPlugin({
      options: { enableScroller: true },
    }),
    createEmojiPlugin({
      renderAfterEditable: EmojiCombobox as RenderAfterEditable,
    }),
    createExitBreakPlugin({
      options: {
        rules: [
          {
            hotkey: "mod+enter",
          },
          {
            hotkey: "mod+shift+enter",
            before: true,
          },
          {
            hotkey: "enter",
            query: {
              start: true,
              end: true,
              allow: KEYS_HEADING,
            },
            relative: true,
            level: 1,
          },
        ],
      },
    }),
    createNodeIdPlugin(),
    createResetNodePlugin({
      options: {
        rules: [
          {
            ...resetBlockTypesCommonRule,
            hotkey: "Enter",
            predicate: isBlockAboveEmpty,
          },
          {
            ...resetBlockTypesCommonRule,
            hotkey: "Backspace",
            predicate: isSelectionAtBlockStart,
          },
          {
            ...resetBlockTypesCodeBlockRule,
            hotkey: "Enter",
            predicate: isCodeBlockEmpty,
          },
          {
            ...resetBlockTypesCodeBlockRule,
            hotkey: "Backspace",
            predicate: isSelectionAtCodeBlockStart,
          },
        ],
      },
    }),
    createSelectOnBackspacePlugin({
      options: {
        query: {
          allow: [ELEMENT_IMAGE, ELEMENT_HR],
        },
      },
    }),

    createSoftBreakPlugin({
      options: {
        rules: [
          { hotkey: "shift+enter" },
          {
            hotkey: "enter",
            query: {
              allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD],
            },
          },
        ],
      },
    }),
    createTabbablePlugin({
      options: {
        query: (editor) => {
          if (isSelectionAtBlockStart(editor)) return false;

          return !someNode(editor, {
            match: (n) => {
              return !!(
                n.type &&
                ([ELEMENT_TABLE, ELEMENT_LI, ELEMENT_CODE_BLOCK].includes(
                  n.type as string
                ) ||
                  n[KEY_LIST_STYLE_TYPE])
              );
            },
          });
        },
      },
      plugins: [
        {
          key: "tabbable_element",
          isElement: true,
          isVoid: true,
          component: TabbableElement,
        },
      ],
    }),
    createTrailingBlockPlugin({
      options: { type: ELEMENT_PARAGRAPH },
    }),
    dragOverCursorPlugin,

    createCommentsPlugin(),

    // Deserialization
    createDeserializeDocxPlugin(),
    createDeserializeMdPlugin(),
    createJuicePlugin(),

    createSlashPlugin({
      options: {
        rules: SLASH_RULES,
      },
    }),
    createSlashArPlugin({
      options: {
        rules: SLASH_RULES,
      },
    }),
    //Collaboration
    // createYjsPlugin({
    //   options: {
    //     hocuspocusProviderOptions: {
    //       url: "", // hocuspocus url
    //       name: "", // room name
    //     },
    //   },
    // }),
  ],
  {
    components: withDraggables(
      withPlaceholders({
        [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
        [ELEMENT_CODE_BLOCK]: CodeBlockElement,
        [ELEMENT_CODE_LINE]: CodeLineElement,
        [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
        [ELEMENT_HR]: HrElement,
        [ELEMENT_H1]: withProps(HeadingElement, { variant: "h1" }),
        [ELEMENT_H2]: withProps(HeadingElement, { variant: "h2" }),
        [ELEMENT_H3]: withProps(HeadingElement, { variant: "h3" }),
        [ELEMENT_H4]: withProps(HeadingElement, { variant: "h4" }),
        [ELEMENT_H5]: withProps(HeadingElement, { variant: "h5" }),
        [ELEMENT_H6]: withProps(HeadingElement, { variant: "h6" }),
        [ELEMENT_IMAGE]: ImageElement,
        [ELEMENT_LI]: withProps(PlateElement, { as: "li" }),
        [ELEMENT_LINK]: LinkElement,
        [ELEMENT_TOGGLE]: ToggleElement,
        [ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
        [ELEMENT_MENTION]: MentionElement,
        [ELEMENT_MENTION_INPUT]: MentionInputElement,
        [ELEMENT_UL]: withProps(ListElement, { variant: "ul" }),
        [ELEMENT_OL]: withProps(ListElement, { variant: "ol" }),
        [ELEMENT_PARAGRAPH]: ParagraphElement,
        [ELEMENT_TABLE]: TableElement,
        [ELEMENT_TD]: TableCellElement,
        [ELEMENT_TH]: TableCellHeaderElement,
        [ELEMENT_TODO_LI]: TodoListElement,
        [ELEMENT_TR]: TableRowElement,
        // [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
        [MARK_BOLD]: withProps(PlateLeaf, { as: "strong" }),
        [MARK_CODE]: CodeLeaf,
        [MARK_HIGHLIGHT]: HighlightLeaf,
        [MARK_ITALIC]: withProps(PlateLeaf, { as: "em" }),
        [MARK_KBD]: KbdLeaf,
        [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: "s" }),
        [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: "sub" }),
        [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: "sup" }),
        [MARK_UNDERLINE]: withProps(PlateLeaf, { as: "u" }),
        [MARK_COMMENT]: CommentLeaf,
        [ELEMENT_UPLOAD_IMAGE]: UploadImageElement,
        [ELEMENT_UPLOAD_VIDEO]: UploadVideoElement,
        [ELEMENT_UPLOAD_FILE]: UploadFileElement,
        [ELEMENT_MATH]: InsertMathElement,
        [ELEMENT_SLASH_INPUT]: SlashInputElement,
        [ELEMENT_SLASH_AR_INPUT]: SlashInputArElement,
        [ELEMENT_SPINNER]: SpinnerElement,
      })
    ),
  }
);
