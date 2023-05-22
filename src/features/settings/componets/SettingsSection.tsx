import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

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
      className={twMerge(
        "mt-4 flex justify-between gap-2 items-center flex-col sm:flex-row",
        classNames?.root
      )}
    >
      <div className={twMerge("self-start", classNames?.textWrapper)}>
        <h2
          className={twMerge(
            "text-lg font-medium dark:text-white",
            classNames?.title
          )}
        >
          {title}
        </h2>

        {description ? (
          <p
            className={twMerge(
              "text-sm mt-1 dark:text-white",
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
