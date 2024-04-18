import { EmbedUrlData } from '@udecode/plate-media';

const linkedInRegex =
  /^https?:\/\/www\.linkedin\.com\/embed\/feed\/update\/urn:li:share:(\d+)/;

export const parseLinkedInUrl = (url: string): EmbedUrlData | undefined => {
  const match = url.match(linkedInRegex);
  if (match) {
    // Extract the post ID from the URL
    const postId = match[1];

    return {
      provider: 'linkedin',
      id: postId,
      url,
    };
  }
};
