import { cn, withRef } from "@udecode/cn";
import { PlateElement } from "@udecode/plate-common";

export const BlockquoteElement = withRef<typeof PlateElement>(
  ({ className, children, ...props }, ref) => {
    const locale = document.documentElement.lang;

    return (
      <PlateElement
        ref={ref}
        asChild
        className={cn(
          "my-1   italic",
          locale === "ar" ? "border-r-2 pr-6" : "border-l-2 pl-6",
          className
        )}
        {...props}
      >
        <blockquote>{children}</blockquote>
      </PlateElement>
    );
  }
);
