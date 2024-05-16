import { useRef } from "react";
import { cn } from "@udecode/cn";
import { CommentsProvider } from "@udecode/plate-comments";
import { Plate } from "@udecode/plate-common";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { commentsUsers, myUserId } from "../lib/plate/comments";
import { TooltipProvider } from "./plate-ui/tooltip/tooltip";
import { Editor } from "./plate-ui/editor/editor";
import { FloatingToolbar } from "./plate-ui/floating-toolbar/floating-toolbar";
import { FloatingToolbarButtons } from "./plate-ui/floating-toolbar-buttons/floating-toolbar-buttons";
import { MentionCombobox } from "./plate-ui/mention-combobox/mention-combobox";
import { MENTIONABLES } from "../lib/plate/mentionables";
import { CommentsPopover } from "./plate-ui/comments-popover/comments-popover";
import { CursorOverlay } from "./plate-ui/cursor-overlay/cursor-overlay";
import { SLASH_RULES } from "../lib/plate/slashRules";
import { SlashArCombobox } from "./plate-ui/slash-ar-combobox/slash-ar-combobox";
import { SlashCombobox } from "./plate-ui/slash-combobox/slash-combobox";
import { SLASH_AR_RULES } from "../lib/plate/slashArRules";
import "../assets/styles.css";
import "../assets/App.css";
import { plugins } from "../lib/plate/plate-plugins";

type SoftyEditor = {
  initialValue: any;
  onChange?: (e: any) => void;
  readOnly?: boolean;
  editorClassName?: string;
};

export function SoftyNote({
  onChange,
  initialValue,
  readOnly,
  editorClassName,
}: SoftyEditor) {
  const containerRef = useRef(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <CommentsProvider users={commentsUsers} myUserId={myUserId}>
        <Plate
          plugins={plugins}
          initialValue={initialValue}
          onChange={onChange}
          readOnly={readOnly}
        >
          <TooltipProvider>
            <div
              ref={containerRef}
              className={cn(
                "relative"
                // Block selection
                // "[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4"
              )}
            >
              <Editor
                className={`px-20 py-16 bg-transparent ${editorClassName}`}
                autoFocus
                focusRing={false}
                variant="ghost"
                size="md"
              />

              <FloatingToolbar>
                <FloatingToolbarButtons />
              </FloatingToolbar>

              <MentionCombobox items={MENTIONABLES} />

              <SlashCombobox items={SLASH_RULES} />

              <SlashArCombobox items={SLASH_AR_RULES} />

              <CommentsPopover />
              <CursorOverlay containerRef={containerRef} />
            </div>
          </TooltipProvider>
        </Plate>
      </CommentsProvider>
    </DndProvider>
  );
}
