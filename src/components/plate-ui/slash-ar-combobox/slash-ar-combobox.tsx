import { ComboboxProps } from "@udecode/plate-combobox";
import { getPluginOptions, useEditorRef } from "@udecode/plate-common";
import {
  getSlashOnSelectItem,
  SlashPlugin,
} from "@udecode/plate-slash-command";
import { KEY_SLASH_AR_COMMAND } from "../../../lib/plate/ar-slash";
import { ComboboxArSlash } from "../combobox-ar-slash/combobox-ar-slash";

export function SlashArCombobox({
  pluginKey = KEY_SLASH_AR_COMMAND,
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
      <ComboboxArSlash
        id={id}
        trigger={trigger!}
        controlled
        onSelectItem={getSlashOnSelectItem({
          key: pluginKey,
        })}
        {...props}
        slashComponentClassName={slashComponentClassName}
        slashItemClassName={slashItemClassName}
      />
    </div>
  );
}
