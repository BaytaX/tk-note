import { cn, withRef } from "@udecode/cn";
import ImageIcon from "../../../assets/icons/image.svg";
import { insertImage } from "@udecode/plate-media";
import {
  HotkeyPlugin,
  PlateElement,
  createPluginFactory,
  getNode,
  removeNodes,
  useEditorRef,
  withHOC,
} from "@udecode/plate-common";
import { ResizableProvider } from "@udecode/plate-resizable";
import { MediaPopover } from "../media-popover/media-popover";
import { useState } from "react";
import Spinner from "../spinner/spinner";

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
      const { onUpload, ...wantedProps }: any = props;
      const [isLoading, setIsLoading] = useState(false);
      const editor = useEditorRef();
      const cloudName = import.meta.env.VITE_CLOUDNAME;
      const unsignedUploadPreset = import.meta.env.VITE_UNSIGNED_UPLOAD_PRESET;

      const uploadFile = async (file: any) => {
        setIsLoading(true);
        if (!onUpload) {
          const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
          const fd = new FormData();
          fd.append("upload_preset", unsignedUploadPreset);
          fd.append("tags", "browser_upload");
          fd.append("file", file);

          fetch(url, {
            method: "POST",
            body: fd,
          })
            .then((response) => response.json())
            .then(async (data) => {
              const url = data.secure_url;
              const x = getNode(editor, []);
              const elements: any = x?.children;
              const index = elements.findIndex(
                (el: any) =>
                  el.type === "upload-image" && el.id === props.element.id
              );
              removeNodes(editor, {
                at: [index],
              });
              await insertImage(editor, url, { at: [index] });
            })
            .catch((error) => {
              console.error("Error uploading the file:", error);
            });
        } else {
          const url = await onUpload(file);
          if (!url) {
            console.log(
              "there is no url returned from onUpload function you provide"
            );
            return setIsLoading(false);
          }
          const x = getNode(editor, []);
          const elements: any = x?.children;
          const index = elements.findIndex(
            (el: any) =>
              el.type === "upload-image" && el.id === props.element.id
          );
          removeNodes(editor, {
            at: [index],
          });
          insertImage(editor, url, { at: [index] });
        }
      };

      const handleImageChange = async (e: any) => {
        const selectedImage = e.target.files[0];
        await uploadFile(selectedImage);
      };

      return (
        <MediaPopover pluginKey={ELEMENT_UPLOAD_IMAGE}>
          <PlateElement
            ref={ref}
            className={cn("py-2.5", className)}
            {...wantedProps}
            contentEditable={false}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                border: "1px dashed rgb(229, 229, 229)",
                height: "120px",
                borderRadius: "8px",
                gap: "10px",
              }}>
              {isLoading === false ? (
                <>
                  <label
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    htmlFor="upload-image">
                    <img
                      src={ImageIcon}
                      alt="image"
                      height={40}
                      width={40}
                    />
                    <span
                      style={{
                        fontWeight: "bold",
                      }}>
                      Add an image...
                    </span>
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#ccc9c9",
                      }}>
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
                </>
              ) : (
                <div className="flex justify-center items-center h-full w-full">
                  <Spinner />
                </div>
              )}
            </div>
          </PlateElement>
        </MediaPopover>
      );
    }
  )
);
