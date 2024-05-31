import { cn, withRef } from "@udecode/cn";
import { PlateElement, withHOC } from "@udecode/plate-common";
import { ELEMENT_MEDIA_EMBED, parseTwitterUrl } from "@udecode/plate-media";
import { ResizableProvider, useResizableStore } from "@udecode/plate-resizable";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
// import ReactGoogleSlides from "react-google-slides";

import {
  FacebookEmbed,
  InstagramEmbed,
  LinkedInEmbed,
  TikTokEmbed,
} from "react-social-media-embed";
import { Tweet } from "react-tweet";

import { parseVideoUrl } from "../../../lib/media-embed";
import { parseFacebookUrl } from "../../../lib/media-embed/parseFacebookUrl";
import { parseInstagramUrl } from "../../../lib/media-embed/parseInstagramUrl";
import { parseLinkedInUrl } from "../../../lib/media-embed/parseLinkedInUrl";
import { parseTikTokUrl } from "../../../lib/media-embed/parseTiktokUrl";
import { useMediaState } from "../../../lib/plate/mediaState";

import { Caption, CaptionTextarea } from "../caption/caption";
import { MediaPopover } from "../media-popover/media-popover";
import {
  mediaResizeHandleVariants,
  Resizable,
  ResizeHandle,
} from "../resizable/resizable";
import { parseCloudinaryUrl } from "../../../lib/media-embed/parseCloudinary";
import { VideoPlayer } from "vidify";
import { parseGoogleDocsUrl } from "../../../lib/media-embed/parseGoogleDocsUrl";
import { parseGoogleSheetsUrl } from "../../../lib/media-embed/parseGoogleSheetsUrl";
// import { parseGoogleSlidesUrl } from "../../../lib/media-embed/parseGoogleSlidesUrl";
import { parseFigmaUrl } from "../../../lib/media-embed/parseFigmaUrl";
import { parseAnyWebsiteUrl } from "../../../lib/media-embed/parseAnyWebsiteUrl";

