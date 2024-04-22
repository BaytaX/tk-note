import { useRef } from "react";
import { cn } from "@udecode/cn";
import { CommentsProvider } from "@udecode/plate-comments";
import { Plate } from "@udecode/plate-common";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { commentsUsers, myUserId } from "../lib/plate/comments";
import { plugins } from "../lib/plate/plate-plugins";
import { TooltipProvider } from "./plate-ui/tooltip";
import { Editor } from "./plate-ui/editor";
import { FloatingToolbar } from "./plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "./plate-ui/floating-toolbar-buttons";
import { SlashToolbar } from "./plate-ui/slashToolBar";
import { DropdownSlash } from "./plate-ui/dropdown-slash";
import { MentionCombobox } from "./plate-ui/mention-combobox";
import { MENTIONABLES } from "../lib/plate/mentionables";
import { CommentsPopover } from "./plate-ui/comments-popover";
import { CursorOverlay } from "./plate-ui/cursor-overlay";

export default function PlateEditor() {
  const containerRef = useRef(null);

  const initialValue = [
    {
      type: "h2",
      children: [
        {
          text: "🌳 Blocks",
        },
      ],
      id: "1",
    },
    {
      type: "p",
      children: [
        {
          text: "Easily create headings of various levels, from H1 to H6, to structure your content and make it more organized.",
        },
      ],
      id: "2",
    },
    {
      type: "blockquote",
      children: [
        {
          text: "Create blockquotes to emphasize important information or highlight quotes from external sources.",
        },
      ],
      id: "3",
    },
    {
      type: "code_block",
      lang: "javascript",
      children: [
        {
          type: "code_line",
          children: [
            {
              text: "// Use code blocks to showcase code snippets",
            },
          ],
        },
        {
          type: "code_line",
          children: [
            {
              text: "function greet() {",
            },
          ],
        },
        {
          type: "code_line",
          children: [
            {
              text: "  console.info('Hello World!');",
            },
          ],
        },
        {
          type: "code_line",
          children: [
            {
              text: "}",
            },
          ],
        },
      ],
      id: "4",
    },
    {
      type: "media_embed",
      url: "https://instagram.com/p/CUbHfhpswxt/?utm_source=ig_embed&amp;utm_campaign=loading",
      children: [
        {
          text: "",
        },
      ],
      id: "ornud",
      width: 338,
    },
    {
      type: "p",
      children: [
        {
          text: "one",
        },
      ],
      id: "78yxz",
      indent: 1,
      listStyleType: "disc",
    },
    {
      type: "p",
      id: "bif2d",
      indent: 1,
      listStyleType: "disc",
      children: [
        {
          text: "two",
        },
      ],
      listStart: 2,
    },
    {
      type: "p",
      id: "ne1zt",
      indent: 1,
      listStyleType: "disc",
      listStart: 3,
      children: [
        {
          text: "three",
        },
      ],
    },
    {
      type: "p",
      id: "yldqk",
      children: [
        {
          text: "",
        },
      ],
    },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <CommentsProvider users={commentsUsers} myUserId={myUserId}>
        <Plate
          plugins={plugins}
          initialValue={initialValue}
          // onChange={(e) => console.log(e)}
        >
          <TooltipProvider>
            <div
              ref={containerRef}
              className={cn(
                "relative",
                // Block selection
                "[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4"
              )}
            >
              <Editor
                className="px-[96px] py-16"
                autoFocus
                focusRing={false}
                variant="ghost"
                size="md"
              />

              <FloatingToolbar>
                <FloatingToolbarButtons />
              </FloatingToolbar>

              <SlashToolbar>
                <DropdownSlash />
              </SlashToolbar>

              <MentionCombobox items={MENTIONABLES} />

              <CommentsPopover />
              <CursorOverlay containerRef={containerRef} />
            </div>
          </TooltipProvider>
        </Plate>
      </CommentsProvider>
    </DndProvider>
  );
}
