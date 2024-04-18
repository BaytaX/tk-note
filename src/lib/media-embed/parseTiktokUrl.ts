import { EmbedUrlData } from '@udecode/plate-media';

const tiktokRegex =
  /^https?:\/\/(?:www\.)?tiktok\.com\/@(?:[\w.-]+)\/video\/(\d+)/;

export const parseTikTokUrl = (url: string): EmbedUrlData | undefined => {
  const match = url.match(tiktokRegex);
  if (match) {
    // Extract the video ID from the URL
    const videoId = match[1];
    return {
      provider: 'tiktok',
      id: videoId,
      url,
    };
  }
};
