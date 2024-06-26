// import { createContext, useContext, useState } from "react";

// type Locale = "en" | "ar";

// type SoftyProviderProps = {
//   children: React.ReactNode;
//   defaultLang?: Locale;
//   storageKey?: string;
// };

// type SoftyProviderState = {
//   locale: Locale;
//   setLocal: (Local: Locale) => void;
// };

// const initialState: SoftyProviderState = {
//   locale: "en",
//   setLocal: () => null,
// };

// const softyProviderContext = createContext<SoftyProviderState>(initialState);

// export function SoftyProvider({
//   children,
//   storageKey = "Lng",
//   ...props
// }: SoftyProviderProps) {
//   const [locale, setLocal] = useState<Locale>(
//     () => (localStorage.getItem(storageKey) as Locale) || "en"
//   );

//   const value = {
//     locale,
//     setLocal: (Locale: Locale) => {
//       localStorage.setItem(storageKey, Locale);
//       document.documentElement.lang = Locale;

//       setLocal(Locale);
//     },
//   };

//   return (
//     <softyProviderContext.Provider {...props} value={value}>
//       {children}
//     </softyProviderContext.Provider>
//   );
// }

// export const useSoftyStore = () => {
//   const context = useContext(softyProviderContext);

//   if (context === undefined)
//     throw new Error("useSoftyStore must be used within a SoftyProvider");

//   return context;
// };
import { create } from "zustand";

type Store = {
  fileSelected: {
    type: string;
    url: string;
  };
  setFileSelected: (type: string, url: string) => void;
};

export const useSoftyNoteStore = create<Store>((set) => ({
  fileSelected: {
    type: "",
    url: "",
  },
  setFileSelected: (type: string, url: string) =>
    set({
      fileSelected: {
        type,
        url,
      },
    }),
  reset: () => set({ fileSelected: { type: "", url: "" } }),
}));
