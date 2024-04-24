import { cn, withRef } from "@udecode/cn";
import ImageIcon from "../../assets/icons/image.svg";
import {
  ELEMENT_MEDIA_EMBED,
  Image,
  useMediaState,
} from "@udecode/plate-media";
import {
  HotkeyPlugin,
  PlateElement,
  createPluginFactory,
  withHOC,
} from "@udecode/plate-common";
import { useState } from "react";
import { ResizableProvider, useResizableStore } from "@udecode/plate-resizable";
import {
  mediaResizeHandleVariants,
  Resizable,
  ResizeHandle,
} from "./resizable";
import { MediaPopover } from "./media-popover";

export const ELEMENT_UPLOAD_IMAGE = "upload-image";

const createUploadImagePlugin = createPluginFactory<HotkeyPlugin>({
  key: ELEMENT_UPLOAD_IMAGE,
  isElement: true,
});

export default createUploadImagePlugin;

export const UploadImageElement = withHOC(
  ResizableProvider,
  withRef<typeof PlateElement>(
    ({ className, children, nodeProps, ...props }, ref) => {
      const [base64Image, setBase64Image] = useState(null);
      const { readOnly, focused, selected, align = "center" } = useMediaState();
      const width = useResizableStore().get.width();
      const handleImageChange = (e: any) => {
        const selectedImage = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setBase64Image(reader.result as any);
        };
        if (selectedImage) {
          reader.readAsDataURL(selectedImage);
        }
      };

      return (
        <MediaPopover pluginKey={ELEMENT_UPLOAD_IMAGE}>
          <PlateElement
            ref={ref}
            className={cn("py-2.5", className)}
            {...props}
          >
            {!base64Image ? (
              <div
                style={{
                  width: "100%",
                  height: "120px",
                  border: "1px dashed #e5e5e5",
                }}
              >
                <label
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  htmlFor="upload-image"
                >
                  <img src={ImageIcon} alt="image" height={40} width={40} />
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Add an image...
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#ccc9c9",
                    }}
                  >
                    support differents types...
                  </span>
                </label>
                <input
                  type="file"
                  id="upload-image"
                  className={cn("hidden")}
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            ) : (
              <Resizable
                align={align}
                options={{
                  align,
                  // readOnly,
                }}
              >
                <ResizeHandle
                  options={{ direction: "left" }}
                  className={mediaResizeHandleVariants({ direction: "left" })}
                />
                {/* <Image alt="" setProps={{ src: base64Image }} /> */}
                <img src={base64Image} alt="" />
                <ResizeHandle
                  options={{ direction: "right" }}
                  className={mediaResizeHandleVariants({ direction: "right" })}
                />
              </Resizable>
            )}
          </PlateElement>
        </MediaPopover>
      );
    }
  )
);
