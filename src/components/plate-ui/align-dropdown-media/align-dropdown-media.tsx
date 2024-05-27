import {
  useAlignDropdownMenu,
  useAlignDropdownMenuState,
} from "@udecode/plate-alignment";

import { Icons, iconVariants } from "../icons/icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from "../dropdown-menu/dropdown-menu";
import { Button } from "../button/button";
// import { useMediaState } from "../../../lib/plate/mediaState";

const items = [
  {
    value: "left",
    icon: Icons.alignLeft,
  },
  {
    value: "center",
    icon: Icons.alignCenter,
  },
  {
    value: "right",
    icon: Icons.alignRight,
  },
  {
    value: "justify",
    icon: Icons.alignJustify,
  },
];

export function AlignDropdownMedia({ ...props }) {
  const state = useAlignDropdownMenuState();
  const { radioGroupProps } = useAlignDropdownMenu(state);
  // const { handleChangeAlign } = useMediaState();

  const openState = useOpenState();
  // const IconValue =
  //   items.find((item) => item.value === radioGroupProps.value)?.icon ??
  //   Icons.alignLeft;

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sms">
          <Icons.alignCenter className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-0">
        <DropdownMenuRadioGroup
          className="flex flex-col gap-0.5"
          {...radioGroupProps}
        >
          {items.map(({ value: itemValue, icon: Icon }: any) => (
            <DropdownMenuRadioItem
              key={itemValue}
              value={itemValue}
              hideIcon
              // onClick={() => handleChangeAlign(itemValue)}
            >
              <Icon className={iconVariants({ variant: "toolbar" })} />
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
