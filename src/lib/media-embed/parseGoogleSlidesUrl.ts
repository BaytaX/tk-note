import { EmbedUrlData } from "@udecode/plate-media";

const googleSlidesRegex =
  /^https:\/\/docs\.google\.com\/presentation\/d\/[^\/]+\/?/;

export const parseGoogleSlidesUrl = (url: string): EmbedUrlData | undefined => {
  if (url.match(googleSlidesRegex)) {
    return {
      provider: "google_slides",
      url,
    };
  }
};
