import Icon from "@components/Icon";
import { Menu, UnstyledButton, clsx } from "@mantine/core";
import { ComponentPropsWithoutRef, forwardRef } from "react";

export interface ListItemButtonProps
  extends ComponentPropsWithoutRef<"button"> {
  title: string;
  command: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ListItemButton = forwardRef<HTMLButtonElement, ListItemButtonProps>(
  (props, ref) => {
    const { title, command, className, ...others } = props;

    return (
      <UnstyledButton
        className={clsx("!w-full", className)}
        {...others}
        ref={ref}
      >
        <div className="w-full rounded-md bg-gray-50 px-3 py-2 dark:bg-neutral-800">
          <h2 className="truncate dark:text-white">{title}</h2>
          <p className="mt-2 line-clamp-3 break-words text-sm text-gray-600 dark:text-gray-400">
            {command}
          </p>
        </div>
      </UnstyledButton>
    );
  }
);

const AiListItem = (props: ListItemButtonProps) => {
  const { onEdit, onDelete, ...others } = props;

  return (
    <Menu withArrow width={200}>
      <Menu.Target>
        <ListItemButton {...others} />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Commands</Menu.Label>
        <Menu.Item icon={<Icon name="edit" size={16} />} onClick={onEdit}>
          Edit
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          color="red"
          icon={<Icon name="delete" size={16} />}
          onClick={onDelete}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AiListItem;
