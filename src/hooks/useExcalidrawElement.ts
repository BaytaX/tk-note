import React from "react";
import {
  ExcalidrawImperativeAPI,
  LibraryItems,
} from "@excalidraw/excalidraw/types/types";
import { TExcalidrawElement } from "@udecode/plate-excalidraw";

export const useExcalidrawElement = ({
  element,
  libraryItems = [],
  scrollToContent = true,
}: {
  element: TExcalidrawElement;
  scrollToContent?: boolean;
  libraryItems?: LibraryItems;
}) => {
  const [Excalidraw, setExcalidraw] = React.useState<any>(null);
  React.useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) =>
      setExcalidraw(comp.Excalidraw)
    );
  });

  const _excalidrawRef = React.useRef<ExcalidrawImperativeAPI>(null);

  // const editor = useEditorRef();

  const excalidrawProps: any = {
    excalidrawRef: _excalidrawRef,
    initialData: {
      elements: element.data?.elements,
      appState: element.data?.state,
      scrollToContent,
      libraryItems,
    },
    autoFocus: false,
    // onChange: (elements: readonly ExcalidrawElementType[], state: AppState) => {
    // const path = findNodePath(editor, element);

    // FIXME: setNodes triggers render loop as onChange is triggered on rerender
    // in the meantime, the prop can be used to save the data outside slate
    // setNodes(editor, { data: { elements, state } }, { at: path });
    // },
  };

  return {
    Excalidraw,
    excalidrawProps,
  };
};
