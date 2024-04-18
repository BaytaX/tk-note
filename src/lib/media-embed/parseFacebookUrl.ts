import { EmbedUrlData } from '@udecode/plate-media';

const facebookRegex =
  /^https?:\/\/(?:www\.)?(?:facebook\.com|fb\.me)\/(?:\w+\/)?(?:posts?|photos?|videos?|watch|events)\/(?:\d+|[a-zA-Z0-9.-]+)\/?/;

export const parseFacebookUrl = (url: string): EmbedUrlData | undefined => {
  if (url.match(facebookRegex)) {
    // You may need to extract the post ID from the URL to include in the embed data
    // For simplicity, this example assumes the URL itself is sufficient
    return {
      provider: 'facebook',
      url,
    };
  }
};
