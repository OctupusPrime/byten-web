import { Link } from "@tanstack/router";
import { type IconsName } from "types/material-symbols";
import Icon from "./Icon";
import { useAuthContext } from "@context/AuthContext";
import { useTranslation } from "react-i18next";

interface LinkBtnProps {
  icon?: IconsName;
  title: string;
  to: string;
  exact?: boolean;
}

const LinkBtn = (props: LinkBtnProps) => {
  const { title, icon, to, exact = true } = props;

  return (
    <Link
      to={to as any}
      activeOptions={{
        exact,
      }}
      className={"nav-link"}
      activeProps={{
        className: `nav-link-active`,
      }}
    >
      {icon ? <Icon name={icon} /> : null}
      <span className="text-sm font-medium">{title}</span>
    </Link>
  );
};

const MobalLinkBtn = (props: LinkBtnProps) => {
  const { title, icon, to, exact = true } = props;

  return (
    <Link
      to={to as any}
      activeOptions={{
        exact,
      }}
      className={"mobal-nav-link"}
      activeProps={{
        className: `mobal-nav-link-active`,
      }}
    >
      {icon ? <Icon name={icon} /> : null}
      <span className="text-sm font-medium">{title}</span>
    </Link>
  );
};

const AppNavBar = () => {
  const { signOut } = useAuthContext();

  const { t } = useTranslation();

  return (
    <>
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col gap-5 border-r border-gray-200 bg-white px-6 pb-4 dark:border-neutral-700 dark:bg-neutral-800 md:flex">
        <div className="flex h-16 items-center">
          <span className="text-xl font-bold text-black dark:text-gray-50">
            ByteN
          </span>
        </div>
        <nav className="flex flex-1 flex-col gap-2">
          <ul className="-mx-2 space-y-1">
            <li>
              <LinkBtn
                title={t("navbar.links.dashboard")}
                to="/app"
                icon="dashboard"
              />
            </li>
            <li>
              <LinkBtn
                title={t("navbar.links.ai")}
                to="/app/ai"
                icon="magic_button"
                exact={false}
              />
            </li>
            <li>
              <LinkBtn
                title={t("navbar.links.settings")}
                to="/app/settings"
                icon="settings"
              />
            </li>
          </ul>
          <ul className="-mx-2 mt-auto border-t border-gray-200 pt-4 dark:border-neutral-700">
            <button className="nav-link w-full" onClick={signOut}>
              <Icon name={"logout"} />
              <span className="text-sm font-medium">
                {t("settings.actions.logout")}
              </span>
            </button>
          </ul>
        </nav>
      </aside>

      <aside className="fixed inset-x-0 bottom-0 z-20 block border-t border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-800  md:hidden">
        <nav>
          <ul className="flex justify-between px-4">
            <li className="">
              <MobalLinkBtn
                title={t("navbar.links.dashboard")}
                to="/app"
                icon="dashboard"
              />
            </li>
            <li>
              <MobalLinkBtn
                title={t("navbar.links.ai")}
                to="/app/ai"
                icon="magic_button"
                exact={false}
              />
            </li>
            <li>
              <MobalLinkBtn
                title={t("navbar.links.settings")}
                to="/app/settings"
                icon="settings"
              />
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default AppNavBar;
