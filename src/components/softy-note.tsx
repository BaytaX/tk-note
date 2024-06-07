import React, { memo, useRef } from "react";
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
import { CommentsPopover } from "./plate-ui/comments-popover/comments-popover";
import { CursorOverlay } from "./plate-ui/cursor-overlay/cursor-overlay";
import { SLASH_RULES } from "../lib/plate/slashRules";
import { SlashArCombobox } from "./plate-ui/slash-ar-combobox/slash-ar-combobox";
import { SlashCombobox } from "./plate-ui/slash-combobox/slash-combobox";
import { SLASH_AR_RULES } from "../lib/plate/slashArRules";
import "../assets/styles.css";
import "../assets/App.css";
import { TSlashArr, TComboboxItem } from "../lib/plate/plate-types";
import { MENTIONABLES } from "../lib/plate/mentionables";
import { mergeArrays } from "../lib/plate/mergeArrays";
import { FixedToolbar } from "./plate-ui/fixed-toolbar/fixed-toolbar";
import { FixedToolbarButtons } from "./plate-ui/fixed-toolbar-buttons/fixed-toolbar-buttons";
import createNewPlugins from "../lib/plate/createPlugin";
// import { SoftyProvider } from "../contexts/SoftyNoteStore";

type SoftyEditor = {
  initialValue: any;
  onChange?: (e: any) => void;
  readOnly?: boolean;
  editorClassName?: string;
  onUpload?: (file: File) => Promise<string>;
  MentionComponentItem?: any;
  MentionablesArr?: TComboboxItem[];
  mentionComponentClassName?: string;
  slashComponentClassName?: string;
  slashItemClassName?: string;
  SlashArr?: TSlashArr[];
  withFixedToolbar?: boolean;
  ref?: React.Ref<any>;
  NewPlugins?: any;
  floatingToolbarClassname?: string;
  handelSelectedImage?: (e: any) => void;
  autoFocus?: boolean;
};

const SoftyNote = memo(
  React.forwardRef<HTMLDivElement, SoftyEditor>(
    (
      {
        onChange,
        initialValue,
        readOnly,
        editorClassName,
        onUpload,
        MentionComponentItem,
        handelSelectedImage,
        MentionablesArr,
        mentionComponentClassName,
        slashComponentClassName,
        slashItemClassName,
        SlashArr,
        withFixedToolbar = false,
        NewPlugins = [],
        floatingToolbarClassname,
        autoFocus = false,
      },
      ref
    ) => {
      const containerRef = useRef(null);
      const SLASH_LIST = SlashArr
        ? mergeArrays(SLASH_RULES, SlashArr)
        : SLASH_RULES;

      const plugins_v2 = createNewPlugins(NewPlugins);
      return (
        // <SoftyProvider>
        <DndProvider backend={HTML5Backend}>
          <CommentsProvider
            users={commentsUsers}
            myUserId={myUserId}>
            <Plate
              plugins={plugins_v2}
              initialValue={initialValue}
              onChange={onChange}
              readOnly={readOnly}>
              <TooltipProvider>
                <div
                  ref={containerRef}
                  className={cn(
                    "relative"
                    // Block selection
                    // "[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4"
                  )}>
                  {withFixedToolbar && (
                    <FixedToolbar>
                      <FixedToolbarButtons items={SLASH_LIST} />
                    </FixedToolbar>
                  )}

                  <Editor
                    ref={ref}
                    className={`px-20 py-16 bg-transparent ${editorClassName}`}
                    autoFocus={autoFocus}
                    handelSelectedImage={handelSelectedImage}
                    focusRing={false}
                    variant="ghost"
                    size="md"
                    onUpload={onUpload}
                    // isArabic={isArabic}
                  />
                  {!readOnly && (
                    <FloatingToolbar
                      floatingToolbarClassname={floatingToolbarClassname}>
                      <FloatingToolbarButtons />
                    </FloatingToolbar>
                  )}

                  <MentionCombobox
                    MentionComponentItem={MentionComponentItem}
                    items={MentionablesArr ? MentionablesArr : MENTIONABLES}
                    mentionComponentClassName={mentionComponentClassName}
                  />

                  <SlashCombobox
                    items={SLASH_LIST}
                    slashComponentClassName={slashComponentClassName}
                    slashItemClassName={slashItemClassName}
                  />

                  <SlashArCombobox
                    items={SLASH_AR_RULES}
                    slashComponentClassName={slashComponentClassName}
                    slashItemClassName={slashItemClassName}
                  />

                  <CommentsPopover />
                  <CursorOverlay containerRef={containerRef} />
                </div>
              </TooltipProvider>
            </Plate>
          </CommentsProvider>
        </DndProvider>
        // </SoftyProvider>
      );
    }
  )
);

export { SoftyNote };
