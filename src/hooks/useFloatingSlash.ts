import React from "react";
import {
  getSelectionText,
  isSelectionExpanded,
  mergeProps,
  useEditorSelector,
  useEventEditorSelectors,
  usePlateSelectors,
} from "@udecode/plate-common";
import {
  getSelectionBoundingClientRect,
  useVirtualFloating,
  UseVirtualFloatingOptions,
} from "@udecode/plate-floating";
import { useFocused } from "slate-react";

export type FloatingToolbarState = {
  floatingOptions?: UseVirtualFloatingOptions;
  ignoreReadOnly?: boolean;
  hideToolbar?: boolean;
};

export const useFloatingToolbarState = ({
  floatingOptions,
  hideToolbar,
  ignoreReadOnly,
}: FloatingToolbarState) => {
  const editorId = usePlateSelectors().id();
  const selectionExpanded = useEditorSelector(isSelectionExpanded, []);
  const selectionText = useEditorSelector(getSelectionText, []);

  const focusedEditorId = useEventEditorSelectors.focus();
  const focused = useFocused();

  const [open, setOpen] = React.useState(false);
  const [waitForCollapsedSelection, setWaitForCollapsedSelection] =
    React.useState(false);

  const floating = useVirtualFloating(
    mergeProps(
      {
        getBoundingClientRect: getSelectionBoundingClientRect,
        open,
        onOpenChange: setOpen,
      },
      floatingOptions
    )
  );

  return {
    editorId,
    open,
    setOpen,
    waitForCollapsedSelection,
    setWaitForCollapsedSelection,
    selectionExpanded,
    selectionText,
    focused,
    focusedEditorId,
    ignoreReadOnly,
    hideToolbar,
    floating,
  };
};

export const useFloatingToolbar = ({
  selectionExpanded,
  setWaitForCollapsedSelection,
  open,
  setOpen,
  focused,
  floating,
  ignoreReadOnly,
}: ReturnType<typeof useFloatingToolbarState>) => {
  // On refocus, the editor keeps the previous selection,
  // so we need to wait it's collapsed at the new position before displaying the floating toolbar.
  React.useEffect(() => {
    if (!focused || ignoreReadOnly) {
      setWaitForCollapsedSelection(true);
    }

    if (!selectionExpanded) {
      setWaitForCollapsedSelection(false);
    }
  }, [
    focused,
    ignoreReadOnly,
    selectionExpanded,
    setWaitForCollapsedSelection,
  ]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectionExpanded && event.key === "/" && !open) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, setOpen]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [floating, setOpen]);

  return {
    ref: floating.refs.setFloating,
    props: {
      style: floating.style,
    },
    hidden: !open,
  };
};
