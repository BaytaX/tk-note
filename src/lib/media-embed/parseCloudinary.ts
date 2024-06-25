import { EmbedUrlData } from "@udecode/plate-media";

const cloudinaryRegex = /^https:\/\/res\.cloudinary\.com\/[^\/]+\/(image|video)\/upload\/v\d+\/[^\/]+\.[a-z0-9]+$/;

export const parseCloudinaryUrl = (url: string): EmbedUrlData | undefined => {
  if (url.match(cloudinaryRegex)) {
    return {
      provider: "cloudinary",
      url,
    };
  }
};
