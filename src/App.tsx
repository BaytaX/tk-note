import PlateEditor from "./components/plate-editor";
import "./assets/App.css";

function App() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-bold leading-tight  md:text-4xl">
          Softy Editor
        </h1>
      </div>

      <div className="max-w-[1336px] rounded-lg border bg-background shadow">
        <PlateEditor />
      </div>
    </section>
  );
}

export default App;
