//@ts-nocheck
import { cn, withRef } from "@udecode/cn";
import { PlateElement, withHOC } from "@udecode/plate-common";
import { ELEMENT_IMAGE, Image } from "@udecode/plate-media";
import { ResizableProvider, useResizableStore } from "@udecode/plate-resizable";

import { Caption, CaptionTextarea } from "../caption/caption";
import { MediaPopover } from "../media-popover/media-popover";
import {
  mediaResizeHandleVariants,
  Resizable,
  ResizeHandle,
} from "../resizable/resizable";
import { useMediaState } from "../../../lib/plate/mediaState";

export const ImageElement = withHOC(
  ResizableProvider,
  withRef<typeof PlateElement>(
    ({ className, children, nodeProps, ...props }, ref) => {
      let { readOnly, focused, selected, align = "center" } = useMediaState();

      const width = useResizableStore().get.width();
      return (
        <MediaPopover pluginKey={ELEMENT_IMAGE}>
          <PlateElement
            ref={ref}
            className={cn("py-2.5", className)}
            {...props}>
            <figure
              className="relative m-0 group"
              contentEditable={false}>
              <Resizable
                align={align}
                options={{
                  align,
                  readOnly,
                }}>
                {readOnly ? (
                  <Image
                    className={cn(
                      "block w-full max-w-full cursor-pointer object-cover px-0",
                      "rounded-sm",
                      focused && selected && "ring-2 ring-ring ring-offset-2"
                    )}
                    alt=""
                    {...nodeProps}
                  />
                ) : (
                  <>
                    <ResizeHandle
                      options={{ direction: "left" }}
                      className={mediaResizeHandleVariants({
                        direction: "left",
                      })}
                    />
                    <Image
                      className={cn(
                        "block w-full max-w-full cursor-pointer object-cover px-0",
                        "rounded-sm",
                        focused && selected && "ring-2 ring-ring ring-offset-2"
                      )}
                      alt=""
                      {...nodeProps}
                    />
                    <ResizeHandle
                      options={{ direction: "right" }}
                      className={mediaResizeHandleVariants({
                        direction: "right",
                      })}
                    />
                  </>
                )}
              </Resizable>

              <Caption
                align={align}
                style={{ width }}>
                <CaptionTextarea
                  placeholder="Write a caption..."
                  readOnly={readOnly}
                />
              </Caption>
            </figure>

            {children}
          </PlateElement>
        </MediaPopover>
      );
    }
  )
);
