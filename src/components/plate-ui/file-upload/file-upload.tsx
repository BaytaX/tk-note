import { cn } from "@udecode/cn";
import {
  HotkeyPlugin,
  PlateElement,
  createPluginFactory,
  getNode,
  removeNodes,
  useEditorRef,
  withHOC,
  withRef,
} from "@udecode/plate-common";
import FileIcon from "../../../assets/icons/upload-file.png";
import DefaultFile from "../../../assets/icons/default-file.svg";
import { ResizableProvider } from "@udecode/plate-resizable";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/tooltip";
import { insertFile } from "../../../lib/plate/insertFile";
import Pdf from "../../../assets/icons/pdf.png";
import Xls from "../../../assets/icons/xls.png";
import Docs from "../../../assets/icons/google-docs.png";
import { useState } from "react";
import Spinner from "../spinner/spinner";
import { Download } from "lucide-react";

const TYPES_ICONS = new Map<string, string>([
  ["application/pdf", Pdf],
  ["application/vnd.ms-excel", Xls],
  [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    Docs,
  ],

  ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Xls],
]);

interface FileObject {
  name: string;
  type: string;
  url: Location | (string & Location);
}

export const ELEMENT_UPLOAD_FILE = "upload-file";

const createUploadFilePlugin = createPluginFactory<HotkeyPlugin>({
  key: ELEMENT_UPLOAD_FILE,
  isElement: true,
});

export default createUploadFilePlugin;

export const UploadFileElement = withHOC(
  ResizableProvider,
  withRef<typeof PlateElement>(
    ({ className, children, nodeProps, ...props }, ref) => {
      console.log(ref);
      const [isLoading, setIsLoading] = useState(false);

      const editor = useEditorRef();
      const cloudName = import.meta.env.VITE_CLOUDNAME;
      const unsignedUploadPreset = import.meta.env.VITE_UNSIGNED_UPLOAD_PRESET;

      const uploadFile = (file: any) => {
        setIsLoading(true);
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
            const fileObj = {
              url,
              name: data.original_filename,
              type: file.type,
            };
            const x = getNode(editor, []);
            const elements: any = x?.children;
            const index = elements.findIndex(
              (el: any) =>
                el.type === "upload-file" && el.id === props.element.id
            );
            removeNodes(editor, {
              at: [index],
            });
            await insertFile(editor, { file: fileObj }, { at: [index] });
          })
          .catch((error) => {
            console.error("Error uploading the file:", error);
          });
      };

      const handleFileChange = async (e: any) => {
        const selectedFile = e.target.files[0];
        uploadFile(selectedFile);
      };

      const downloadFile = (evt: any, fileUrl: any) => {
        evt.preventDefault();
        window.location = fileUrl;
      };

      return (
        <PlateElement
          ref={ref}
          className={cn("py-2.5", className)}
          {...props}
          contentEditable={false}
        >
          {!props?.element?.file ? (
            <div
              style={{
                width: "100%",
                height: "120px",
                border: "2px dashed #e5e5e5",
                borderRadius: "5px",
              }}
            >
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
                    htmlFor="upload-image"
                  >
                    <img src={FileIcon} alt="image" height={40} width={40} />
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Add a file
                    </span>
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#ccc9c9",
                      }}
                    >
                      support multiple files...
                    </span>
                  </label>
                  <input
                    type="file"
                    id="upload-image"
                    className={cn("hidden")}
                    accept=".pdf, .txt, .xls, .xlsx, .doc, .docx"
                    multiple
                    onChange={handleFileChange}
                  />
                </>
              ) : (
                <div className="flex justify-center items-center h-full w-full">
                  <Spinner />
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "10px",
                padding: "10px",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  height: "10rem",
                  width: "8rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "10px 0px 0px 0px",
                  justifyContent: "space-between",
                  gap: "10px",
                  border: "1px solid #eee",
                  borderRadius: "5px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                    src={
                      TYPES_ICONS.get(
                        (props?.element?.file as FileObject)?.type
                      ) || DefaultFile
                    }
                    alt="type-icon"
                  />
                </div>

                <div
                  style={{
                    borderTop: " 1px solid #eee",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "5px",
                  }}
                >
                  <Tooltip>
                    <TooltipTrigger
                      style={{
                        textWrap: "nowrap",
                        textOverflow: "ellipsis",
                        maxWidth: "6rem",
                        overflow: "hidden",
                        fontSize: "16px",
                      }}
                    >
                      {" "}
                      {(props?.element?.file as FileObject)?.name}
                    </TooltipTrigger>
                    <TooltipContent>
                      {(props?.element?.file as FileObject)?.name}
                    </TooltipContent>
                  </Tooltip>
                  <button
                    onClick={(e) =>
                      downloadFile(e, (props?.element?.file as FileObject)?.url)
                    }
                  >
                    <Download className=" w-5 stroke-black dark:stroke-white" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </PlateElement>
      );
    }
  )
);
