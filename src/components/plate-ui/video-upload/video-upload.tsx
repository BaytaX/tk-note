import {
  PlateElement,
  PlateElementProps,
  createPluginFactory,
  getNode,
  removeNodes,
  useEditorRef,
} from "@udecode/plate-common";
import UploadImage from "../../../assets/icons/upload-video.png";
import { insertMediaEmbed } from "../../../lib/media-embed";
import { useState } from "react";
import Spinner from "../spinner/spinner";

export const ELEMENT_UPLOAD_VIDEO = "upload-video";

const createUploadVideoPlugin = createPluginFactory({
  key: ELEMENT_UPLOAD_VIDEO,
  isElement: true,
});

export default createUploadVideoPlugin;

export const UploadVideoElement = ({
  className,
  children,
  ...props
}: PlateElementProps) => {
  const editor = useEditorRef();
  const [isLoading, setIsLoading] = useState(false);

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
        const x = getNode(editor, []);
        const elements: any = x?.children;
        const index = elements.findIndex(
          (el: any) => el.type === "upload-video" && el.id === props.element.id
        );
        removeNodes(editor, {
          at: [index],
        });
        await insertMediaEmbed(editor, { url: url }, { at: [index - 1] });
      })
      .catch((error) => {
        console.error("Error uploading the file:", error);
      });
  };

  const handleVideoChange = async (e: any) => {
    const selectedVideo = e.target.files[0];
    uploadFile(selectedVideo);
  };

  return (
    <PlateElement {...props}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          paddingTop: "8px",
          paddingBottom: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            border: "1px solid #ccc",
            height: "120px",
            borderRadius: "8px",
            gap: "10px",
          }}
        >
          {isLoading === false ? (
            <>
              <label
                htmlFor="upload-video"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={UploadImage} alt="video" height={40} width={40} />
                <p
                  style={{
                    textTransform: "capitalize",
                    fontWeight: "bold",
                  }}
                >
                  choose your video...
                </p>
                <span
                  style={{
                    color: "#b2b2b2",
                  }}
                >
                  Support multiple video formats...
                </span>
              </label>
              <input
                id="upload-video"
                style={{
                  display: "none",
                }}
                type="file"
                accept="video/*"
                onChange={(e: any) => {
                  handleVideoChange(e);
                }}
              />
            </>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </PlateElement>
  );
};
