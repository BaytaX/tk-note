import { withRef } from "@udecode/cn";
import { useIndentButton } from "@udecode/plate-indent";

import { Icons } from "../icons/icons";

import { ToolbarButton } from "../toolbar/toolbar";

export const IndentToolbarButton = withRef<typeof ToolbarButton>(
  (rest, ref) => {
    const { props } = useIndentButton();

    return (
      <ToolbarButton ref={ref} tooltip="Indent" {...props} {...rest}>
        <Icons.indent />
      </ToolbarButton>
    );
  }
);
