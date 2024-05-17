import { ComboboxProps } from "@udecode/plate-combobox";
import { getPluginOptions, useEditorRef } from "@udecode/plate-common";
import { ELEMENT_MENTION, MentionPlugin } from "@udecode/plate-mention";
import { ComboboxMention } from "../combobox-mention/combobox-mention";
import { getMentionOnSelectItem } from "../../../lib/plate/getMentionOnSelectItem";

export function MentionCombobox({
  pluginKey = ELEMENT_MENTION,
  id = pluginKey,
  MentionComponentItem,
  mentionComponentClassName,
  ...props
}: Partial<ComboboxProps> & {
  pluginKey?: string;
  MentionComponentItem?: any;
  mentionComponentClassName?: string;
}) {
  const editor = useEditorRef();

  const { trigger } = getPluginOptions<MentionPlugin>(editor, pluginKey);

  return (
    <div onMouseDown={(e) => e.preventDefault()}>
      <ComboboxMention
        id={id}
        trigger={trigger!}
        controlled
        onSelectItem={getMentionOnSelectItem({
          key: pluginKey,
        })}
        MentionComponentItem={MentionComponentItem}
        mentionComponentClassName={mentionComponentClassName}
        {...props}
      />
    </div>
  );
}
