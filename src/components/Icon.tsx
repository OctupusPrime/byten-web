import { clsx } from "@mantine/core";
import { type DetailedHTMLProps, type HTMLAttributes } from "react";
import { type IconsName } from "types/material-symbols";

export interface IconProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  name: IconsName;
  size?: number;
  filled?: boolean;
  opsz?: number;
}

const Icon = (props: IconProps) => {
  const { name, className, filled, size = 24, opsz = 24, ...others } = props;

  return (
    <i
      {...others}
      className={clsx(
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
