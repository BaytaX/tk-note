import { cn, withRef } from "@udecode/cn";
import {
  HotkeyPlugin,
  PlateElement,
  createPluginFactory,
  useEditorRef,
  withHOC,
} from "@udecode/plate-common";
import { ResizableProvider } from "@udecode/plate-resizable";
import { Popover } from "../popover/popover";
import MathComponent from "./math-component";
import ReactDOM from "react-dom";

export const ELEMENT_MATH = "insert-math";

const createMathPlugin = createPluginFactory<HotkeyPlugin>({
  key: ELEMENT_MATH,
  isElement: true,
});

export default createMathPlugin;

export const InsertMathElement = withHOC(
  ResizableProvider,
  withRef<typeof PlateElement>(
    ({ className, children, nodeProps, ...props }, ref) => {
      const editor = useEditorRef();
      return (
        <Popover>
          <PlateElement
            ref={ref}
            className={cn("py-2.5", className)}
            {...props}
          >
            <div
              style={{
                width: "100%",
                height: "120px",
                border: "1px dashed #e5e5e5",
              }}
            >
              {props.element?.mathValue ? (
                <div className="flex items-center justify-center h-full">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props.element?.mathValue as string,
                    }}
                    className="text-2xl"
                  />
                </div>
              ) : (
                ReactDOM.createPortal(
                  <MathComponent
                    elementId={props?.element?.id as string}
                    editor={editor}
                  />,
                  document.getElementById("root")
                )
              )}
            </div>
          </PlateElement>
        </Popover>
      );
    }
  )
);
