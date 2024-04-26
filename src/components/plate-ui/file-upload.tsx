import { cn } from "@udecode/cn";
import {
  HotkeyPlugin,
  PlateElement,
  createPluginFactory,
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

export const ELEMENT_UPLOAD_FILE = "upload-file";
const TYPES_ICONS = new Map<string, string>([
  ["application/pdf", Pdf],
  ["application/vnd.ms-excel", Xls],
  [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    Docs,
  ],

  ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Xls],
]);

const createUploadFilePlugin = createPluginFactory<HotkeyPlugin>({
  key: ELEMENT_UPLOAD_FILE,
  isElement: true,
});

export default createUploadFilePlugin;

export const UploadFileElement = withHOC(
  ResizableProvider,
  withRef<typeof PlateElement>(
    ({ className, children, nodeProps, ...props }, ref) => {
      const [filesInfo, setFilesInfo] = useState<
        {
          name: string;
          type: string;
        }[]
      >([]);

      //   const { readOnly, focused, selected, align = "center" } = useMediaState();
      //   let width = useResizableStore().get.width();

      const handleFileChange = (e: any) => {
        const selectedFiles = e.target.files;
        const newFilesInfo = [];

        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];
          const fileInfo = {
            name: file.name,
            type: file.type,
          };
          newFilesInfo.push(fileInfo);
        }

        setFilesInfo(newFilesInfo);
      };
      //   alert(TYPES_ICONS[item.type]);
      return (
        <>
          {filesInfo.length == 0 ? (
            <div
              style={{
                width: "100%",
                height: "120px",
                border: "2px dashed #e5e5e5",
                borderRadius: "5px",
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
              {filesInfo.map((item) => (
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
                      src={TYPES_ICONS.get(item.type) || DefaultFile}
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
                        {item.name}
                      </TooltipTrigger>
                      <TooltipContent>{item.name}</TooltipContent>
                    </Tooltip>

                    <img
                      style={{
                        height: "20px",
                        width: "20px",
                        cursor: "pointer",
                      }}
                      src={DownloadIcon}
                      alt="download"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      );
    }
  )
);
