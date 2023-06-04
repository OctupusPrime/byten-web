import { Button, type ButtonProps } from "@mantine/core";
import GoogleIcon from "./GoogleIcon";
import GithubIcon from "./GithubIcon";

interface BtnProps extends ButtonProps {
  onClick?: () => void;
}

export function GoogleButton(props: BtnProps) {
  return (
    <Button
      leftIcon={<GoogleIcon />}
      radius="xl"
      variant="default"
      color="gray"
      {...props}
    >
      Google
    </Button>
  );
}

export function GithubButton(props: BtnProps) {
  return (
    <Button
      radius="xl"
      leftIcon={<GithubIcon />}
      sx={(theme) => ({
        backgroundColor:
          theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
        color: "#fff",
        "&:hover": {
          backgroundColor:
            theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
        },
      })}
      {...props}
    >
      Github
    </Button>
  );
}
