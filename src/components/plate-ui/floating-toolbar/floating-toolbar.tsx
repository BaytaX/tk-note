import { cn, withRef } from "@udecode/cn";
import { PortalBody, useComposedRef } from "@udecode/plate-common";
import {
  flip,
  FloatingToolbarState,
  offset,
  useFloatingToolbar,
  useFloatingToolbarState,
} from "@udecode/plate-floating";

import { Toolbar } from "../toolbar/toolbar";

export const FloatingToolbar = withRef<
  typeof Toolbar,
  {
    state?: FloatingToolbarState;
    floatingToolbarClassname?: string;
  }
>(({ state, children, floatingToolbarClassname, ...props }, componentRef) => {
  const floatingToolbarState = useFloatingToolbarState({
    ...state,
    floatingOptions: {
      placement: "top-start",
      middleware: [
        offset(12),
        flip({
          padding: 12,
          fallbackPlacements: ["bottom-start"],
        }),
      ],
      ...state?.floatingOptions,
    },
  });

  const {
    ref: floatingRef,
    props: rootProps,
    hidden,
  } = useFloatingToolbar(floatingToolbarState);

  const ref = useComposedRef<HTMLDivElement>(componentRef, floatingRef);

  if (hidden) return null;

  return (
    <PortalBody>
      <Toolbar
        ref={ref}
        className={cn(
          `absolute z-50 flex-wrap  border bg-popover px-1 opacity-100 shadow-md  print:hidden ${floatingToolbarClassname}`
        )}
        {...rootProps}
        {...props}
      >
        {children}
      </Toolbar>
    </PortalBody>
  );
});
