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
import DownloadIcon from "../../../assets/icons/download-white.png";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/tooltip";
import { insertFile } from "../../../lib/plate/insertFile";
import Pdf from "../../../assets/icons/pdf.png";
import Xls from "../../../assets/icons/xls.png";
import Docs from "../../../assets/icons/google-docs.png";

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
    ({ className, children, nodeProps, ...props }) => {
      const editor = useEditorRef();
      const cloudName = import.meta.env.VITE_CLOUDNAME;
      const unsignedUploadPreset = import.meta.env.VITE_UNSIGNED_UPLOAD_PRESET;

      const uploadFile = (file: any) => {
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
            console.log(file);
            const url = data.secure_url;
            file.url = url;
            console.log(url);
            const x = getNode(editor, []);
            const elements: any = x?.children;
            const index = elements.findIndex(
              (el: any) => el.type === "upload-file"
            );
            removeNodes(editor, {
              at: [index],
            });
            console.log(file);
            await insertFile(editor, { file: file }, { at: [index - 1] });
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
        <>
          {!props?.element?.file ? (
            <div
              style={{
                width: "100%",
                height: "120px",
                border: "2px dashed #e5e5e5",
                borderRadius: "5px",
              }}
            >
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

              {/* <div className="w-full h-full flex items-center justify-center  rounded-full dark:bg-gray-700">
                  <div
                    className="bg-blue-600 w-1/2 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                    style={{ width: `${percent}%` }}
                  >
                    {percent}%
                  </div>
                </div> */}
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
                        maxWidth: "5rem",
                        overflow: "hidden",
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
                    <img
                      style={{
                        height: "20px",
                        width: "20px",
                        cursor: "pointer",
                      }}
                      src={DownloadIcon}
                      alt="download"
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      );
    }
  )
);
