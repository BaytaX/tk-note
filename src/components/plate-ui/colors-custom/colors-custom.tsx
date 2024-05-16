// import { useColorsCustom, useColorsCustomState } from "@udecode/plate-font";

import { buttonVariants } from "../button/button";
import { DropdownMenuItem } from "../dropdown-menu/dropdown-menu";

import { TColor } from "../color-dropdown-menu/color-dropdown-menu";
import { ColorInput } from "../color-input/color-input";
import {
  useColorsCustom,
  useColorsCustomState,
} from "../../../hooks/useColorsCustom";

type ColorsCustomProps = {
  color?: string;
  colors: TColor[];
  customColors: TColor[];
  updateCustomColor: (color: string) => void;
  updateColor: (color: string) => void;
};

export function ColorsCustom({
  color,
  colors,
  customColors,
  updateCustomColor,
}: ColorsCustomProps) {
  const state = useColorsCustomState({
    color,
    colors,
    customColors,
    updateCustomColor,
  });
  const { inputProps, menuItemProps } = useColorsCustom(state);

  return (
    <div className="flex flex-col gap-4">
      <ColorInput {...inputProps}>
        <DropdownMenuItem
          className={buttonVariants({
            variant: "outline",
            isMenu: true,
          })}
          {...menuItemProps}
        >
          CUSTOM
        </DropdownMenuItem>
      </ColorInput>

      {/* <ColorDropdownMenuItems
        color={color}
        colors={state.computedColors}
        updateColor={updateColor}
      /> */}
    </div>
  );
}
