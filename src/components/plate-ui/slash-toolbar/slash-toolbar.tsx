import { cn, withRef } from "@udecode/cn";
import { PortalBody, useComposedRef } from "@udecode/plate-common";
import { flip, FloatingToolbarState, offset } from "@udecode/plate-floating";

import { Toolbar } from "../toolbar/toolbar";
import {
  useFloatingToolbar,
  useFloatingToolbarState,
} from "../../../hooks/useFloatingSlash";

export const SlashToolbar = withRef<
  typeof Toolbar,
  {
    state?: FloatingToolbarState;
  }
>(({ state, children, ...props }, componentRef) => {
  const floatingToolbarState = useFloatingToolbarState({
    ...state,
    floatingOptions: {
      placement: "top",
      middleware: [
        offset(12),
        flip({
          padding: 12,
          fallbackPlacements: [
            "top-start",
            "top-end",
            "bottom-start",
            "bottom-end",
          ],
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
          "absolute z-[999] whitespace-nowrap border bg-popover px-1 opacity-100 shadow-md print:hidden"
        )}
        {...rootProps}
        {...props}>
        {children}
      </Toolbar>
    </PortalBody>
  );
});
