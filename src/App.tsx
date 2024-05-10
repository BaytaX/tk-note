import { SoftyEditor } from "./components/plate-editor";
import { usePDF } from "react-to-pdf";
import MathComponent from "./components/plate-ui/math-element/math-component";

function App() {
  const { toPDF, targetRef }: { toPDF: any; targetRef: any } = usePDF({
    filename: "page.pdf",
  });

  // const mathML =
  //   "<math xmlns=¨http://www.w3.org/1998/Math/MathML¨><munder><mi>lim</mi><mrow><mi>x</mi><mo>§#8594;</mo><mo>§#8734;</mo></mrow></munder><mi>x</mi><mo>+</mo><mn>1</mn></math>";

  return (
    <div id="root">
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <button onClick={toPDF}>Download PDF</button>
        {/* <Calculator /> */}
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-bold leading-tight  md:text-4xl">
            Softy Editor
          </h1>
        </div>

        <div ref={targetRef}>
          <SoftyEditor onChange={(e) => console.log(e)} />
        </div>
      </section>
      {/* <div dangerouslySetInnerHTML={{ __html: mathML }} /> */}

      {/* <MathComponent /> */}
    </div>
  );
}

export default App;
