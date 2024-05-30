import React, { ForwardedRef, useEffect } from "react";
import { cn } from "@udecode/cn";
import { getPlugin, PlateContent, useEditorRef } from "@udecode/plate-common";
import { cva } from "class-variance-authority";

import type {
  PlateContentProps,
  PlateEditor,
  Value,
} from "@udecode/plate-common";
import type { VariantProps } from "class-variance-authority";
// import { useSoftyStore } from "../../../contexts/SoftyNoteStore";

const editorVariants = cva(
  cn(
    "relative overflow-x-auto whitespace-pre-wrap break-words",
    "min-h-[80px] w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none",
    "[&_[data-slate-placeholder]]:text-muted-foreground [&_[data-slate-placeholder]]:!opacity-100",
    "[&_[data-slate-placeholder]]:top-[auto_!important]",
    "[&_strong]:font-bold"
  ),
  {
    variants: {
      variant: {
        outline: "border border-input",
        ghost: "",
      },
      focused: {
        true: "ring-2 ring-ring ring-offset-2",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
      },
      focusRing: {
        true: "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        false: "",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
      },
    },
    defaultVariants: {
      variant: "outline",
      focusRing: true,
      size: "sm",
    },
  }
);

export type EditorProps = PlateContentProps &
  VariantProps<typeof editorVariants> & {
    onUpload?: (file) => void;
    // isArabic?: boolean;
  };

export interface HTMLDivElementWithEditor extends HTMLDivElement {
  editor?: PlateEditor<Value>;
}

const Editor = React.forwardRef<HTMLDivElementWithEditor, EditorProps>(
  (
    {
      className,
      disabled,
      focused,
      focusRing,
      readOnly,
      size,
      variant,
      onUpload,
      // isArabic,
      ...props
    },
    ref
  ) => {
    const editor = useEditorRef();
    // const { setLocal } = useSoftyStore();
    if (onUpload) {
      const uploadImgPlugin = getPlugin(editor, "upload-image");
      const uploadFilePlugin = getPlugin(editor, "upload-file");
      const uploadVideoPlugin = getPlugin(editor, "upload-video");

      uploadImgPlugin.props = { onUpload };
      uploadFilePlugin.props = { onUpload };
      uploadVideoPlugin.props = { onUpload };
    }

    useEffect(() => {
      const isRefObject = (
        ref: ForwardedRef<HTMLDivElementWithEditor>
      ): ref is React.RefObject<HTMLDivElementWithEditor> => {
        return ref !== null && "current" in ref;
      };

      if (isRefObject(ref) && ref.current) ref.current.editor = editor;
    }, [editor, ref]);

    // if (isArabic) {
    //   setLocal("ar");
    // } else {
    //   setLocal("en");
    // }
    return (
      <div
        ref={ref}
        className="relative w-full">
        {/* <button onClick={() => editor}>click here</button> */}
        <PlateContent
          className={cn(
            editorVariants({
              disabled,
              focused,
              focusRing,
              size,
              variant,
            }),
            className
          )}
          disableDefaultStyles
          readOnly={disabled ?? readOnly}
          aria-disabled={disabled}
          {...props}
        />
      </div>
    );
  }
);
Editor.displayName = "Editor";

export { Editor };
