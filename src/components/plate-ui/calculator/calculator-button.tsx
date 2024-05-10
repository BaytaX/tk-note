import { ReactNode } from "react";

type claculatorButtonProps = {
  children: string | ReactNode;
  data: string;
  handleClick?: (data: string) => void;
};

export default function CalculatorButton({
  children,
  data,
  handleClick,
}: claculatorButtonProps) {
  return (
    <button
      className="bg-white py-1 h-9 w-12 text-center shadow-md border text-sm border-gray-300 rounded-lg text-gray-600 font-light hover:bg-transparent transition-all"
      onClick={() => handleClick && handleClick(data)}
    >
      {children}
    </button>
  );
}
