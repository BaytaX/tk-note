import React from "react";
import { TElement, useElement } from "@udecode/plate-common";
import { useFocused, useReadOnly, useSelected } from "slate-react";

import { VIDEO_PROVIDERS } from "../media-embed";

interface TMediaElement extends TElement {
  url: string;
  align?: "left" | "center" | "right";
}

export type EmbedUrlData = {
  url?: string;
  provider?: string;
  id?: string;
};

export type EmbedUrlParser = (url: string) => EmbedUrlData | undefined;

export const useMediaState = ({
  urlParsers,
}: {
  urlParsers?: EmbedUrlParser[];
} = {}) => {
  const element = useElement<TMediaElement>();
  const focused = useFocused();
  const selected = useSelected();
  const readOnly = useReadOnly();

  const { url, align } = element;

  const embed = React.useMemo(() => {
    if (!urlParsers) return;

    for (const parser of urlParsers) {
      const data = parser(url);
      if (data?.url) {
        return data;
      }
    }
  }, [urlParsers, url]);

  const isTweet = embed?.provider === "twitter";
  const isVideo = !!embed?.provider && VIDEO_PROVIDERS.includes(embed.provider);
  const isYoutube = embed?.provider === "youtube";
  const isFacebook = embed?.provider === "facebook";
  const isInstagram = embed?.provider === "instagram";
  const isLinkedIn = embed?.provider === "linkedin";
  const isTiktok = embed?.provider === "tiktok";

  return {
    align,
    focused,
    selected,
    readOnly,
    embed,
    isTweet,
    isVideo,
    isYoutube,
    isFacebook,
    isInstagram,
    isLinkedIn,
    isTiktok,
  };
};
