import { type DetailedHTMLProps, type HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { type IconsName } from "types/material-symbols";

export interface IconProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  name: IconsName;
  size?: number;
  filled?: boolean;
}

const Icon = (props: IconProps) => {
  const { name, className, filled, size = 24, ...others } = props;

  return (
    <i
      {...others}
      className={twMerge(
        filled ? "material-icon-filled" : "material-icon",
        className
      )}
      style={{
        fontSize: size,
      }}
    >
      {name}
    </i>
  );
};

export default Icon;
