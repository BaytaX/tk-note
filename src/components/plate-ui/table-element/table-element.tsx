import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { cn, withRef } from "@udecode/cn";
import {
  focusEditor,
  isSelectionExpanded,
  PlateElement,
  someNode,
  useEditorRef,
  useEditorSelector,
  useElement,
  useRemoveNodeButton,
  withHOC,
} from "@udecode/plate-common";
import {
  deleteColumn,
  deleteRow,
  ELEMENT_TABLE,
  insertTableColumn,
  insertTableRow,
  mergeTableCells,
  TableProvider,
  TTableElement,
  unmergeTableCells,
  useTableBordersDropdownMenuContentState,
  useTableElement,
  useTableElementState,
  useTableMergeState,
} from "@udecode/plate-table";
import { useReadOnly, useSelected } from "slate-react";

import { Button } from "../button/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../dropdown-menu/dropdown-menu";
import { Popover, PopoverContent, popoverVariants } from "../popover/popover";
import { Separator } from "../separator/separator";
import { Icons, iconVariants } from "../icons/icons";

export const TableBordersDropdownMenuContent = withRef<
  typeof DropdownMenuPrimitive.Content
>((props, ref) => {
  const {
    getOnSelectTableBorder,
    hasOuterBorders,
    hasBottomBorder,
    hasLeftBorder,
    hasNoBorders,
    hasRightBorder,
    hasTopBorder,
  } = useTableBordersDropdownMenuContentState();

  return (
    <DropdownMenuContent
      ref={ref}
      className={cn("min-w-[220px]")}
      side="right"
      align="start"
      sideOffset={0}
      {...props}
    >
      <DropdownMenuCheckboxItem
        checked={hasBottomBorder}
        onCheckedChange={getOnSelectTableBorder("bottom")}
      >
        <Icons.borderBottom className={iconVariants({ size: "sm" })} />
        <div>Bottom Border</div>
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={hasTopBorder}
        onCheckedChange={getOnSelectTableBorder("top")}
      >
        <Icons.borderTop className={iconVariants({ size: "sm" })} />
        <div>Top Border</div>
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={hasLeftBorder}
        onCheckedChange={getOnSelectTableBorder("left")}
      >
        <Icons.borderLeft className={iconVariants({ size: "sm" })} />
        <div>Left Border</div>
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={hasRightBorder}
        onCheckedChange={getOnSelectTableBorder("right")}
      >
        <Icons.borderRight className={iconVariants({ size: "sm" })} />
        <div>Right Border</div>
      </DropdownMenuCheckboxItem>

      <Separator />

      <DropdownMenuCheckboxItem
        checked={hasNoBorders}
        onCheckedChange={getOnSelectTableBorder("none")}
      >
        <Icons.borderNone className={iconVariants({ size: "sm" })} />
        <div>No Border</div>
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={hasOuterBorders}
        onCheckedChange={getOnSelectTableBorder("outer")}
      >
        <Icons.borderAll className={iconVariants({ size: "sm" })} />
        <div>Outside Borders</div>
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  );
});

export const TableInsertDropdownMenuContent = withRef<
  typeof DropdownMenuPrimitive.Content
>((props, ref) => {
  const tableSelected = useEditorSelector(
    (editor) => someNode(editor, { match: { type: ELEMENT_TABLE } }),
    []
  );

  const editor = useEditorRef();

  return (
    <DropdownMenuContent
      ref={ref}
      className={cn("min-w-[220px]")}
      side="right"
      align="start"
      sideOffset={0}
      {...props}
    >
      <DropdownMenuSub>
        <DropdownMenuSubTrigger disabled={!tableSelected}>
          <Icons.column className={iconVariants({ variant: "menuItem" })} />
          <span>Column</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem
            className="min-w-[180px]"
            disabled={!tableSelected}
            onSelect={async () => {
              insertTableColumn(editor);
              focusEditor(editor);
            }}
          >
            <Icons.add className={iconVariants({ variant: "menuItem" })} />
            Insert column after
          </DropdownMenuItem>
          <DropdownMenuItem
            className="min-w-[180px]"
            disabled={!tableSelected}
            onSelect={async () => {
              deleteColumn(editor);
              focusEditor(editor);
            }}
          >
            <Icons.minus className={iconVariants({ variant: "menuItem" })} />
            Delete column
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      <DropdownMenuSub>
        <DropdownMenuSubTrigger disabled={!tableSelected}>
          <Icons.row className={iconVariants({ variant: "menuItem" })} />
          <span>Row</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem
            className="min-w-[180px]"
            disabled={!tableSelected}
            onSelect={async () => {
              insertTableRow(editor);
              focusEditor(editor);
            }}
          >
            <Icons.add className={iconVariants({ variant: "menuItem" })} />
            Insert row after
          </DropdownMenuItem>
          <DropdownMenuItem
            className="min-w-[180px]"
            disabled={!tableSelected}
            onSelect={async () => {
              deleteRow(editor);
              focusEditor(editor);
            }}
          >
            <Icons.minus className={iconVariants({ variant: "menuItem" })} />
            Delete row
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </DropdownMenuContent>
  );
});

