import { clsx } from "@mantine/core";
import { type ReactNode } from "react";

interface SettingsSectionProps {
  title: string;
  description?: string;
  children?: ReactNode;
  classNames?: Partial<{
    root: string;
    textWrapper: string;
    title: string;
    description: string;
  }>;
}

const SettingsSection = (props: SettingsSectionProps) => {
  const { children, classNames, title, description } = props;

  return (
    <div
      className={clsx(
        "mt-4 flex flex-col items-center justify-between gap-2 sm:flex-row",
        classNames?.root
      )}
    >
      <div className={clsx("self-start", classNames?.textWrapper)}>
        <h2
          className={clsx(
            "text-lg font-medium dark:text-white",
            classNames?.title
          )}
        >
          {title}
        </h2>

        {description ? (
          <p
            className={clsx(
              "mt-1 text-sm dark:text-white",
              classNames?.description
            )}
          >
            Change app appearance.
          </p>
        ) : null}
      </div>
      {children}
    </div>
  );
};

export { type SettingsSectionProps };

export default SettingsSection;
