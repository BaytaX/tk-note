
import { EmbedUrlData } from "@udecode/plate-media";



export const parseDropboxUrl = (url: string): EmbedUrlData | undefined => {
  if (url.includes("dropboxusercontent")) {
    return {
      provider: "dropboxusercontent",
      url,
    };
  }
};