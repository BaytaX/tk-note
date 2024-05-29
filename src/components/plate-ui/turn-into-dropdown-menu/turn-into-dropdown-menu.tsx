import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { ELEMENT_BLOCKQUOTE } from "@udecode/plate-block-quote";
import {
  collapseSelection,
  findNode,
  focusEditor,
  isBlock,
  setElements,
  TElement,
  toggleNodeType,
  useEditorRef,
  useEditorSelector,
} from "@udecode/plate-common";
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3 } from "@udecode/plate-heading";
import { toggleIndentList } from "@udecode/plate-indent-list";
import { ELEMENT_TODO_LI, unwrapList } from "@udecode/plate-list";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";

import { Icons } from "../icons/icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from "../dropdown-menu/dropdown-menu";
import { ToolbarButton } from "../toolbar/toolbar";

const items = [
  {
    value: ELEMENT_PARAGRAPH,
    label: "Paragraph",
    description: "Paragraph",
    icon: Icons.paragraph,
  },
  {
    value: ELEMENT_H1,
    label: "Heading 1",
    description: "Heading 1",
    icon: Icons.h1,
  },
  {
    value: ELEMENT_H2,
    label: "Heading 2",
    description: "Heading 2",
    icon: Icons.h2,
  },
  {
    value: ELEMENT_H3,
    label: "Heading 3",
    description: "Heading 3",
    icon: Icons.h3,
  },
  {
    value: ELEMENT_TODO_LI,
    label: "Todo",
    description: "Todo",
    icon: Icons.square,
  },
  {
    value: ELEMENT_BLOCKQUOTE,
    label: "Quote",
    description: "Quote (⌘+⇧+.)",
    icon: Icons.blockquote,
  },
  {
    value: "disc",
    label: "Bulleted list",
    description: "Bulleted list",
    icon: Icons.ul,
  },
  {
    value: "decimal",
    label: "Numbered list",
    description: "Numbered list",
    icon: Icons.ol,
  },
];

const defaultItem = items.find((item) => item.value === ELEMENT_PARAGRAPH)!;

export function TurnIntoDropdownMenu(props: DropdownMenuProps) {
  const value: string = useEditorSelector((editor) => {
    // if (isCollapsed(editor.selection)) {
    const entry = findNode<TElement>(editor, {
      match: (n) => isBlock(editor, n),
    });

    if (entry) {
      return entry[0].type === "p" && !!entry[0].listStyleType
        ? items.find((item) => item.value === entry[0].listStyleType)?.value
        : items.find((item) => item.value === entry[0].type)?.value ??
            ELEMENT_PARAGRAPH;
    }

    return ELEMENT_PARAGRAPH;
  }, []);

  const editor = useEditorRef();
  const openState = useOpenState();
  const selectedItem =
    items.find((item) => item.value === value) ?? defaultItem;
  const { icon: SelectedItemIcon, label: selectedItemLabel } = selectedItem;

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          pressed={openState.open}
          tooltip="Turn into"
          isDropdown
          className="lg:min-w-[130px]"
        >
          <SelectedItemIcon className="size-5 lg:hidden" />
          <span className="max-lg:hidden">{selectedItemLabel}</span>
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-0 !z-[9999999]">
        <DropdownMenuLabel>Turn into</DropdownMenuLabel>

        <DropdownMenuRadioGroup
          className="flex flex-col gap-0.5"
          value={value}
          onValueChange={(type) => {
            if (type === "disc" || type === "decimal") {
              toggleNodeType(editor, { activeType: "p" });
              toggleIndentList(editor, {
                listStyleType: type === "disc" ? "disc" : "decimal",
              });
            } else {
              setElements(editor, {
                listStyleType: null,
                indent: null,
                listStart: null,
              });
              unwrapList(editor);
              toggleNodeType(editor, { activeType: type });
            }

            collapseSelection(editor);
            focusEditor(editor);
          }}
        >
          {items.map(({ value: itemValue, label, icon: Icon }) => (
            <DropdownMenuRadioItem
              key={itemValue}
              value={itemValue}
              className="min-w-[180px]"
            >
              <Icon className="mr-2 size-5" />
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
