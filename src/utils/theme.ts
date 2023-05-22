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
    return;
  }

  document.documentElement.classList.remove("dark");
};

export { getThemeValue, changeTheme };
