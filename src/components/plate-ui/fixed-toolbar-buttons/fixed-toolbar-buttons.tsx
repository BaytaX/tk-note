import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import { useEditorReadOnly } from "@udecode/plate-common";
import { MARK_BG_COLOR, MARK_COLOR } from "@udecode/plate-font";
import { ListStyleType } from "@udecode/plate-indent-list";
import { ELEMENT_IMAGE } from "@udecode/plate-media";

import { Icons, iconVariants } from "../icons/icons";
import { AlignDropdownMenu } from "../align-dropdown-menu/align-dropdown-menu";
import { ColorDropdownMenu } from "../color-dropdown-menu/color-dropdown-menu";
import { CommentToolbarButton } from "../comment-toolbar-button/comment-toolbar-button";
import { EmojiDropdownMenu } from "../emoji-dropdown-menu/emoji-dropdown-menu";
import { IndentListToolbarButton } from "../indent-list-toolbar-button/indent-list-toolbar-button";
import { IndentToolbarButton } from "../indent-toolbar-button/indent-toolbar-button";
import { LineHeightDropdownMenu } from "../line-height-dropdown-menu/line-height-dropdown-menu";
import { LinkToolbarButton } from "../link-toolbar-button/link-toolbar-button";
import { MediaToolbarButton } from "../media-toolbar-button/media-toolbar-button";
import { MoreDropdownMenu } from "../more-dropdown-menu/more-dropdown-menu";
import { OutdentToolbarButton } from "../outdent-toolbar-button/outdent-toolbar-button";
import { TableDropdownMenu } from "../table-dropdown-menu/table-dropdown-menu";

import { InsertDropdownMenu } from "../insert-dropdown-menu/insert-dropdown-menu";
import { MarkToolbarButton } from "../mark-toolbar-button/mark-toolbar-button";
import { ModeDropdownMenu } from "../mode-dropdown-menu/mode-dropdown-menu";
import { ToolbarGroup } from "../toolbar/toolbar";
import { TurnIntoDropdownMenu } from "../turn-into-dropdown-menu/turn-into-dropdown-menu";
import { SlashRule } from "../../../lib/plate/plate-types";

export function FixedToolbarButtons({ items }: { items: SlashRule[] }) {
  const readOnly = useEditorReadOnly();

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex flex-wrap"
        style={{
          transform: "translateX(calc(-1px))",
        }}
      >
        {!readOnly && (
          <>
            <ToolbarGroup noSeparator>
              <InsertDropdownMenu items={items} />
              <TurnIntoDropdownMenu />
            </ToolbarGroup>

            <ToolbarGroup>
              <MarkToolbarButton tooltip="Bold (⌘+B)" nodeType={MARK_BOLD}>
                <Icons.bold />
              </MarkToolbarButton>
              <MarkToolbarButton tooltip="Italic (⌘+I)" nodeType={MARK_ITALIC}>
                <Icons.italic />
              </MarkToolbarButton>
              <MarkToolbarButton
                tooltip="Underline (⌘+U)"
                nodeType={MARK_UNDERLINE}
              >
                <Icons.underline />
              </MarkToolbarButton>

              <MarkToolbarButton
                tooltip="Strikethrough (⌘+⇧+M)"
                nodeType={MARK_STRIKETHROUGH}
              >
                <Icons.strikethrough />
              </MarkToolbarButton>
              <MarkToolbarButton tooltip="Code (⌘+E)" nodeType={MARK_CODE}>
                <Icons.code />
              </MarkToolbarButton>
            </ToolbarGroup>

            <ToolbarGroup>
              <ColorDropdownMenu nodeType={MARK_COLOR} tooltip="Text Color">
                <Icons.color className={iconVariants({ variant: "toolbar" })} />
              </ColorDropdownMenu>
              <ColorDropdownMenu
                nodeType={MARK_BG_COLOR}
                tooltip="Highlight Color"
              >
                <Icons.bg className={iconVariants({ variant: "toolbar" })} />
              </ColorDropdownMenu>
            </ToolbarGroup>

            <ToolbarGroup>
              <AlignDropdownMenu />

              <LineHeightDropdownMenu />

              <IndentListToolbarButton nodeType={ListStyleType.Disc} />
              <IndentListToolbarButton nodeType={ListStyleType.Decimal} />

              <OutdentToolbarButton />
              <IndentToolbarButton />
            </ToolbarGroup>

            <ToolbarGroup>
              <LinkToolbarButton />

              <MediaToolbarButton nodeType={ELEMENT_IMAGE} />

              <TableDropdownMenu />

              <EmojiDropdownMenu />

              <MoreDropdownMenu />
            </ToolbarGroup>
          </>
        )}

        <div className="grow" />

        <ToolbarGroup noSeparator>
          <CommentToolbarButton />
          <ModeDropdownMenu />
        </ToolbarGroup>
      </div>
    </div>
  );
}
