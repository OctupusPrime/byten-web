import { type TabsProps, Tabs as MTabs } from "@mantine/core";

const Tabs = (props: TabsProps) => {
  const { styles, ...other } = props;

  return (
    <MTabs
      unstyled
      {...other}
      styles={(theme) => ({
        tab: {
          ...theme.fn.focusStyles(),
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[0]
              : theme.colors.gray[9],
          border: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[4]
          }`,
          padding: `8px ${theme.spacing.md}`,
          cursor: "pointer",
          fontSize: theme.fontSizes.sm,
          display: "flex",
          alignItems: "center",
          fontWeight: 500,

          "&:disabled": {
            opacity: 0.5,
            cursor: "not-allowed",
          },

          "&:not(:first-of-type)": {
            borderLeft: 0,
          },

          "&:first-of-type": {
            borderTopLeftRadius: theme.radius.md,
            borderBottomLeftRadius: theme.radius.md,
          },

          "&:last-of-type": {
            borderTopRightRadius: theme.radius.md,
            borderBottomRightRadius: theme.radius.md,
          },

          "&[data-active]": {
            backgroundColor: theme.colors.blue[7],
            borderColor: theme.colors.blue[7],
            color: theme.white,
          },
        },

        tabsList: {
          display: "flex",
        },
        ...styles,
      })}
    />
  );
};

export default Tabs;
