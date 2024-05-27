import { useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import { cn, withRef } from "@udecode/cn";
import {
  comboboxActions,
  ComboboxContentProps,
  ComboboxProps,
  useActiveComboboxStore,
  useComboboxContent,
  useComboboxContentState,
  useComboboxControls,
  useComboboxItem,
  useComboboxSelectors,
} from "@udecode/plate-combobox";
import {
  useEditorRef,
  useEditorSelector,
  useEventEditorSelectors,
  usePlateSelectors,
} from "@udecode/plate-common";
import { createVirtualRef } from "@udecode/plate-floating";

export const ComboboxItem = withRef<"div", any>(
  (
    {
      combobox,
      index,
      item,
      onRenderItem,
      MentionComponentItem,
      className,
      ...rest
    },
    ref
  ) => {
    const { props } = useComboboxItem({ item, index, combobox, onRenderItem });

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-9 cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
          "hover:bg-accent hover:text-accent-foreground data-[highlighted=true]:bg-accent data-[highlighted=true]:text-accent-foreground",
          className
        )}
        {...props}
        {...rest}
      >
        <p>{item.text}</p>
      </div>
    );
  }
);

export function ComboboxContent(
  props: ComboboxContentProps & {
    MentionComponentItem?: any;
    mentionComponentClassName?: string;
  }
) {
  const {
    component: Component,
    MentionComponentItem,
    mentionComponentClassName,
    items,
    portalElement,
    combobox,
    onRenderItem,
  } = props;

  const editor = useEditorRef();

  const filteredItems = useComboboxSelectors.filteredItems();
  const activeComboboxStore = useActiveComboboxStore()!;

  const state = useComboboxContentState({ items, combobox });
  const { menuProps, targetRange } = useComboboxContent(state);

  return (
    <Popover.Root open>
      <Popover.PopoverAnchor
        virtualRef={createVirtualRef(editor, targetRange ?? undefined)}
      />

      <Popover.Portal container={portalElement}>
        <Popover.Content
          {...menuProps}
          sideOffset={5}
          side="bottom"
          align="start"
          className={cn(
            `
            ${mentionComponentClassName}`,
            !MentionComponentItem &&
              "z-[500] m-0 flex flex-col gap-2 max-h-[288px] w-[300px] overflow-y-auto rounded-md bg-popover p-0 shadow-md"
          )}
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          {Component ? Component({ store: activeComboboxStore }) : null}

          {/* /* {filteredItems.map((item, index) => (
            <ComboboxItem
              key={item.key}
              item={item}
              combobox={combobox}
              index={index}
              onRenderItem={onRenderItem}
              MentionComponentItem={MentionComponentItem}
            />
          ))} */}
          {MentionComponentItem ? (
            <MentionComponentItem editor={editor} />
          ) : (
            filteredItems.map((item, index) => (
              <ComboboxItem
                key={item.key}
                item={item}
                combobox={combobox}
                index={index}
                onRenderItem={onRenderItem}
                MentionComponentItem={MentionComponentItem}
              />
            ))
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function ComboboxMention({
  id,
  trigger,
  searchPattern,
  onSelectItem,
  controlled,
  maxSuggestions,
  filter,
  sort,
  disabled: _disabled,
  MentionComponentItem,
  mentionFunction,
  mentionComponentClassName,
  ...props
}: ComboboxProps & {
  MentionComponentItem?: any;
  mentionComponentClassName?: string;
  mentionFunction?: any;
}) {
  const storeItems = useComboboxSelectors.items();
  const disabled =
    _disabled ?? (storeItems.length === 0 && !props.items?.length);

  const focusedEditorId = useEventEditorSelectors.focus?.();
  const combobox = useComboboxControls();
  const activeId = useComboboxSelectors.activeId();
  const selectionDefined = useEditorSelector(
    (editor) => !!editor.selection,
    []
  );
  const editorId = usePlateSelectors().id();

  useEffect(() => {
    comboboxActions.setComboboxById({
      id,
      trigger,
      searchPattern,
      controlled,
      onSelectItem,
      maxSuggestions,
      filter,
      sort,
    });
  }, [
    id,
    trigger,
    searchPattern,
    controlled,
    onSelectItem,
    maxSuggestions,
    filter,
    sort,
  ]);

  if (
    !combobox ||
    !selectionDefined ||
    focusedEditorId !== editorId ||
    activeId !== id ||
    disabled
  ) {
    return null;
  }

  return (
    <ComboboxContent
      MentionComponentItem={MentionComponentItem}
      mentionComponentClassName={mentionComponentClassName}
      combobox={combobox}
      {...props}
    />
  );
}
