import {
  getParentNode,
  insertNodes,
  InsertNodesOptions,
  PlateEditor,
  PlatePluginKey,
  Value,
} from '@udecode/plate-common';
import { ELEMENT_MEDIA_EMBED, TMediaEmbedElement } from '@udecode/plate-media';

export const insertMediaEmbed = <V extends Value>(
  editor: PlateEditor<V>,
  {
    url = '',
    key = ELEMENT_MEDIA_EMBED,
  }: Partial<TMediaEmbedElement> & PlatePluginKey,
  options: InsertNodesOptions<V> = {}
): void => {
  if (!editor.selection) return;
  const selectionParentEntry = getParentNode(editor, editor.selection);
  if (!selectionParentEntry) return;
  const [, path] = selectionParentEntry;
  insertNodes<TMediaEmbedElement>(
    editor,
    {
      type: key,
      url,
      children: [{ text: '' }],
    },
    {
      at: path,
      nextBlock: true,
      ...(options as any),
    }
  );
};
