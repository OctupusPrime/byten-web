const getThemeValue = (theme: "light" | "auto" | "dark"): "dark" | "light" => {
  if (
    theme === "dark" ||
    (theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    return "dark";
  }

  return "light";
};

const changeTheme = (theme: "light" | "auto" | "dark") => {
  if (!window || !document)
    return console.error("no document or window provided");

  const parsedTheme = getThemeValue(theme);

  if (parsedTheme === "dark") {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    return;
  }

  document.documentElement.classList.remove("dark");
  document.documentElement.classList.add("light");
};

export { getThemeValue, changeTheme };
