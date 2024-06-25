import { cn, withRef } from "@udecode/cn";
import { PlateElement, useElement } from "@udecode/plate-common";
import { TLinkElement, useLink } from "@udecode/plate-link";

export const LinkElement = withRef<typeof PlateElement>(
  ({ className, children, ...props }, ref) => {
    const element = useElement<TLinkElement>();
    const { props: linkProps } = useLink({ element });

    return (
      <PlateElement
        ref={ref}
        asChild
        className={cn(
          "font-[400]  text-blue-400 hover:text-blue-300  underline decoration-primary underline-offset-4",
          className
        )}
        {...(linkProps as any)}
        {...props}
      >
        <a>{children}</a>
      </PlateElement>
    );
  }
);
