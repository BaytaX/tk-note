import { ComboboxProps } from "@udecode/plate-combobox";
import { getPluginOptions, useEditorRef } from "@udecode/plate-common";
import {
  getSlashOnSelectItem,
  KEY_SLASH_COMMAND,
  SlashPlugin,
} from "@udecode/plate-slash-command";
import { ComboboxSlash } from "../combobox-slash/combobox-slash";

export function SlashCombobox({
  pluginKey = KEY_SLASH_COMMAND,
  id = pluginKey,
  slashComponentClassName,
  slashItemClassName,
  ...props
}: Partial<ComboboxProps> & {
  pluginKey?: string;
  slashComponentClassName?: string;
  slashItemClassName?: string;
}) {
  const editor = useEditorRef();

  const { trigger } = getPluginOptions<SlashPlugin>(editor, pluginKey);

  return (
    <div onMouseDown={(e) => e.stopPropagation()}>
      <ComboboxSlash
        id={id}
        trigger={trigger!}
        controlled
        onSelectItem={getSlashOnSelectItem({
          key: pluginKey,
        })}
        slashComponentClassName={slashComponentClassName}
        slashItemClassName={slashItemClassName}
        {...props}
      />
    </div>
  );
}
