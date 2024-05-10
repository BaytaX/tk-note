import { SoftyEditor } from "./components/plate-editor";
import { usePDF } from "react-to-pdf";

function App() {
  const { toPDF, targetRef }: { toPDF: any; targetRef: any } = usePDF({
    filename: "page.pdf",
  });
  return (
    <div id="root">
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <button onClick={toPDF}>Download PDF</button>
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-bold leading-tight  md:text-4xl">
            Softy Editor
          </h1>
        </div>
        <div ref={targetRef}>
          <SoftyEditor onChange={(e) => console.log(e)} />
        </div>
      </section>
    </div>
  );
}

export default App;
