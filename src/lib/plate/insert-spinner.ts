import {
  getParentNode,
  insertNodes,
  PlateEditor,
  PlatePluginKey,
  Value,
} from "@udecode/plate-common";
import { ELEMENT_SPINNER } from "../../components/plate-ui/spinner-element/spinner-element";

export const insertSpinner = <V extends Value>(
  editor: PlateEditor<V>,
  { key = ELEMENT_SPINNER }: any & PlatePluginKey
): void => {
  if (!editor.selection) return;
  const selectionParentEntry = getParentNode(editor, editor.selection);
  if (!selectionParentEntry) return;
  const [, path] = selectionParentEntry;
  insertNodes<any>(
    editor,
    {
      type: key,
      children: [{ text: "" }],
    },
    {
      at: path,
      nextBlock: true,
    }
  );
};
