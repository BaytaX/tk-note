import {
  getParentNode,
  insertNodes,
  InsertNodesOptions,
  PlateEditor,
  PlatePluginKey,
  Value,
} from "@udecode/plate-common";
import { ELEMENT_UPLOAD_FILE } from "./plate-ui/file-upload";

export const insertFile = <V extends Value>(
  editor: PlateEditor<V>,
  { file, key = ELEMENT_UPLOAD_FILE }: any & PlatePluginKey,
  options: InsertNodesOptions<V> = {}
): void => {
  if (!editor.selection) return;
  const selectionParentEntry = getParentNode(editor, editor.selection);
  if (!selectionParentEntry) return;
  const [, path] = selectionParentEntry;
  insertNodes<any>(
    editor,
    {
      type: key,
      file,
      children: [{ text: "" }],
    },
    {
      at: path,
      nextBlock: true,
      ...(options as any),
    }
  );
};