export const MediaEmbedElement = withHOC(
  ResizableProvider,
  withRef<typeof PlateElement>(({ className, children, ...props }, ref) => {
    const {
      align = "center",
      focused,
      readOnly,
      selected,
      embed,
      isTweet,
      isVideo,
      isYoutube,
      isFacebook,
      isInstagram,
      isLinkedIn,
      isTiktok,
      isCloudinary,
      isGoogleDocs,
      // isGoogleSlides,
      isGoogleSheets,
      isFigma,
      isAnywebiste,
    } = useMediaState({
      urlParsers: [
        parseTwitterUrl,
        parseVideoUrl,
        parseFacebookUrl,
        parseInstagramUrl,
        parseLinkedInUrl,
        parseTikTokUrl,
        parseCloudinaryUrl,
        parseGoogleDocsUrl,
        parseGoogleSheetsUrl,
        // parseGoogleSlidesUrl,
        parseFigmaUrl,
        parseAnyWebsiteUrl,
      ],
    });
    const width = useResizableStore().get.width();
    const provider = embed?.provider;

    return (
      <MediaPopover pluginKey={ELEMENT_MEDIA_EMBED}>
        <PlateElement
          ref={ref}
          className={cn("relative py-2.5", className)}
          {...props}
        >
          <figure className="group relative m-0 w-full" contentEditable={false}>
            <Resizable
              align={align}
              options={{
                align,
                maxWidth: isTweet ? 550 : "100%",
                minWidth: isTweet ? 300 : 100,
              }}
            >
              {readOnly ? (
                <>
                  {isVideo ? (
                    isYoutube ? (
                      <LiteYouTubeEmbed
                        id={embed!.id!}
                        title="youtube"
                        wrapperClass={cn(
                          "rounded-sm",
                          focused &&
                            selected &&
                            "ring-2 ring-ring ring-offset-2",
                          "relative block cursor-pointer bg-black bg-cover bg-center [contain:content]",
                          "[&.lyt-activated]:before:absolute [&.lyt-activated]:before:top-0 [&.lyt-activated]:before:h-[60px] [&.lyt-activated]:before:w-full [&.lyt-activated]:before:bg-top [&.lyt-activated]:before:bg-repeat-x [&.lyt-activated]:before:pb-[50px] [&.lyt-activated]:before:[transition:all_0.2s_cubic-bezier(0,_0,_0.2,_1)]",
                          "[&.lyt-activated]:before:bg-[url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==)]",
                          'after:block after:pb-[var(--aspect-ratio)] after:content-[""]',
                          "[&_>_iframe]:absolute [&_>_iframe]:left-0 [&_>_iframe]:top-0 [&_>_iframe]:size-full",
                          "[&_>_.lty-playbtn]:z-[1] [&_>_.lty-playbtn]:h-[46px] [&_>_.lty-playbtn]:w-[70px] [&_>_.lty-playbtn]:rounded-[14%] [&_>_.lty-playbtn]:bg-[#212121] [&_>_.lty-playbtn]:opacity-80 [&_>_.lty-playbtn]:[transition:all_0.2s_cubic-bezier(0,_0,_0.2,_1)]",
                          "[&:hover_>_.lty-playbtn]:bg-[red] [&:hover_>_.lty-playbtn]:opacity-100",
                          '[&_>_.lty-playbtn]:before:border-y-[11px] [&_>_.lty-playbtn]:before:border-l-[19px] [&_>_.lty-playbtn]:before:border-r-0 [&_>_.lty-playbtn]:before:border-[transparent_transparent_transparent_#fff] [&_>_.lty-playbtn]:before:content-[""]',
                          "[&_>_.lty-playbtn]:absolute [&_>_.lty-playbtn]:left-1/2 [&_>_.lty-playbtn]:top-1/2 [&_>_.lty-playbtn]:[transform:translate3d(-50%,-50%,0)]",
                          "[&_>_.lty-playbtn]:before:absolute [&_>_.lty-playbtn]:before:left-1/2 [&_>_.lty-playbtn]:before:top-1/2 [&_>_.lty-playbtn]:before:[transform:translate3d(-50%,-50%,0)]",
                          "[&.lyt-activated]:cursor-[unset]",
                          "[&.lyt-activated]:before:pointer-events-none [&.lyt-activated]:before:opacity-0",
                          "[&.lyt-activated_>_.lty-playbtn]:pointer-events-none [&.lyt-activated_>_.lty-playbtn]:!opacity-0"
                        )}
                      />
                    ) : (
                      <div
                        className={cn(
                          provider === "vimeo" && "pb-[75%]",
                          provider === "youku" && "pb-[56.25%]",
                          provider === "dailymotion" && "pb-[56.0417%]",
                          provider === "coub" && "pb-[51.25%]"
                        )}
                      >
                        <iframe
                          className={cn(
                            "absolute left-0 top-0 size-full rounded-sm",
                            isVideo && "border-0",
                            focused &&
                              selected &&
                              "ring-2 ring-ring ring-offset-2"
                          )}
                          src={embed!.url}
                          title="embed"
                          allowFullScreen
                        />
                      </div>
                    )
                  ) : null}

                  {isTweet && (
                    <div
                      className={cn(
                        "[&_.react-tweet-theme]:my-0",
                        !readOnly &&
                          selected &&
                          "[&_.react-tweet-theme]:ring-2 [&_.react-tweet-theme]:ring-ring [&_.react-tweet-theme]:ring-offset-2"
                      )}
                    >
                      <Tweet id={embed!.id!} />
                    </div>
                  )}
                  {isFacebook && (
                    <div>
                      <FacebookEmbed
                        url={embed?.url as string}
                        width={"auto"}
                      />
                    </div>
                  )}
                  {isInstagram && (
                    <div>
                      <InstagramEmbed
                        url={embed?.url as string}
                        width={"auto"}
                        captioned
                      />
                    </div>
                  )}
                  {isLinkedIn && (
                    <div>
                      <LinkedInEmbed
                        url={embed?.url as string}
                        width={"auto"}
                      />
                    </div>
                  )}
                  {isTiktok && (
                    <div>
                      <TikTokEmbed url={embed?.url as string} width={"auto"} />
                    </div>
                  )}
                  {isCloudinary && (
                    <div>
                      <VideoPlayer src={embed?.url as string} />
                    </div>
                  )}
                  {/* {isGoogleSlides && (
                    <div>
                      <ReactGoogleSlides
                        width={"100%"}
                        slidesLink={embed?.url as string}
                        slideDuration={5}
                        position={1}
                        showControls
                        loop
                      />
                    </div>
                  )} */}
                  {(isGoogleDocs || isGoogleSheets) && (
                    <div>
                      <iframe
                        src={embed?.url as string}
                        width="100%"
                        height="600px"
                      />
                    </div>
                  )}
                  {isFigma && (
                    <div>
                      <iframe
                        src={embed?.url as string}
                        width="100%"
                        height="600px"
                      />
                    </div>
                  )}
                  {isAnywebiste && (
                    <iframe
                      src={embed?.url as string}
                      width="100%"
                      height="600px"
                    ></iframe>
                  )}
                </>
              ) : (
                <>
                  <ResizeHandle
                    options={{ direction: "left" }}
                    className={mediaResizeHandleVariants({ direction: "left" })}
                  />

                  {isVideo ? (
                    isYoutube ? (
                      <LiteYouTubeEmbed
                        id={embed!.id!}
                        title="youtube"
                        wrapperClass={cn(
                          "rounded-sm",
                          focused &&
                            selected &&
                            "ring-2 ring-ring ring-offset-2",
                          "relative block cursor-pointer bg-black bg-cover bg-center [contain:content]",
                          "[&.lyt-activated]:before:absolute [&.lyt-activated]:before:top-0 [&.lyt-activated]:before:h-[60px] [&.lyt-activated]:before:w-full [&.lyt-activated]:before:bg-top [&.lyt-activated]:before:bg-repeat-x [&.lyt-activated]:before:pb-[50px] [&.lyt-activated]:before:[transition:all_0.2s_cubic-bezier(0,_0,_0.2,_1)]",
                          "[&.lyt-activated]:before:bg-[url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==)]",
                          'after:block after:pb-[var(--aspect-ratio)] after:content-[""]',
                          "[&_>_iframe]:absolute [&_>_iframe]:left-0 [&_>_iframe]:top-0 [&_>_iframe]:size-full",
                          "[&_>_.lty-playbtn]:z-[1] [&_>_.lty-playbtn]:h-[46px] [&_>_.lty-playbtn]:w-[70px] [&_>_.lty-playbtn]:rounded-[14%] [&_>_.lty-playbtn]:bg-[#212121] [&_>_.lty-playbtn]:opacity-80 [&_>_.lty-playbtn]:[transition:all_0.2s_cubic-bezier(0,_0,_0.2,_1)]",
                          "[&:hover_>_.lty-playbtn]:bg-[red] [&:hover_>_.lty-playbtn]:opacity-100",
                          '[&_>_.lty-playbtn]:before:border-y-[11px] [&_>_.lty-playbtn]:before:border-l-[19px] [&_>_.lty-playbtn]:before:border-r-0 [&_>_.lty-playbtn]:before:border-[transparent_transparent_transparent_#fff] [&_>_.lty-playbtn]:before:content-[""]',
                          "[&_>_.lty-playbtn]:absolute [&_>_.lty-playbtn]:left-1/2 [&_>_.lty-playbtn]:top-1/2 [&_>_.lty-playbtn]:[transform:translate3d(-50%,-50%,0)]",
                          "[&_>_.lty-playbtn]:before:absolute [&_>_.lty-playbtn]:before:left-1/2 [&_>_.lty-playbtn]:before:top-1/2 [&_>_.lty-playbtn]:before:[transform:translate3d(-50%,-50%,0)]",
                          "[&.lyt-activated]:cursor-[unset]",
                          "[&.lyt-activated]:before:pointer-events-none [&.lyt-activated]:before:opacity-0",
                          "[&.lyt-activated_>_.lty-playbtn]:pointer-events-none [&.lyt-activated_>_.lty-playbtn]:!opacity-0"
                        )}
                      />
                    ) : (
                      <div
                        className={cn(
                          provider === "vimeo" && "pb-[75%]",
                          provider === "youku" && "pb-[56.25%]",
                          provider === "dailymotion" && "pb-[56.0417%]",
                          provider === "coub" && "pb-[51.25%]"
                        )}
                      >
                        <iframe
                          className={cn(
                            "absolute left-0 top-0 size-full rounded-sm",
                            isVideo && "border-0",
                            focused &&
                              selected &&
                              "ring-2 ring-ring ring-offset-2"
                          )}
                          src={embed!.url}
                          title="embed"
                          allowFullScreen
                        />
                      </div>
                    )
                  ) : null}

                  {isTweet && (
                    <div
                      className={cn(
                        "[&_.react-tweet-theme]:my-0",
                        !readOnly &&
                          selected &&
                          "[&_.react-tweet-theme]:ring-2 [&_.react-tweet-theme]:ring-ring [&_.react-tweet-theme]:ring-offset-2"
                      )}
                    >
                      <Tweet id={embed!.id!} />
                    </div>
                  )}
                  {isFacebook && (
                    <div>
                      <FacebookEmbed
                        url={embed?.url as string}
                        width={"auto"}
                      />
                    </div>
                  )}
                  {isInstagram && (
                    <div>
                      <InstagramEmbed
                        url={embed?.url as string}
                        width={"auto"}
                        captioned
                      />
                    </div>
                  )}
                  {isLinkedIn && (
                    <div>
                      <LinkedInEmbed
                        url={embed?.url as string}
                        width={"auto"}
                      />
                    </div>
                  )}
                  {isTiktok && (
                    <div>
                      <TikTokEmbed url={embed?.url as string} width={"auto"} />
                    </div>
                  )}
                  {isCloudinary && (
                    <div>
                      <VideoPlayer src={embed?.url as string} />
                    </div>
                  )}
                  {/* {isGoogleSlides && (
                    <div>
                      <ReactGoogleSlides
                        width={"100%"}
                        slidesLink={embed?.url as string}
                        slideDuration={5}
                        position={1}
                        showControls
                        loop
                      />
                    </div>
                  )} */}
                  {(isGoogleDocs || isGoogleSheets) && (
                    <div>
                      <iframe
                        src={embed?.url as string}
                        width="100%"
                        height="600px"
                      />
                    </div>
                  )}
                  {isFigma && (
                    <div>
                      <iframe
                        src={embed?.url as string}
                        width="100%"
                        height="600px"
                      />
                    </div>
                  )}
                  {isAnywebiste && (
                    <iframe
                      src={embed?.url as string}
                      width="100%"
                      height="600px"
                    ></iframe>
                  )}
                  <ResizeHandle
                    options={{ direction: "right" }}
                    className={mediaResizeHandleVariants({
                      direction: "right",
                    })}
                  />
                </>
              )}
            </Resizable>

            <Caption align={align} style={{ width }}>
              <CaptionTextarea placeholder="Write a caption..." />
            </Caption>
          </figure>

          {children}
        </PlateElement>
      </MediaPopover>
    );
  })
);
