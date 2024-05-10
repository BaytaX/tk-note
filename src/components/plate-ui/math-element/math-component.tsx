import React, { useRef, useState } from "react";

// eslint-disable-next-line no-unused-vars
import * as MathType from "@wiris/mathtype-generic";

import EquationEditor from "./WirisEquationEditor.jsx";
import { getNode, removeNodes, useEditorRef } from "@udecode/plate-common";
import { insertMath } from "../../../lib/plate/insertMath.js";

interface MyComponentProps {
  elementId: string;
}

const MathComponent: React.FC<MyComponentProps> = ({ elementId }) => {
  const editor = useEditorRef();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [mathValue, setMathValue] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const onEquationChange = (event: any) => {
    const mathFormat = (window as any).WirisPlugin.Parser.endParse(
      event.target.value
    );
    console.log(
      "Here is the new html, but the equation is in math format",
      mathFormat
    );

    setMathValue(mathFormat);
  };

  const handleSubmit = () => {
    setIsOpen(false);
    const x = getNode(editor, []);
    const elements: any = x?.children;
    console.log(elements);
    const index = elements.findIndex(
      (el: any) => el.type === "insert-math" && el.id === elementId
    );
    removeNodes(editor, {
      at: [index],
    });
    insertMath(editor, { mathValue });
  };

  const handleCancel = () => {
    setIsOpen(false);
    const x = getNode(editor, []);
    const elements: any = x?.children;
    const index = elements.findIndex(
      (el: any) => el.type === "insert-math" && el.id === elementId
    );
    removeNodes(editor, {
      at: [index],
    });
  };

  return (
    <>
      {isOpen && (
        <div className="overflow-y-auto overflow-x-hidden flex backdrop-blur-sm fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Mathematics
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleCancel}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <>
                <div ref={toolbarRef} />
                <EquationEditor
                  onEquationInput={onEquationChange}
                  toolbarRef={toolbarRef}
                  value={mathValue}
                />
              </>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="static-modal"
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  data-modal-hide="static-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MathComponent;
