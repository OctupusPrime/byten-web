import { UnstyledButton, clsx } from "@mantine/core";
import { type ComponentPropsWithoutRef } from "react";
import type { NoteItem } from "types/data/notes";

interface NoteListItemProps
  extends Omit<ComponentPropsWithoutRef<"button">, "onClick"> {
  item: NoteItem;
  onClick?: (note: NoteItem) => void;
}

const NoteListItem = (props: NoteListItemProps) => {
  const { item, className, onClick, ...others } = props;

  const backgroundVariants: Record<string, string> = {
    red: "bg-note-item-red dark:bg-dark-note-item-red",
    green: "bg-note-item-green dark:bg-dark-note-item-green",
    blue: "bg-note-item-blue dark:bg-dark-note-item-blue",
    yellow: "bg-note-item-yellow dark:bg-dark-note-item-yellow",
    magenta: "bg-note-item-magenta dark:bg-dark-note-item-magenta",
    cyan: "bg-note-item-cyan dark:bg-dark-note-item-cyan",
    orange: "bg-note-item-orange dark:bg-dark-note-item-orange",
    purple: "bg-note-item-purple dark:bg-dark-note-item-purple",
    "dark-green": "bg-note-item-dark-green dark:bg-dark-note-item-dark-green",
    navy: "bg-note-item-navy dark:bg-dark-note-item-navy",
  };

  return (
    <UnstyledButton
      className={clsx("!w-full", className)}
      {...others}
      onClick={() => onClick?.(item)}
    >
      <div className={`rounded ${backgroundVariants[item.color]} px-3 py-2`}>
        <h3 className="break-words font-medium dark:text-white">
          {item.title}
        </h3>

        <p className="mt-2 text-right text-xs text-gray-600 dark:text-gray-400">
          {item.createdAt.format("MMM DD, YYYY")}
        </p>
      </div>
    </UnstyledButton>
  );
};

export default NoteListItem;
