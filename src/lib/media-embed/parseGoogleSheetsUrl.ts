import { EmbedUrlData } from "@udecode/plate-media";

const googleSheetsRegex =
  /^https:\/\/docs\.google\.com\/spreadsheets\/d\/[^\/]+\/?/;

export const parseGoogleSheetsUrl = (url: string): EmbedUrlData | undefined => {
  if (url.match(googleSheetsRegex)) {
    return {
      provider: "google_sheets",
      url,
    };
  }
};
