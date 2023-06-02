import { Skeleton } from "@mantine/core";

export interface NoteListItemLoaderProps {
  items: string[];
}

const NoteListItemLoader = ({ items }: NoteListItemLoaderProps) => {
  return (
    <div className="rounded bg-gray-50 px-3 py-2 dark:bg-neutral-800">
      <div className="pt-1">
        {items.map((w, index) => (
          <Skeleton height={15} width={w} mb={8} key={index} />
        ))}
      </div>

      <Skeleton className="!ml-auto" width={"85px"} height={12} mt={18} />
    </div>
  );
};

export default NoteListItemLoader;
