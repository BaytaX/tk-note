import { useCommentAddButton } from "@udecode/plate-comments";

import { Icons } from "../icons/icons";

import { ToolbarButton } from "../toolbar/toolbar";

export function CommentToolbarButton() {
  const { hidden, props } = useCommentAddButton();

  if (hidden) return null;

  return (
    <ToolbarButton tooltip="Comment (⌘+⇧+M)" {...props}>
      <Icons.commentAdd />
    </ToolbarButton>
  );
}
