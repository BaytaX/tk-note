import { SoftyNote } from "./components/softy-note";
// import { MentionComponentItem } from "./mentioncompo";

function App() {
  const initialValue = [
    {
      type: "h2",
      children: [
        {
          text: "🌳 Blocks",
        },
      ],
      id: "1",
    },
    {
      type: "p",
      children: [
        {
          text: "Easily create headings of various levels, from H1 to H6, to structure your content and make it more organized.",
        },
      ],
      id: "2",
    },
    {
      type: "blockquote",
      children: [
        {
          text: "Create blockquotes to emphasize important information or highlight quotes from external sources.",
        },
      ],
      id: "3",
    },
    {
      type: "code_block",
      lang: "javascript",
      children: [
        {
          type: "code_line",
          children: [
            {
              text: "// Use code blocks to showcase code snippets",
            },
          ],
        },
        {
          type: "code_line",
          children: [
            {
              text: "function greet() {",
            },
          ],
        },
        {
          type: "code_line",
          children: [
            {
              text: "  console.info('Hello World!');",
            },
          ],
        },
        {
          type: "code_line",
          children: [
            {
              text: "}",
            },
          ],
        },
      ],
      id: "4",
    },
    {
      type: "media_embed",
      url: "https://instagram.com/p/CUbHfhpswxt/?utm_source=ig_embed&amp;utm_campaign=loading",
      children: [
        {
          text: "",
        },
      ],
      id: "ornud",
      width: 338,
    },
    {
      type: "p",
      children: [
        {
          text: "one",
        },
      ],
      id: "78yxz",
      indent: 1,
      listStyleType: "disc",
    },
    {
      type: "p",
      id: "bif2d",
      indent: 1,
      listStyleType: "disc",
      children: [
        {
          text: "two",
        },
      ],
      listStart: 2,
    },
    {
      type: "p",
      id: "ne1zt",
      indent: 1,
      listStyleType: "disc",
      listStart: 3,
      children: [
        {
          text: "three",
        },
      ],
    },
    {
      type: "p",
      id: "yldqk",
      children: [
        {
          text: "",
        },
      ],
    },
  ];
  // const onUpload = async (file) => {
  //   console.log(file);
  //   const url =
  //     "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/IMG_Academy_Logo.svg/800px-IMG_Academy_Logo.svg.png";
  //   return url;
  // };
  return (
    <div>
      <button
        onClick={() => {
          if (document.documentElement.lang === "ar") {
            document.documentElement.lang = "en";
          } else if (document.documentElement.lang === "en") {
            document.documentElement.lang = "ar";
          }
        }}
      >
        click here
      </button>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="border border-black ">
          <SoftyNote
            onChange={(e) => console.log(e)}
            initialValue={initialValue}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