export const TableFloatingToolbar = withRef<typeof PopoverContent>(
  ({ children, ...props }, ref) => {
    const element = useElement<TTableElement>();
    const { props: buttonProps } = useRemoveNodeButton({ element });

    const selectionCollapsed = useEditorSelector(
      (editor) => !isSelectionExpanded(editor),
      []
    );

    const readOnly = useReadOnly();
    const selected = useSelected();
    const editor = useEditorRef();

    const collapsed = !readOnly && selected && selectionCollapsed;
    const open = !readOnly && selected;

    const { canMerge, canUnmerge } = useTableMergeState();

    const mergeContent = canMerge && (
      <Button
        contentEditable={false}
        variant="ghost"
        isMenu
        onClick={() => mergeTableCells(editor)}
      >
        <Icons.combine className="mr-2 size-4" />
        Merge
      </Button>
    );

    const unmergeButton = canUnmerge && (
      <Button
        contentEditable={false}
        variant="ghost"
        isMenu
        onClick={() => unmergeTableCells(editor)}
      >
        <Icons.ungroup className="mr-2 size-4" />
        Unmerge
      </Button>
    );

    const bordersContent = collapsed && (
      <>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" isMenu>
              <Icons.borderAll className="mr-2 size-4" />
              Borders
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuPortal>
            <TableBordersDropdownMenuContent />
          </DropdownMenuPortal>
        </DropdownMenu>

        <Button contentEditable={false} variant="ghost" isMenu {...buttonProps}>
          <Icons.delete className="mr-2 size-4" />
          Delete
        </Button>
      </>
    );
    const insertContent = collapsed && (
      <>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" isMenu>
              <Icons.add className="mr-2 size-4" />
              Insert
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuPortal>
            <TableInsertDropdownMenuContent />
          </DropdownMenuPortal>
        </DropdownMenu>
      </>
    );

    return (
      <Popover open={open} modal={false}>
        <PopoverAnchor asChild>{children}</PopoverAnchor>
        {(canMerge || canUnmerge || collapsed) && (
          <PopoverContent
            ref={ref}
            className={cn(
              popoverVariants(),
              "flex w-[220px] flex-col gap-1 p-1"
            )}
            onOpenAutoFocus={(e) => e.preventDefault()}
            {...props}
          >
            {unmergeButton}
            {mergeContent}
            {insertContent}
            {bordersContent}
          </PopoverContent>
        )}
      </Popover>
    );
  }
);

export const TableElement = withHOC(
  TableProvider,
  withRef<typeof PlateElement>(({ className, children, ...props }, ref) => {
    const { colSizes, isSelectingCell, minColumnWidth, marginLeft } =
      useTableElementState();
    const { props: tableProps, colGroupProps } = useTableElement();

    return (
      <TableFloatingToolbar>
        <div style={{ paddingLeft: marginLeft }}>
          <PlateElement
            ref={ref}
            asChild
            className={cn(
              "my-4 ml-px mr-0 table h-px w-full table-fixed border-collapse",
              isSelectingCell && "[&_*::selection]:bg-none",
              className
            )}
            {...tableProps}
            {...props}
          >
            <table>
              <colgroup {...colGroupProps}>
                {colSizes.map((width, index) => (
                  <col
                    key={index}
                    style={{
                      minWidth: minColumnWidth,
                      width: width || undefined,
                    }}
                  />
                ))}
              </colgroup>

              <tbody className="min-w-full">{children}</tbody>
            </table>
          </PlateElement>
        </div>
      </TableFloatingToolbar>
    );
  })
);
