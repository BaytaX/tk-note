import { EmbedUrlData } from "@udecode/plate-media";

const facebookRegex =
  /^https?:\/\/(?:www\.)?(?:facebook\.com|fb\.me)\/(?:\w+\/)?(?:posts?|photos?|videos?|watch|events)\/(?:\d+|[a-zA-Z0-9.-]+)\/?/;

export const parseFacebookUrl = (url: string): EmbedUrlData | undefined => {
  if (url.match(facebookRegex)) {
    return {
      provider: "facebook",
      url,
    };
  }
};
