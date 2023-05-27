import {
  type ButtonProps as MButtonProps,
  Button as MButton,
} from "@mantine/core";
import {
  type RefAttributes,
  type ForwardRefExoticComponent,
  forwardRef,
} from "react";
import { IconsName } from "types/material-symbols";
import Icon from "./Icon";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends MButtonProps {
  onClick?: () => void;
}

export interface IconButtonProps extends ButtonProps {
  icon: IconsName;
  iconSize?: number;
  filled?: boolean;
}

export interface ButtonComponent
  extends React.ForwardRefExoticComponent<
    ButtonProps & React.RefAttributes<HTMLButtonElement>
  > {
  Icon: ForwardRefExoticComponent<
    IconButtonProps & RefAttributes<HTMLButtonElement>
  >;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, ...other } = props;

  return (
    <MButton ref={ref} {...other}>
      {children}
    </MButton>
  );
}) as ButtonComponent;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const { icon, filled, iconSize, classNames, ...other } = props;

    return (
      <MButton
        ref={ref}
        {...other}
        classNames={{
          ...classNames,
          root: twMerge("!px-[5.5px] !rounded-md", classNames?.root),
        }}
      >
        <Icon name={icon} filled={filled} size={iconSize} />
      </MButton>
    );
  }
);

Button.Icon = IconButton;

Button.displayName = "Button";

export default Button;
