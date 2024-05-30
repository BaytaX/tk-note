import {
  type ComboboxOnSelectItem,
  type Data,
  type NoData,
  type TComboboxItem,
  comboboxActions,
  comboboxSelectors,
} from "@udecode/plate-combobox";
import {
  type PlatePluginKey,
  type TNodeProps,
  getBlockAbove,
  getPlugin,
  insertNodes,
  insertText,
  isEndPoint,
  moveSelection,
  removeNodes,
  select,
  withoutMergingHistory,
  withoutNormalizing,
} from "@udecode/plate-common";
import {
  ELEMENT_MENTION,
  isNodeMentionInput,
  MentionPlugin,
  TMentionElement,
} from "@udecode/plate-mention";

export type CreateMentionNode<TData extends Data> = (
  item: TComboboxItem<TData>,
  meta: CreateMentionNodeMeta
) => TNodeProps<TMentionElement>;

export interface CreateMentionNodeMeta {
  search: string;
}

export const getMentionOnSelectItem =
  <TData extends Data = NoData>({
    key = ELEMENT_MENTION,
  }: PlatePluginKey = {}): ComboboxOnSelectItem<TData> =>
  (editor, item: any) => {
    
    const targetRange = comboboxSelectors.targetRange();

    if (!targetRange) return;

    const {
      options: { insertSpaceAfterMention },
      type,
    } = getPlugin<MentionPlugin>(editor as any, key);

    const pathAbove = getBlockAbove(editor)?.[1];
    const isBlockEnd = () =>
      editor.selection &&
      pathAbove &&
      isEndPoint(editor, editor.selection.anchor, pathAbove);

    withoutNormalizing(editor, () => {
      // Selectors are sensitive to operations, it's better to create everything
      // before the editor state is changed. For example, asking for text after
      // removeNodes below will return null.
      // const props = createMentionNode!(item, {
      //   search: comboboxSelectors.text() ?? "",
      // });

      const props = {
        value: item.text,
        link: item.link,
        key: item.key,
        avatar: item.avatar,
      };
      select(editor, targetRange);

      withoutMergingHistory(editor, () =>
        removeNodes(editor, {
          match: (node) => isNodeMentionInput(editor, node),
        })
      );

      insertNodes<TMentionElement>(editor, {
        children: [{ text: "" }],
        type,
        ...props,
      } as TMentionElement);

      // move the selection after the element
      moveSelection(editor, { unit: "offset" });

      if (isBlockEnd() && insertSpaceAfterMention) {
        insertText(editor, " ");
      }
    });

    return comboboxActions.reset();
  };
