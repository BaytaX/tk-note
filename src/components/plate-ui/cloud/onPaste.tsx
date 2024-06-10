import type React from "react";
import { insertImage } from "@udecode/plate-media";
import { insertSpinner } from "../../../lib/plate/insert-spinner";
import { getNode } from "@udecode/plate-common";
import { removeNodes } from "slate";

const cloudName = import.meta.env.VITE_CLOUDNAME;
const unsignedUploadPreset = import.meta.env.VITE_UNSIGNED_UPLOAD_PRESET;
export const onPasteCloud = (editor: any, e: React.ClipboardEvent): boolean => {
  const { files } = e.clipboardData;

  const cloudPlugin = editor?.plugins?.find((ele) => ele.key === "cloud");

  const onUpload = cloudPlugin?.props?.onUpload;

  if (files.length === 0) return false;

  e.preventDefault();
  e.stopPropagation();

  const uploadFile = async (file: any) => {
    if (!onUpload) {
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
      const fd = new FormData();
      fd.append("upload_preset", unsignedUploadPreset);
      fd.append("tags", "browser_upload");
      fd.append("file", file);
      insertSpinner(editor, {});

      fetch(url, {
        method: "POST",
        body: fd,
      })
        .then((response) => response.json())
        .then(async (data) => {
          const url = data.secure_url;

          const x = getNode(editor, []);
          const elements: any = x?.children;
          const index = elements.findIndex((el: any) => el.type === "spinner");

          removeNodes(editor, {
            at: [index],
          });
          await insertImage(editor, url);
        })
        .catch((error) => {
          console.error("Error uploading the file:", error);
        });
    } else {
      insertSpinner(editor, {});
      const url = await onUpload(file);
      if (!url) {
        console.log(
          "there is no url returned from onUpload function you provide"
        );

        return;
      }
      const x = getNode(editor, []);
      const elements: any = x?.children;
      const index = elements.findIndex((el: any) => el.type === "spinner");

      removeNodes(editor, {
        at: [index],
      });
      insertImage(editor, url);
    }
  };
  uploadFile(files[0]);
  return;
};

export const onDropCloud = (editor: any, e: React.DragEvent): boolean => {
  const { files } = e.dataTransfer;

  const cloudPlugin = editor?.plugins?.find((ele) => ele.key === "cloud");

  const onUpload = cloudPlugin?.props?.onUpload;

  if (files.length === 0) return false;

  e.preventDefault();
  e.stopPropagation();

  const uploadFile = async (file: any) => {
    if (!onUpload) {
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
      const fd = new FormData();
      fd.append("upload_preset", unsignedUploadPreset);
      fd.append("tags", "browser_upload");
      fd.append("file", file);
      insertSpinner(editor, {});

      fetch(url, {
        method: "POST",
        body: fd,
      })
        .then((response) => response.json())
        .then(async (data) => {
          const url = data.secure_url;

          const x = getNode(editor, []);
          const elements: any = x?.children;
          const index = elements.findIndex((el: any) => el.type === "spinner");

          removeNodes(editor, {
            at: [index],
          });
          await insertImage(editor, url);
        })
        .catch((error) => {
          console.error("Error uploading the file:", error);
        });
    } else {
      insertSpinner(editor, {});
      const url = await onUpload(file);
      if (!url) {
        console.log(
          "there is no url returned from onUpload function you provide"
        );

        return;
      }
      const x = getNode(editor, []);
      const elements: any = x?.children;
      const index = elements?.findIndex((el: any) => el?.type === "spinner");

      removeNodes(editor, {
        at: [index],
      });
      insertImage(editor, url);
    }
  };
  Array.from(files).forEach((file) => {
    uploadFile(file);
  });
  //   uploadFile(files[0]);
  return;
};
