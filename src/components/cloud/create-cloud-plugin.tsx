import { type Value, createPluginFactory } from "@udecode/plate-common/server";

import { onPasteCloud } from "./onPaste";

export const KEY_CLOUD = "cloud";

export const createCloudPlugin = createPluginFactory<Value>({
  handlers: {
    // onDrop: (editor) => (e) => onDropCloud(editor, e),
    onPaste: (editor) => (e) => onPasteCloud(editor, e),
  },
  key: KEY_CLOUD,
  // withOverrides: withCloud,
});
