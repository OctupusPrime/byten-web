import { type UnstyledButtonProps, clsx, UnstyledButton } from "@mantine/core";
import { type ReactNode } from "react";

interface SettingsSectionItemProps
  extends Omit<UnstyledButtonProps, "children"> {
  title: string;
  description?: string;
  classNames?: Partial<{
    root: string;
    title: string;
    description: string;
  }>;
  onClick?: () => void;
}

interface SettingsSectionItemActionsProps {
  title: string;
  description?: string;
  children: ReactNode;
  classNames?: Partial<{
    root: string;
    textWrapper: string;
    title: string;
    description: string;
  }>;
}

const SettingsSectionItem = (props: SettingsSectionItemProps) => {
  const { classNames, title, description, onClick, ...others } = props;

  return (
    <UnstyledButton
      className={clsx(
        "!w-full",
        !onClick && "!cursor-text !select-text",
        classNames?.root
      )}
      onClick={onClick}
      {...others}
    >
      <h3 className={clsx("font-medium dark:text-gray-300", classNames?.title)}>
        {title}
      </h3>
      {description ? (
        <p
          className={clsx(
            "text-sm text-gray-600 dark:text-gray-400",
            classNames?.description
          )}
        >
          {description}
        </p>
      ) : null}
    </UnstyledButton>
  );
};

const SettingsSectionItemAction = (props: SettingsSectionItemActionsProps) => {
  const { children, classNames, title, description } = props;

  return (
    <div
      className={clsx(
        "mt-4 flex flex-col items-center justify-between gap-2 sm:flex-row",
        classNames?.root
      )}
    >
      <div className={clsx("self-start", classNames?.textWrapper)}>
        <h3
          className={clsx("font-medium dark:text-gray-300", classNames?.title)}
        >
          {title}
        </h3>
        {description ? (
          <p
            className={clsx(
              "text-sm text-gray-600 dark:text-gray-400",
              classNames?.description
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  );
};

SettingsSectionItem.Action = SettingsSectionItemAction;

export { type SettingsSectionItemProps };

export default SettingsSectionItem;
