import Icon from "@components/Icon";
import { type ICommand } from "@components/MDEditor/commands";
import { clsx } from "@mantine/core";
import { type ButtonHTMLAttributes, type DetailedHTMLProps } from "react";
import { type IconsName } from "types/material-symbols";

export interface ToolBarBtnProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "onClick"
  > {
  icon: IconsName;
  command: ICommand;
  onClick: (command: ICommand) => void;
}

const ToolBarBtn = (props: ToolBarBtnProps) => {
  const { icon, command, className, onClick, ...others } = props;

  return (
    <button
      className={clsx(
        "grid h-6 w-6 place-items-center border-y border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-40",
        className
      )}
      onClick={(e) => {
        e.preventDefault;
        onClick(command);
      }}
      {...others}
    >
      <Icon name={icon} size={16} />
    </button>
  );
};

export default ToolBarBtn;
