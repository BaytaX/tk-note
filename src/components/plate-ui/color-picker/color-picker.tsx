import React from "react";
import { cn, withRef } from "@udecode/cn";

import { buttonVariants } from "../button/button";
import { TColor } from "../color-dropdown-menu/color-dropdown-menu";
import { ColorDropdownMenuItems } from "../color-dropdown-menu-items/color-dropdown-menu-items";
import { ColorsCustom } from "../colors-custom/colors-custom";
import { DropdownMenuItem } from "../dropdown-menu/dropdown-menu";
import { Separator } from "../separator/separator";

export const ColorPickerContent = withRef<
  "div",
  {
    color?: string;
    colors: TColor[];
    customColors: TColor[];
    updateColor: (color: string) => void;
    updateCustomColor: (color: string) => void;
    clearColor: () => void;
  }
>(
  (
    {
      color,
      colors,
      customColors,
      updateColor,
      updateCustomColor,
      clearColor,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-4 p-4", className)}
        {...props}
      >
        <ColorsCustom
          color={color}
          colors={colors}
          customColors={customColors}
          updateColor={updateColor}
          updateCustomColor={updateCustomColor}
        />

        <Separator />

        <ColorDropdownMenuItems
          color={color}
          colors={colors}
          updateColor={updateColor}
        />
        {color && (
          <DropdownMenuItem
            className={buttonVariants({
              variant: "outline",
              isMenu: true,
            })}
            onClick={clearColor}
          >
            Clear
          </DropdownMenuItem>
        )}
      </div>
    );
  }
);

export const ColorPicker = React.memo(
  ColorPickerContent,
  (prev, next) =>
    prev.color === next.color &&
    prev.colors === next.colors &&
    prev.customColors === next.customColors
);
