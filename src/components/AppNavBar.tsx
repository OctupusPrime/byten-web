import { Link } from "@tanstack/router";
import { type IconsName } from "types/material-symbols";
import Icon from "./Icon";
import { useAuthContext } from "@context/AuthContext";
import { useTranslation } from "react-i18next";

interface LinkBtnProps {
  icon?: IconsName;
  title: string;
  to: string;
}

const LinkBtn = (props: LinkBtnProps) => {
  const { title, icon, to } = props;

  return (
    <Link
      to={to as any}
      activeOptions={{
        exact: true,
      }}
      className={"nav-link"}
      activeProps={{
        className: `nav-link-active`,
      }}
    >
      {icon ? <Icon name={icon} /> : null}
      <span className="font-medium text-sm">{title}</span>
    </Link>
  );
};

const MobalLinkBtn = (props: LinkBtnProps) => {
  const { title, icon, to } = props;

  return (
    <Link
      to={to as any}
      activeOptions={{
        exact: true,
      }}
      className={"mobal-nav-link"}
      activeProps={{
        className: `mobal-nav-link-active`,
      }}
    >
      {icon ? <Icon name={icon} /> : null}
      <span className="font-medium text-sm">{title}</span>
    </Link>
  );
};

const AppNavBar = () => {
  const { signOut } = useAuthContext();

  const { t } = useTranslation();

  return (
    <>
      <div className="w-60 md:flex hidden fixed inset-y-0 left-0 bg-white dark:bg-neutral-800 border-r border-gray-200 dark:border-neutral-700 px-6 pb-4 flex-col gap-5">
        <div className="h-16 flex items-center">
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
              <LinkBtn title={t("navbar.links.ai")} to="/app/ai" icon="robot" />
            </li>
            <li>
              <LinkBtn
                title={t("navbar.links.settings")}
                to="/app/settings"
                icon="settings"
              />
            </li>
          </ul>
          <ul className="border-t border-gray-200 dark:border-neutral-700 mt-auto pt-4 -mx-2">
            <button className="nav-link w-full" onClick={signOut}>
              <Icon name={"logout"} />
              <span className="font-medium text-sm">
                {t("settings.actions.logout")}
              </span>
            </button>
          </ul>
        </nav>
      </div>

      <div className="fixed md:hidden block inset-x-0 bottom-0 bg-white dark:bg-neutral-800 border-t border-gray-200  dark:border-neutral-700">
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
                icon="robot"
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
      </div>
    </>
  );
};

export default AppNavBar;
