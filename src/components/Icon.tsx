import { type DetailedHTMLProps, type HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { IconsName } from "types/material-symbols";

export interface IconProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  name: IconsName;
  filled?: boolean;
}

const Icon = (props: IconProps) => {
  const { name, className, filled, ...others } = props;

  return (
    <i
      {...others}
      className={twMerge(
        filled ? "material-icon-filled" : "material-icon",
        className
      )}
    >
      {name}
    </i>
  );
};

export default Icon;
