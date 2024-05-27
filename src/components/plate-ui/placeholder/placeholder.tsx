import React from "react";
import { cn } from "@udecode/cn";
import {
  createNodeHOC,
  createNodesHOC,
  PlaceholderProps,
  usePlaceholderState,
} from "@udecode/plate-common";
import { ELEMENT_H1 } from "@udecode/plate-heading";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
// import { useSoftyStore } from "../../../contexts/SoftyNoteStore";

export const Placeholder = (props: PlaceholderProps) => {
  const { children, placeholder, nodeProps } = props;
  // const { locale } = useSoftyStore();
  // console.log(props);

  const { enabled } = usePlaceholderState(props);

  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      className: child.props.className,
      nodeProps: {
        ...nodeProps,
        className: cn(
          enabled &&
            "before:absolute before:cursor-text before:opacity-30 before:content-[attr(placeholder)]"
        ),
        placeholder,
      },
    });
  });
};

export const withPlaceholder = createNodeHOC(Placeholder);
export const withPlaceholdersPrimitive = createNodesHOC(Placeholder);

export const withPlaceholders = (components: any) => {
  const locale = document.documentElement.lang;
  // console.log(locale);
  if (locale === "en") {
    return withPlaceholdersPrimitive(components, [
      {
        key: ELEMENT_PARAGRAPH,
        placeholder: `Write something, ' / ' for commands… `,
        hideOnBlur: true,
        query: {
          maxLevel: 1,
        },
      },
      {
        key: ELEMENT_H1,
        placeholder: "Untitled",
        hideOnBlur: false,
      },
    ]);
  } else if (locale === "ar") {
    return withPlaceholdersPrimitive(components, [
      {
        key: ELEMENT_PARAGRAPH,
        placeholder: `اكتب بالعربية `,
        hideOnBlur: true,
        query: {
          maxLevel: 1,
        },
      },
      {
        key: ELEMENT_H1,
        placeholder: "عنوان",
        hideOnBlur: false,
      },
    ]);
  }
};
