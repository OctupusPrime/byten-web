import { Route, useNavigate, Outlet, useMatches } from "@tanstack/router";
import { appRoute } from "../";
import { StyledTabs } from "@features/ai";
import { Tabs } from "@mantine/core";
import { useEffect, useState } from "react";

export const appAiRoute = new Route({
  getParentRoute: () => appRoute,
  path: "ai",
  component: Ai,
});

function Ai() {
  const matches = useMatches();
  const navigate = useNavigate();

  const [tabState, setTabState] = useState(matches[1].id);

  useEffect(() => {
    setTabState(matches[1].id);
  }, [matches]);

  const handleTabChange = (value: string) => {
    navigate({
      to: value as any,
      from: tabState as any,
    });
  };

  return (
    <section className="w-full">
      <h1 className="my-2 text-center text-2xl font-semibold dark:text-white">
        Ai
      </h1>

      <StyledTabs
        classNames={{
          tabsList: "!justify-center",
          root: "!sticky !top-0 !py-2 !bg-white dark:!bg-neutral-900",
        }}
        value={tabState}
        onTabChange={handleTabChange}
      >
        <Tabs.List>
          <Tabs.Tab value="/app/ai/">Text Modification</Tabs.Tab>
          <Tabs.Tab value="/app/ai/prompts">AI Prompts</Tabs.Tab>
        </Tabs.List>
      </StyledTabs>
      <Outlet />
    </section>
  );
}
