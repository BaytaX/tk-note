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
import FileIcon from "../../assets/icons/upload-file.png";
import Pdf from "../../assets/icons/pdf.png";
import Xls from "../../assets/icons/xls.png";
import Docs from "../../assets/icons/google-docs.png";
import DefaultFile from "../../assets/icons/default-file.svg";
import { ResizableProvider } from "@udecode/plate-resizable";
import { useState } from "react";
import DownloadIcon from "../../assets/icons/download-white.png";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import * as FileSaver from "file-saver";
import { insertFile } from "../insertFile";

interface FileObject {
  name: string;
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
      const editor = useEditorRef();
      const [percent, setPercent] = useState(0);

      const handleFileChange = (e: any) => {
        const file = e.target.files[0];

        var xhr = new XMLHttpRequest();

        xhr.upload.onprogress = function (evt) {
          var percentComplete = parseInt(`${(100.0 * evt.loaded) / evt.total}`);
          console.log(percentComplete);
          setPercent(percentComplete);
        };

        xhr.onload = function () {
          if (xhr.status === 200) {
            var fileInfo = JSON.parse(xhr.response);
            const x = getNode(editor, []);
            const elements: any = x?.children;
            const index = elements.findIndex(
              (el: any) => el.type === "upload-file"
            );
            removeNodes(editor, {
              at: [index],
            });
            insertFile(editor, { file: fileInfo }, { at: [index - 1] });

            // Upload succeeded. Do something here with the file info.
          } else {
            var errorMessage = xhr.response || "Unable to upload file";
            console.log(errorMessage);
            // Upload failed. Do something here with the error.
          }
        };

        xhr.open("POST", "https://content.dropboxapi.com/2/files/upload");
        xhr.setRequestHeader(
          "Authorization",
          "Bearer " +
            "sl.B0wPTTjnvJrbAd8ePi7W2K_40Is2fSk6yvZYk5HhD8oN4V6rWsSdi95gyrl91ReXOMKSVe-8WCjHTGZhR4xWqBKUZVY7-MmklCm0KBIjr_SmghsQAe64r1zBjcbaVgi9xsi5ltuQdvJoAG8t7aj6"
        );
        xhr.setRequestHeader("Content-Type", "application/octet-stream");
        xhr.setRequestHeader(
          "Dropbox-API-Arg",
          JSON.stringify({
            path: "/" + file.name,
            mode: "add",
            autorename: true,
            mute: false,
          })
        );
        xhr.send(file);
      };

      const downloadFile = (evt: any, file: any) => {
        evt.preventDefault();
        var xhr = new XMLHttpRequest();
        xhr.responseType = "arraybuffer";

        xhr.onload = function () {
          if (xhr.status === 200) {
            var blob = new Blob([xhr.response], {
              type: "application/octet-stream",
            });
            FileSaver.saveAs(blob, file.name);
          } else {
            var errorMessage = xhr.response || "Unable to download file";
            console.log(errorMessage);
          }
        };

        xhr.open("POST", "https://content.dropboxapi.com/2/files/download");
        xhr.setRequestHeader(
          "Authorization",
          "Bearer " +
            "sl.B0wPTTjnvJrbAd8ePi7W2K_40Is2fSk6yvZYk5HhD8oN4V6rWsSdi95gyrl91ReXOMKSVe-8WCjHTGZhR4xWqBKUZVY7-MmklCm0KBIjr_SmghsQAe64r1zBjcbaVgi9xsi5ltuQdvJoAG8t7aj6"
        );
        xhr.setRequestHeader(
          "Dropbox-API-Arg",
          JSON.stringify({
            path: file.path_lower,
          })
        );
        xhr.send();
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
              {percent === 0 ? (
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
                <div className="w-full h-full flex items-center justify-center  rounded-full dark:bg-gray-700">
                  <div
                    className="bg-blue-600 w-1/2 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                    style={{ width: `${percent}%` }}
                  >
                    {percent}%
                  </div>
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
                    src={DefaultFile}
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
                    onClick={(e) => downloadFile(e, props?.element?.file)}
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
