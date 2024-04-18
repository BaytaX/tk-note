import { createPluginFactory } from "@udecode/plate-common";
import { MediaPlugin } from "@udecode/plate-media";

import { parseIframeUrl } from "./parseIframeUrl";

export const ELEMENT_MEDIA_EMBED = "media_embed";

/**
 * Enables support for embeddable media such as YouTube
 * or Vimeo videos, Instagram posts and tweets or Google Maps.
 */
export const createMediaEmbedPlugin = createPluginFactory<MediaPlugin>({
  key: ELEMENT_MEDIA_EMBED,
  isElement: true,
  isVoid: true,
  options: {
    transformUrl: parseIframeUrl,
  },
  then: ({ type }) => ({
    deserializeHtml: {
      rules: [
        {
          validNodeName: "IFRAME",
        },
      ],
      getNode: (el: HTMLElement) => {
        const url = el.getAttribute("src");
        if (url) {
          return {
            type,
            url,
          };
        }
      },
    },
  }),
});
