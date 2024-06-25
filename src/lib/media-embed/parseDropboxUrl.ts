
import { EmbedUrlData } from "@udecode/plate-media";

const dropboxRegex =
  /^https:\/\/dl\.dropboxusercontent\.com\/scl\/fi\/ixpp62fwptjx1gxp7wz6g\/([a-zA-Z0-9_-]+)\.quicktime\?rlkey=lw8gtf8h3xjx9vkwnyaydgznl&dl=0/;

export const parseDropboxUrl = (url: string): EmbedUrlData | undefined => {
  if (url.match(dropboxRegex)) {
    return {
      provider: "dropboxusercontent",
      url,
    };
  }
};