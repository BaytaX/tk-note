import { createPluginFactory, removeNodes } from "@udecode/plate-common";

import type { SlashPlugin } from "./types";

import { slashOnKeyDownHandler } from "./handlers/slashOnKeyDownHandler";
import { isSelectionInSlashInput } from "./queries/index";
import { withSlashCommand } from "./withSlashCommand";

export const KEY_SLASH_AR_COMMAND = "slash_ar_command";

export const ELEMENT_SLASH_AR_INPUT = "slash_ar_input";
/** Enables support for autocompleting /slash_command. */

export const createSlashArPlugin = createPluginFactory<SlashPlugin>({
  handlers: {
    onBlur: (editor) => () => {
      // remove slash_input nodes from editor on blur
      removeNodes(editor, {
        at: [],
        match: (n) => n.type === ELEMENT_SLASH_AR_INPUT,
      });
    },
    onKeyDown: slashOnKeyDownHandler({ query: isSelectionInSlashInput }),
  },
  key: KEY_SLASH_AR_COMMAND,
  options: {
    createSlashNode: (item) => ({ value: item.text }),
    trigger: "\\",
    triggerPreviousCharPattern: /^\s?$/,
  },
  plugins: [
    {
      isElement: true,
      isInline: true,
      key: ELEMENT_SLASH_AR_INPUT,
    },
  ],
  then: (editor, { key }) => ({
    options: {
      id: key,
    },
  }),
  withOverrides: withSlashCommand,
});
