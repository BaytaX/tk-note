import { EmbedUrlData } from "@udecode/plate-media";

const cloudinaryRegex =
  /^https?:\/\/(?:res\.cloudinary\.com)\/(?:[^/]+)\/video\/upload\/v(?:\d+)\/(?:[^/]+)\/(?:[^/]+)\.(?:mp4|webm|ogg|mov|avi|wmv)/;

export const parseCloudinaryUrl = (url: string): EmbedUrlData | undefined => {
  if (url.match(cloudinaryRegex)) {
    return {
      provider: "cloudinary",
      url,
    };
  }
};
