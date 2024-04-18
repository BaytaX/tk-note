import { EmbedUrlData } from '@udecode/plate-media';

const instagramRegex =
  /^https?:\/\/(?:www\.)?(?:instagram\.com|instagr\.am)\/(?:p|tv|reel)\/([a-zA-Z0-9_-]+)\/?/;

export const parseInstagramUrl = (url: string): EmbedUrlData | undefined => {
  const match = url.match(instagramRegex);
  if (match) {
    // Extract the post ID from the URL
    const postId = match[1];
    // Construct the embed URL

    return {
      provider: 'instagram',
      id: postId,
      url,
    };
  }
};
