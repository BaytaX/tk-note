import { SoftyNote } from "./components/softy-note";
// import MentionComponentItem from "./test";
// import { usePDF } from "react-to-pdf";
export function MentionComponentItem({ item }) {
  return (
    <div className="flex gap-2 items-center ">
      <img
        src={
          item.avatar
            ? item.avatar
            : "https://static.vecteezy.com/ti/vecteur-libre/t2/2387693-icone-de-profil-utilisateur-vectoriel.jpg"
        }
        className="w-10 h-10"
        alt={item.text}
      />
      <p>{item.text}</p>
    </div>
  );
}
function App() {
  // const { toPDF, targetRef }: { toPDF: any; targetRef: any } = usePDF({
  //   filename: "page.pdf",
  // });
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
    // {
    //   children: [
    //     {
    //       text: "",
    //     },
    //   ],
    //   type: "img",
    //   url: "data:image/png;base64,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",
    //   id: "4qa56",
    //   width: 468,
    // },
  ];

  // const onUpload = (file: any) => {
  //   console.log(file);
  //   const url =
  //     "https://cdn-img1.imgworlds.com/assets/a5366382-0c26-4726-9873-45d69d24f819.jpg?key=home-gallery";
  //   console.log("this is onupload img");
  //   // return url;
  // };
  const MENTIONABLES = [
    { key: "0", text: "Aayla Secura", link: "hehh" },
    { key: "1", text: "Adi Gallia", link: "hfgdhgfhg" },
    {
      key: "2",
      text: "Admiral Dodd Rancit",
      link: "hfgdhgfhg",
    },
    {
      key: "3",
      text: "has avatar",
      link: "",
      avatar:
        "https://thumbs.dreamstime.com/b/unknown-male-avatar-profile-image-businessman-vector-unknown-male-avatar-profile-image-businessman-vector-profile-179373829.jpg",
    },
    {
      key: "4",
      text: "have real link",
      link: "https://www.freecodecamp.org/news/how-to-use-html-to-open-link-in-new-tab/",
    },
  ];
  return (
    <div id="root">
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        {/* <button onClick={toPDF}>Download PDF</button>
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-bold leading-tight  md:text-4xl">
            Softy Editor
          </h1>
        </div>
        <div ref={targetRef}> */}
        <div className="border border-black">
          <SoftyNote
            onChange={(e) => console.log(e)}
            initialValue={initialValue}
            MentionComponentItem={MentionComponentItem}
            MentionablesArr={MENTIONABLES}
          />
        </div>
        {/* </div> */}
      </section>
    </div>
  );
}

export default App;
