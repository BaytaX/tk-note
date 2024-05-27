import { EmbedUrlData } from "@udecode/plate-media";

export const parseAnyWebsiteUrl = (url: string): EmbedUrlData | undefined => {
  return {
    provider: "any-website",
    url,
  };
};
