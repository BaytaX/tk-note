import {
  PlateElement,
  PlateElementProps,
  createPluginFactory,
} from "@udecode/plate-common";
import { VideoPlayer } from "vidify";
import { useState } from "react";
import UploadImage from "../../assets/icons/upload-video.png";
import Axios from "axios";

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
  const [image, setImage] = useState("");
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "cwc6pgqn");

  //For testing purposes
  const uploadImage = () => {
    Axios.post(
      "https://api.cloudinary.com/v1_1/deky9ajcl/image/upload",
      formData,
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "multipart/form-data",
        },
      }
    ).then((res) => {
      console.log(res.data.secure_url);
    });
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
            onChange={(e: any) => {
              setImage(e.target.files[0]);
            }}
          />
          {/* <button onClick={uploadImage}>Submit</button> */}
        </div>

        <VideoPlayer
          primaryColor="red"
          src={
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          }
        />
      </div>
    </PlateElement>
  );
};
