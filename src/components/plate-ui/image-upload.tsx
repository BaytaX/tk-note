import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@udecode/cn";
import Image from "../../assets/icons/upload-image.png";
import {
  HotkeyPlugin,
  PlateElement,
  PlateElementProps,
  createPluginFactory,
  usePlateActions,
} from "@udecode/plate-common";

import { useEffect, useRef, useState } from "react";

export const ELEMENT_UPLOAD_IMAGE = "upload-image";

const createUploadImagePlugin = createPluginFactory<HotkeyPlugin>({
  key: ELEMENT_UPLOAD_IMAGE,
  isElement: true,
});

export default createUploadImagePlugin;

export const UploadImageElement = ({
  className,
  children,
  removeElement,
  ...props
}: PlateElementProps & { removeElement: () => void }) => {
  const [base64Image, setBase64Image] = useState(null);

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
    <>
      {!base64Image ? (
        <div
          className={cn(
            "whitespace-pre-wrap  h-96 flex gap-2 items-center  cursor-pointer rounded-md bg-muted px-[0.3em] py-[0.2em] font-mono text-sm"
          )}
        >
          <label
            htmlFor="upload-image"
            className={cn("flex items-center gap-2")}
          >
            <img src={Image} alt="image" height={20} width={20} />
            <span>Add an image...</span>
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
        <img src={base64Image} alt="our image" />
      )}
    </>
  );
};
