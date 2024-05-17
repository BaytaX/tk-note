import { cn, withRef } from "@udecode/cn";
import {
  getHandler,
  isUrl,
  PlateElement,
  useElement,
} from "@udecode/plate-common";
import { TMentionElement } from "@udecode/plate-mention";
import { useFocused, useSelected } from "slate-react";

export const MentionElement = withRef<
  typeof PlateElement,
  {
    prefix?: string;
    onClick?: (mentionNode: any) => void;
    renderLabel?: (mentionable: TMentionElement) => string;
  }
>(({ children, prefix, renderLabel, className, onClick, ...props }, ref) => {
  const element = useElement<TMentionElement>();
  const selected = useSelected();
  const focused = useFocused();
  return (
    <PlateElement
      ref={ref}
      className={cn(
        "inline-block text-blue-500 cursor-pointer rounded-md px-1.5 py-0.5 align-baseline text-sm font-medium",
        selected && focused && "ring-2 ring-ring",
        element.children[0].bold === true && "font-bold",
        element.children[0].italic === true && "italic",
        element.children[0].underline === true && "underline",
        className
      )}
      data-slate-value={element.value}
      contentEditable={false}
      onClick={getHandler(onClick, element)}
      {...props}
    >
      {isUrl(props.element.link) ? (
        <a href={props.element.link as string} target="_blank">
          @{renderLabel ? renderLabel(element) : element.value}
          {children}
        </a>
      ) : (
        <>
          @{renderLabel ? renderLabel(element) : element.value}
          {children}
        </>
      )}
    </PlateElement>
  );
});
