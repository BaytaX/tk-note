import { PlateController, useEditorRef } from "@udecode/plate-common";

export function MentionComponentItem() {
  const editor = useEditorRef();
  const insertMention = (user) => {
    const mention = {
      type: "p",
      children: [
        { text: "" },
        {
          children: [{ text: user.name }],
          color: "#545",
          type: "a",
          url: user.link,
        },
        {
          text: "",
        },
      ],
    };
    editor.deleteBackward("block");
    editor.deleteBackward("block");
    editor.deleteBackward("block");

    editor.insertNode(mention);
  };

  return (
    <PlateController>
      <div className="flex flex-col gap-2">
        <h2>test component </h2>
        <div
          className="flex gap-2 items-center hover:bg-red-200 cursor-pointer"
          onClick={() =>
            insertMention({
              link: "https://www.notion.so/ufyu-5de9029b96134a2bb08f1f86d69f9c0d",
              name: "notion link",
            })
          }
        >
          <img
            src={
              "https://static.vecteezy.com/ti/vecteur-libre/t2/2387693-icone-de-profil-utilisateur-vectoriel.jpg"
            }
            className="w-10 h-10"
            alt={"item.text"}
          />
          <p>{"item.text"}</p>
        </div>
        <div className="flex gap-2 items-center ">
          <img
            src={
              "https://static.vecteezy.com/ti/vecteur-libre/t2/2387693-icone-de-profil-utilisateur-vectoriel.jpg"
            }
            className="w-10 h-10"
            alt={"item.text"}
          />
          <p>{"item.text"}</p>
        </div>
        <div className="flex gap-2 items-center ">
          <img
            src={
              "https://static.vecteezy.com/ti/vecteur-libre/t2/2387693-icone-de-profil-utilisateur-vectoriel.jpg"
            }
            className="w-10 h-10"
            alt={"item.text"}
          />
          <p>{"item.text"}</p>
        </div>
      </div>
    </PlateController>
  );
}
