import { EmbedUrlData } from "@udecode/plate-media";

const cloudinaryRegex =
  /^https:\/\/res\.cloudinary\.com\/[^\/]+\/video\/upload\/v\d+\/[^\/]+\.mp4$/;

export const parseCloudinaryUrl = (url: string): EmbedUrlData | undefined => {
  if (url.match(cloudinaryRegex)) {
    return {
      provider: "cloudinary",
      url,
    };
  }
};
