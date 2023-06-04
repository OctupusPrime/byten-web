import { Button, type ButtonProps } from "@mantine/core";
import GoogleIcon from "./GoogleIcon";
import GithubIcon from "./GithubIcon";

interface BtnProps extends ButtonProps {
  onClick?: () => void;
}

export function GoogleButton({ children, ...props }: BtnProps) {
  return (
    <Button
      leftIcon={<GoogleIcon />}
      radius="xl"
      variant="default"
      color="gray"
      size="md"
      {...props}
    >
      {children}
    </Button>
  );
}

export function GithubButton({ children, ...props }: BtnProps) {
  return (
    <Button
      radius="xl"
      leftIcon={<GithubIcon />}
      variant="default"
      color="gray"
      size="md"
      {...props}
    >
      {children}
    </Button>
  );
}
