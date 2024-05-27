import { EmbedUrlData } from "@udecode/plate-media";

const figmaRegex = /^https:\/\/www\.figma\.com\/design\/[^\/]+\/[^\/]+\/?/;

export const parseFigmaUrl = (url: string): EmbedUrlData | undefined => {
  const match = url.match(figmaRegex);
  if (match) {
    const embedUrl = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
    return {
      provider: "figma",
      url: embedUrl,
    };
  }
  return undefined;
};
