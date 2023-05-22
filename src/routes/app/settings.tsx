import { Route } from "@tanstack/router";
import { appRoute } from ".";
import { useThemeStore } from "@features/settings";
import { SegmentedControl } from "@mantine/core";

export const appSettingsRoute = new Route({
  getParentRoute: () => appRoute,
  path: "settings",
  component: Settings,
  // loader: ({ context }) => {
  //   console.log("queryContext", context.queryClient);
  // },
});

function Settings() {
  const [theme, setTheme] = useThemeStore((state) => [
    state.state,
    state.changeTheme,
  ]);

  return (
    <>
      <div className="max-w-2xl mx-auto w-full p-3">
        <h1 className="text-center text-2xl font-semibold mt-3 dark:text-white">
          Settings
        </h1>

        <div className="mt-4 flex justify-between gap-2 items-center flex-col sm:flex-row">
          <div className="">
            <h2 className="text-lg font-medium dark:text-white">Theme</h2>
            <p className="text-sm mt-1 dark:text-white">
              Change app appearance to your prefered.
            </p>
          </div>
          <SegmentedControl
            value={theme}
            onChange={setTheme}
            data={[
              { label: "Light", value: "light" },
              { label: "Auto", value: "auto" },
              { label: "Dark", value: "dark" },
            ]}
            classNames={{
              root: "mt-2 sm:mt-0",
            }}
          />
        </div>
        {/* <button onClick={() => changeTheme("light")}>Light</button>
        <button onClick={() => changeTheme("auto")}>Auto</button>
        <button onClick={() => changeTheme("dark")}>Dark</button> */}
      </div>
    </>
  );
}
