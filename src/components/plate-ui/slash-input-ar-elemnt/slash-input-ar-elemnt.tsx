import { cn, withRef } from "@udecode/cn";
import { getHandler, PlateElement } from "@udecode/plate-common";

export const SlashInputArElement = withRef<
  typeof PlateElement,
  {
    onClick?: (slashNode: any) => void;
  }
>(({ className, onClick, ...props }, ref) => {
  const { children, element } = props;

  return (
    <PlateElement
      ref={ref}
      asChild
      data-slate-value={element.value}
      className={cn(
        "inline-block rounded-md px-1.5 py-0.5 align-baseline text-sm",
        className
      )}
      onClick={getHandler(onClick, element)}
      {...props}
    >
      <span>\{children}</span>
    </PlateElement>
  );
});
