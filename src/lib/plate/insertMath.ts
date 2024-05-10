import {
  getParentNode,
  insertNodes,
  InsertNodesOptions,
  PlateEditor,
  PlatePluginKey,
  Value,
} from "@udecode/plate-common";
import { ELEMENT_MATH } from "../../components/plate-ui/math-element/math-element";

export const insertMath = <V extends Value>(
  editor: PlateEditor<V>,
  { mathValue, key = ELEMENT_MATH }: any & PlatePluginKey,
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
      mathValue,
      children: [{ text: "" }],
    },
    {
      at: path,
      nextBlock: true,
      ...(options as any),
    }
  );
};
