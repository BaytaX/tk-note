import { useState } from "react";
import CalculatorButton from "./calculator-button";
import { MathJax } from "better-react-mathjax";
// import { parse, HtmlGenerator } from "latex.js";

export default function Calculator() {
  const [equation, setEquation] = useState("");

  // let latex = "Hi, this is a line of text.";

  // let generator = new HtmlGenerator({ hyphenate: false });

  // let doc = parse(equation, { generator: generator }).htmlDocument();

  const handleClick = (el: string) => {
    setEquation((prev) => prev + el);
  };
  console.log(equation);
  // console.log(doc);
  // console.log(doc.documentElement.outerHTML);
  return (
    <div className="overflow-y-auto overflow-x-hidden flex backdrop-blur-sm	  fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className=" relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Mathematics
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
          <div className="h-36">
            <MathJax>{`$$\\${equation}$$`}</MathJax>
          </div>
          <div className="flex gap-8 bg-gray-100 p-6 mx-3 rounded-lg">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <CalculatorButton handleClick={handleClick} data={"sin"}>
                  sin
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"cos"}>
                  cos
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"tan"}>
                  tan
                </CalculatorButton>
              </div>
              <div className="flex gap-2">
                <CalculatorButton handleClick={handleClick} data={"csc"}>
                  csc
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"sec"}>
                  sec
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"cot"}>
                  cot
                </CalculatorButton>
              </div>
              <div className="flex gap-2">
                <CalculatorButton handleClick={handleClick} data={"theta"}>
                  θ
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"alpha"}>
                  α
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"beta"}>
                  β
                </CalculatorButton>
              </div>
              <div className="flex gap-2">
                <CalculatorButton handleClick={handleClick} data={"pi"}>
                  π
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"cap"}>
                  ∩
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"cup"}>
                  ∪
                </CalculatorButton>
              </div>
              <div className="flex gap-2">
                <CalculatorButton handleClick={handleClick} data={"Delta"}>
                  Δ
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"delta"}>
                  δ
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"gamma"}>
                  γ
                </CalculatorButton>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <CalculatorButton handleClick={handleClick} data={"/"}>
                  frac
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"leq"}>
                  ≤
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"geq"}>
                  ≥
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"ne"}>
                  ≠
                </CalculatorButton>
              </div>
              <div className="flex gap-2">
                <CalculatorButton handleClick={handleClick} data={"^{2}"}>
                  n<sup>2</sup>
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"^"}>
                  n<sup>◻</sup>
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"sqrt[]{}"}>
                  <sup>◻√</sup>
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"sqrt"}>
                  √
                </CalculatorButton>
              </div>
              <div className="flex gap-2">
                <CalculatorButton handleClick={handleClick} data={"therefore"}>
                  ∴
                </CalculatorButton>
                <CalculatorButton
                  handleClick={handleClick}
                  data={"left|\right|"}
                >
                  |x|
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"log"}>
                  log
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"log_{}"}>
                  log<sub>◻</sub>
                </CalculatorButton>
              </div>
              <div className="flex gap-2">
                <CalculatorButton handleClick={handleClick} data={"ln"}>
                  ln
                </CalculatorButton>
                <CalculatorButton
                  handleClick={handleClick}
                  data={"Longrightarrow"}
                >
                  ⇒
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"pm"}>
                  ±
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"binom"}>
                  nCr
                </CalculatorButton>
              </div>
              <div className="flex gap-2">
                <CalculatorButton handleClick={handleClick} data={"epsilon"}>
                  ε
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"zeta"}>
                  ζ
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"theta"}>
                  θ
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"Omega"}>
                  Ω
                </CalculatorButton>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <CalculatorButton handleClick={handleClick} data={"sum"}>
                  ∑
                </CalculatorButton>
                <CalculatorButton
                  handleClick={handleClick}
                  data={"lim_{ \to }"}
                >
                  lim
                </CalculatorButton>
              </div>
              <div className="flex gap-2">
                <CalculatorButton
                  handleClick={handleClick}
                  data={"\frac{d}{dx}"}
                >
                  d⁄dx
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"frac"}>
                  matrix
                </CalculatorButton>
              </div>
              <div className="flex gap-2">
                <CalculatorButton handleClick={handleClick} data={"int"}>
                  ∫
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"int_{}^{}"}>
                  ∫<sub>◻</sub>
                </CalculatorButton>
              </div>
              <div className="flex gap-2">
                <CalculatorButton handleClick={handleClick} data={"infty"}>
                  ∞
                </CalculatorButton>
                <CalculatorButton handleClick={handleClick} data={"in"}>
                  ∈
                </CalculatorButton>
              </div>
              <div className="flex gap-2">
                <CalculatorButton handleClick={handleClick} data={"vec{}"}>
                  vec
                </CalculatorButton>
                <CalculatorButton
                  handleClick={handleClick}
                  data={"measuredangle"}
                >
                  ang
                </CalculatorButton>
              </div>
            </div>
          </div>

          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="static-modal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
            <button
              data-modal-hide="static-modal"
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
