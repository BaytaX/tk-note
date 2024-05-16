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
  ({ combobox, index, item, onRenderItem, className, ...rest }, ref) => {
    const { props } = useComboboxItem({ item, index, combobox, onRenderItem });

    return (
      <div
        ref={ref}
        className="relative flex gap-2  min-w-[200px] cursor-pointer select-none items-center rounded-sm p-1  text-sm outline-none transition-colors hover:bg-accent  focus:text-gray-900   data-[highlighted=true]:bg-accent data-[highlighted=true]:text-accent-foreground "
        {...props}
        {...rest}
      >
        <img
          className="w-12 h-12 border border-gray-200 rounded-md bg-white"
          src={item.img}
          alt={item.text}
        />
        <div className="flex flex-col  ">
          <p>{item.text}</p>
          <p className="text-xs text-gray-500">{item.description}</p>
        </div>
      </div>
    );
  }
);

export function ComboboxContent(props: ComboboxContentProps) {
  const {
    component: Component,
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

  // const basicBlocks = filteredItems?.filter(
  //   (ele: any) => ele?.blocksName === "Basic Blocks"
  // );
  // const mediaBlocks = filteredItems?.filter(
  //   (ele: any) => ele?.blocksName === "Media"
  // );

  // const embedsBlocks = filteredItems?.filter(
  //   (ele: any) => ele?.blocksName === "Embeds"
  // );

  // const resultItems = [
  //   {
  //     label: "Basic Blocks",
  //     items: basicBlocks,
  //   },
  //   {
  //     label: "Media",
  //     items: mediaBlocks,
  //   },
  //   {
  //     label: "Embeds",
  //     items: embedsBlocks,
  //   },
  // ];

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
            "z-[500] m-0 max-h-[400px] w-[330px] overflow-y-scroll rounded-md bg-popover dark:bg-[#191919] p-2  shadow-md flex flex-col gap-1"
          )}
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          {Component ? Component({ store: activeComboboxStore }) : null}

          {filteredItems.map((item, index) => (
            <ComboboxItem
              key={item.key}
              item={item}
              combobox={combobox}
              index={index}
              onRenderItem={onRenderItem}
            />
          ))}

          {/* {resultItems?.map((el, index) => (
            <div key={index} className="flex flex-col gap-2">
              {index !== 0 && <hr className="mt-4" />}
              <p className={`text-xs text-gray-400 mt-2`}>{el.label}</p>
              <div className="flex flex-col gap-1">
                {el.items.map((item, index) => (
                  <ComboboxItem
                    key={item.key}
                    item={item}
                    combobox={combobox}
                    index={index}
                    onRenderItem={onRenderItem}
                  />
                ))}
              </div>
            </div>
          ))} */}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function ComboboxSlash({
  id,
  trigger,
  searchPattern,
  onSelectItem,
  controlled,
  maxSuggestions,
  filter,
  sort,
  disabled: _disabled,
  ...props
}: ComboboxProps) {
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

  return <ComboboxContent combobox={combobox} {...props} />;
}
