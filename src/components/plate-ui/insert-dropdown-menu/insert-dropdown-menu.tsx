import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

import { useEditorRef } from "@udecode/plate-common";

import { Icons } from "../icons/icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from "../dropdown-menu/dropdown-menu";
import { ToolbarButton } from "../toolbar/toolbar";
import { SlashRule } from "../../../lib/plate/plate-types";

export function InsertDropdownMenu(
  props: DropdownMenuProps & { items: SlashRule[] }
) {
  const editor = useEditorRef();
  const openState = useOpenState();
  const { items, ...wantedProps } = props;
  return (
    <DropdownMenu modal={false} {...openState} {...wantedProps}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Insert" isDropdown>
          <Icons.add />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className={`z-[500] m-0 max-h-[400px] w-[330px] overflow-y-auto rounded-md bg-popover dark:bg-[#191919] p-2  shadow-md flex flex-col gap-1`}
      >
        {items.map(
          ({ text: label, img: itemImg, description, onTrigger, key }) => (
            <DropdownMenuItem
              key={label}
              className={`relative flex gap-2  min-w-[200px] h-fit cursor-pointer text-sm select-none items-center rounded-sm p-1   outline-none transition-colors hover:bg-accent  focus:text-gray-900   data-[highlighted=true]:bg-accent data-[highlighted=true]:text-accent-foreground  `}
              onSelect={() => onTrigger(editor, key)}
            >
              <img
                className="w-12 h-12 border border-gray-200 rounded-md bg-white"
                src={itemImg}
                alt={label}
              />
              <div className="flex flex-col  ">
                <p>{label}</p>
                <p className="text-xs text-gray-500">{description}</p>
              </div>
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
