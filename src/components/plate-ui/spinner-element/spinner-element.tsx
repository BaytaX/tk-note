import {
  PlateElement,
  PlateElementProps,
  createPluginFactory,
} from "@udecode/plate-common";

import Spinner from "../spinner/spinner";

export const ELEMENT_SPINNER = "spinner";

const createSpinnerPlugin = createPluginFactory({
  key: ELEMENT_SPINNER,
  isElement: true,
});

export default createSpinnerPlugin;

export const SpinnerElement = ({
  className,
  children,
  ...props
}: PlateElementProps) => {
  return (
    <PlateElement {...props} contentEditable={false}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "8px",
          paddingBottom: "8px",
        }}
      >
        <Spinner />
      </div>
      {children}
    </PlateElement>
  );
};
