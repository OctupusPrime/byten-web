import { clsx } from "@mantine/core";
import { type ReactNode } from "react";

interface SettingsSectionProps {
  label: string;
  children: ReactNode;
  classNames?: Partial<{
    root: string;
    label: string;
    wrapper: string;
  }>;
}

const SettingsSection = (props: SettingsSectionProps) => {
  const { label, children, classNames } = props;

  return (
    <section className={clsx("my-3", classNames?.root)}>
      <h2
        className={clsx(
          "mb-2 text-xl font-medium dark:text-white",
          classNames?.label
        )}
      >
        {label}
      </h2>
      <div className={clsx("space-y-3", classNames?.wrapper)}>{children}</div>
    </section>
  );
};

export { type SettingsSectionProps };

export default SettingsSection;
