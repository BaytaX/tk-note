import { useRef } from "react";

/**
 * Usage:
 * const [blockScroll, allowScroll] = useScrollBlock();
 */
export const useScrollBlock = (): [() => void, () => void] => {
  const navbarWidth: any = document.querySelector(".navbar")?.clientWidth;
  const editorBodyWidth: any = document.querySelector(".scroll")?.clientWidth;

  let isThereIsScollBar = navbarWidth > editorBodyWidth;

  const scrollBlocked = useRef(false);

  const editorContainer: any = document.querySelector(".blockScrollMain");
  const blockScroll = (): void => {
    if (document === undefined || editorContainer === null) return;

    editorContainer.style.overflow = "hidden";
    editorContainer.style.paddingRight = isThereIsScollBar ? "15px" : "0px";
    scrollBlocked.current = true;
  };

  const allowScroll = (): void => {
    if (document === undefined || editorContainer === null) return;

    editorContainer.style.overflow = "auto";
    editorContainer.style.paddingRight = "0px";

    scrollBlocked.current = false;
  };

  return [blockScroll, allowScroll];
};
