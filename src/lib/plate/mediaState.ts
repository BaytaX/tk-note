import React from "react";
import { TElement, useElement } from "@udecode/plate-common";
import { useFocused, useReadOnly, useSelected } from "slate-react";

import { VIDEO_PROVIDERS } from "../media-embed";

interface TMediaElement extends TElement {
  url: string;
  align?: "center" | "right" | "left";
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

  // const [align, setAlign] = useState("center");

  // const handleChangeAlign = (value: "center" | "left" | "right") => {
  //   setAlign(value);
  //   console.log(value);
  //   console.log(align);
  // };

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
  const isCloudinary = embed?.provider === "cloudinary" ;
  const isGoogleDocs = embed?.provider === "google_docs";
  const isDropbox = embed?.provider === "dropboxusercontent";
  // const isGoogleSlides = embed?.provider === "google_slides";
  const isGoogleSheets = embed?.provider === "google_sheets";
  const isFigma = embed?.provider === "figma";
  const isAnywebiste = embed?.provider === "any-website";

  return {
    align,
    // handleChangeAlign,
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
    isCloudinary,
    isDropbox,
    isGoogleDocs,
    // isGoogleSlides,
    isGoogleSheets,
    isFigma,
    isAnywebiste,
  };
};
