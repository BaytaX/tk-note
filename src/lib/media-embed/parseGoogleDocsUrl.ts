import { EmbedUrlData } from "@udecode/plate-media";

const googleDocsRegex = /^https:\/\/docs\.google\.com\/document\/d\/[^\/]+\/?/;

export const parseGoogleDocsUrl = (url: string): EmbedUrlData | undefined => {
  if (url.match(googleDocsRegex)) {
    return {
      provider: "google_docs",
      url,
    };
  }
};
